import React, { useState, createRef, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Table, Menu, Dropdown } from 'antd';
import { EmailShareButton, WhatsappShareButton } from "react-share";
import { GetImagePath } from "../../../../ProfilePage/network";
import { PDFExport } from "@progress/kendo-react-pdf";
import Whatsapp from "../../../../../Resources/Assets/whatsapp.svg";
import CopyLink from "../../../../../Resources/Assets/copyLink.svg";
import Email from "../../../../../Resources/Assets/email.svg";
import share from "../../../../../Resources/Assets/share (5).svg";
import { useScreenshot } from "use-react-screenshot";
import download from "../../../../../Resources/Assets/direct-download.svg";
import { baseUrl } from "../../../../../Services";
import './SummaryTable.css';
function SummaryTable({ dataSourceProp }) {
    const { currentLocal } = useSelector((state) => state.currentLocal);
    // eslint-disable-next-line
    const [loading, updateLoading] = useState(false);
    const [imageURL, updateImageURL] = useState(null)
    const [image, takeScreenshot] = useScreenshot();

    const dataSource = [];
    const ref = createRef(null);
    const getBlobImg = async (image) => {
        const blob = await fetch(image).then((res) => res.blob());
        // const blobUrl = window.URL.createObjectURL(blob);
        var file = new File([blob], `${new Date().getTime()}.png`);

        const data = new FormData();
        data.append("image", file);

        GetImagePath(
            data,
            (success) => {
                updateImageURL(baseUrl + success.data);
            },
            (fail) => {
                console.log(fail);
            }
        );
    };
    useEffect(() => {
        if (image) {
            getBlobImg(image);
        }
    }, [image]);
    const shareMenu = (
        <Menu>
            <Menu.Item key="1">
                <WhatsappShareButton
                    url={imageURL}
                    children={
                        <div className="d-flex">
                            <img src={Whatsapp} alt="Whatsapp" />
                            <div className="mx-2">{currentLocal.profilePage.whatsapp}</div>
                        </div>
                    }
                />
            </Menu.Item>
            <Menu.Item key="2">
                <EmailShareButton
                    url={imageURL}
                    children={
                        <div className="d-flex">
                            <img src={Email} alt="email" />
                            <div className="mx-2">{currentLocal.profilePage.email}</div>
                        </div>
                    }
                />
            </Menu.Item>
            <Menu.Item
                key="3"
                onClick={() => {
                    navigator.clipboard.writeText(imageURL);
                }}
            >
                <div className="d-flex">
                    <img src={CopyLink} alt="CopyLink" />
                    <div className="mx-2">{currentLocal.profilePage.copyLink}</div>
                </div>
            </Menu.Item>
        </Menu>
    );

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
            title: currentLocal.buyerHome.notes,
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
        },
    ];

    const getImage = () => takeScreenshot(ref.current);

    const shareOffer = () => {
        getImage();
    };

    const pdfExportComponent = React.useRef(null);

    const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };

    return (
        <div className='pps ppe summaryTable' ref={ref}>
            <div className="d-flex justify-content-between">
                <div className="title fw-500 mx-3">{currentLocal.rfqSummary.mySummary}</div>
                <div>
                    <div className="py-4 d-flex justify-content-end mx-4 align-items-center">
                        <Dropdown.Button
                            overlay={shareMenu}
                            trigger={["click"]}
                            onClick={(e) => e.preventDefault()}
                            icon={<img src={share} alt="share" onClick={shareOffer} />}
                        ></Dropdown.Button>

                        <img
                            src={download}
                            alt="download"
                            onClick={exportPDFWithComponent}
                            className="mx-2 download"
                        />
                    </div>
                </div>
            </div>
            <PDFExport
                ref={pdfExportComponent}
                paperSize="auto"
                margin={40}
                fileName={`RFQ ProjectName Response`}
                author="shayyek"
            >
                <Table
                    key={dataSource}
                    indentSize={300}
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                    className="my-4" />
            </PDFExport>
            <div className="text-center">
                <button className='button-primary flat my-2'>{currentLocal.rfqSummary.acceptAndNotifyVendors}</button>
            </div>
        </div>
    )
}

export default SummaryTable