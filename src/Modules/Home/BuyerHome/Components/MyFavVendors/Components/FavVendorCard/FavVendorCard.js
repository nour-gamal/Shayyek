import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import defaultAvatar from "../../../../../../../Resources/Assets/DefaultProfileImage.png"
import { baseUrl } from '../../../../../../../Services'
import ReactStars from "react-rating-stars-component";
import './FavVendorCard.css'

function FavVendorCard({ vendorDetails }) {
    const { currentLocal } = useSelector((state) => state.currentLocal);
    console.log(vendorDetails)
    return (
        <div className='favVendorCard m-2'>
            <Link
                to={`/suppliercontractorprofiles?userId=${vendorDetails.userId}`}>
                <figure className='avatarContainer'>
                    <img src={vendorDetails.imagePath ? baseUrl + vendorDetails.imagePath : defaultAvatar}
                        alt='vendorAvatar' />
                </figure>
                <div className="content">
                    <ReactStars
                        edit={false}
                        count={5}
                        value={vendorDetails.rate}
                        size={24}
                        activeColor="#ffd700"
                        classNames={
                            currentLocal.language === "English" ? "ltrStars" : "rtlStars "
                        }
                    />
                    <div className="my-2">
                        {vendorDetails?.vendorName}
                    </div>
                    <div className="my-2 f-12">
                        {vendorDetails.vendorType}
                    </div>
                    <div className="my-2 f-12">
                        {vendorDetails.companyName}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default FavVendorCard