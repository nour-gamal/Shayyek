import React, { useState } from 'react'
import { Button, Modal, Table } from 'antd'
import { useSelector } from "react-redux";
import moment from 'moment'
import './RFQTableModal.css'
import { GetRFQSummary } from '../../../../Home/network';
import { useEffect } from 'react';
function RFQTableModal({ isModalVisible, onCancel, rfqId, currentPackageId, getSelectedRows }) {
    const { currentLocal } = useSelector(
        (state) => state.currentLocal
    );
    const [rfqDetails, updateRfqDetails] = useState([])
    const [selectedRowsIndex, updateSelectedRowsIndex] = useState([])
    const columns = [
        {
            title: currentLocal.buyerHome.item,
            dataIndex: "item",
            key: "item",
        },
        {
            title: currentLocal.buyerHome.description,
            dataIndex: "description",
            key: "description",
        },
        {
            title: currentLocal.buyerHome.quantity,
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: currentLocal.buyerHome.preferredBrands,
            dataIndex: "preferredBrands",
            key: "preferredBrands",
        },
        {
            title: currentLocal.rfqSummary.vendorNotes,
            dataIndex: "notes",
            key: "notes",
        },
        {
            title: currentLocal.offerTable.unitPrice,
            dataIndex: "unitPrice",
            key: "unitPrice",
        },
        {
            title: currentLocal.offerTable.totalPrice,
            dataIndex: "totalPrice",
            key: "totalPrice",
        },
        {
            title: currentLocal.offerTable.deliveryDate,
            dataIndex: "deliveryDate",
            key: "deliveryDate",
            render: (deliveryDate) => {
                return moment(deliveryDate).format("DD-MM-YYYY");
            },
        },
        {
            title: currentLocal.offerTable.paymentTerms,
            dataIndex: "paymentTerms",
            key: "paymentTerms",
        },
    ];
    useEffect(() => {
        GetRFQSummary(
            rfqId,
            (success) => {
                let currentPackageData = success.data.rfqPackages.filter(packageItem => packageItem.packageId === currentPackageId)
                currentPackageData[0].rfqPackageDetails.forEach((packageItem, index) => {
                    currentPackageData[0].rfqPackageDetails[index].key = index
                })
                updateRfqDetails(currentPackageData[0].rfqPackageDetails)
            }, fail => {
                console.log(fail)
            })
    }, [currentPackageId, rfqId])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            let selectedIndexArr = []
            selectedRows.forEach((row) => {
                selectedIndexArr.push(row.rfqPackageDetailId)
            })
            updateSelectedRowsIndex(selectedIndexArr)
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    return (
        <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onCancel={onCancel}
            className="modal-lg d-flex align-items-between reverseAuctionTable"
        >
            <div>
                <div className='f-17 my-2 primary-color'>
                    {currentLocal.reverseAuction.selectSomeItemss}
                </div>
                <Table
                    className="table-striped-rows"
                    dataSource={rfqDetails}
                    columns={columns}
                    scroll={{ x: "calc(100wh - 4em)" }}
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                />
            </div>
            <div className="text-center">
                <Button
                    className='button-primary flat'
                    onClick={() => {
                        getSelectedRows(selectedRowsIndex)
                        onCancel()
                    }}
                >
                    {currentLocal.reverseAuction.ok}
                </Button>
            </div>
        </Modal>
    )
}

export default RFQTableModal