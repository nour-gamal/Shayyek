import React, { useState } from 'react';
import Garbage from "../../../../../Resources/Assets/GarbageLg.svg";
import { useSelector } from "react-redux";
import DeleteModal from "../DeleteModal/DeleteModal"
import { Button } from 'antd';
import { deleteDraftedRFQ, GetDraftedRFQ } from '../../../network';
import { toast } from "react-toastify";
import { Redirect } from 'react-router';
import { ADDRFQ } from "../../../../../Redux/RFQ";
import moment from 'moment';
import { useDispatch } from 'react-redux';
import './DraftedRFQItem.css';

function DraftedRFQItem({ rfq, updateRerenderStateFun, history }) {
    const { currentLocal } = useSelector((state) => state.currentLocal);
    const [isDeleteRowModal, updateDeleteRowModal] = useState(false);
    const [selectedRFQId, updateselectedRFQId] = useState(null);
    const [redirectTo, updateRedirectTo] = useState(null);
    const dispatch = useDispatch();

    const handleDeleteProject = () => {
        let data = {
            RfqId: selectedRFQId
        }
        deleteDraftedRFQ(data, success => {
            toast.success(success.message, {
                position: "bottom-right",
                rtl: true,
            });
            updateRerenderStateFun()
        }, fail => {
            toast.error(fail.message, {
                position: "bottom-right",
                rtl: true,
            });
        })
    }
    const getRFQData = () => {
        GetDraftedRFQ(
            rfq.rfqId,
            (success) => {
                const postedRFQ = success.data
                let rfqPackages = [...success.data.packages]
                let modifiedRFQPackages = [];
                rfqPackages.forEach((packageData) => {
                    let rfqPackageDetailsRequests = []
                    packageData.rfqDetails.forEach(detail => {
                        rfqPackageDetailsRequests.push({
                            ...detail,
                            subCategories: detail.subCategoriesIds,
                            isInstallSupplierAndContructor: detail.includeInstallation,
                            filePath: detail.filePath ? detail.filePath : ''
                        })
                    })
                    let documentsPath = []
                    packageData.packageFiles.forEach(fileData => {
                        documentsPath.push(fileData.path)
                    })

                    modifiedRFQPackages.push({
                        ...packageData,
                        rfqPackageDetailsRequests,
                        receivingOffersDeadline: packageData.deadlineDate ? moment(packageData.deadlineDate).format('YYYY-MM-DD') : null,
                        deliveryDate: packageData.deliveryDate ? moment(packageData.deliveryDate).format('YYYY-MM-DD') : null,
                        documentsList: packageData.packageFiles,
                        packageFiles: documentsPath
                    })
                })

                let modifiedRFQ = {
                    ...postedRFQ,
                    rfqPackages: modifiedRFQPackages,
                    isShownProjectConsultant: !postedRFQ.isShownProjectConsultant,
                    isShownProjectContractor: !postedRFQ.isShownProjectContractor,
                    isShownProjectOwner: !postedRFQ.isShownProjectOwner,
                    tenderType: postedRFQ.publicTender ? 'public' : 'private',
                    revealPrices: postedRFQ.isRevealPricesToBidders,
                    publishOrFilter: postedRFQ.isPublishToSuppliersNetwork ? 'publish' : 'filter',
                    isVolOfBussOpened: postedRFQ.volumeOfBusinessFilter ? true : false,
                    selectedVolumeOfBusiness: postedRFQ.volumeOfBusinessFilter
                }
                dispatch(ADDRFQ({ ...modifiedRFQ }))
                updateRedirectTo(`/createRFQ?draftedRfqId=${rfq.rfqId}&firstRedirect=true`)
            },
            (fail) => { }
        );
    }
    if (redirectTo) return <Redirect to={redirectTo} />
    return (
        <div className='draftedRFQItem p-2 my-4'>
            <div className='d-flex justify-content-between'>
                <div className='projectName fw-500'>{rfq.projectName}</div>
                <img src={Garbage} alt='Garbage' className='cursorPointer' onClick={() => {
                    updateDeleteRowModal(true)
                    updateselectedRFQId(rfq.rfqId)
                }} />
            </div>
            <div className='label my-2 f-14'>
                <div className='title'>{currentLocal.buyerHome.packageName}</div>
                <div className='value'>
                    {rfq.packagesNames.map((name, index) => <div key={index}>
                        <>{name}</>
                        <> {index !== rfq.packagesNames.length - 1 && <>,</>}
                        </>
                    </div>)}
                </div>
            </div>
            <div className='label my-2 f-14'>
                <div className='title'>{currentLocal.buyerHome.projectLocation}</div>
                <div className='value'>{rfq.projectLocation}</div>
            </div>
            <div className='label my-2 f-14'>
                <div className='title'>{currentLocal.buyerHome.projectOwner}</div>
                <div className='value'>{rfq.projectOwner}</div>
            </div>
            <div className="text-center">
                <Button className='button-primary my-2 flat' onClick={getRFQData}>
                    {currentLocal.buyerHome.completeRFQ}
                </Button>
            </div>
            <DeleteModal
                isModalVisible={isDeleteRowModal}
                onCancel={() => {
                    updateDeleteRowModal(false);
                }}
                onDeleteProject={handleDeleteProject}
                deleteMode={'project'}
            />
        </div >
    )
}

export default DraftedRFQItem