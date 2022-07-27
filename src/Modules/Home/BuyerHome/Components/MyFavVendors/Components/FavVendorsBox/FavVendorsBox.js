import React, { useState, useEffect } from 'react'
import { GetFavVendor } from '../../../../../network'
import FavVendorCard from '../FavVendorCard/FavVendorCard'
import { useSelector } from 'react-redux';
import './FavVendorsBox.css'
function FavVendorsBox() {
    const { currentLocal } = useSelector(state => state.currentLocal)
    const [favVendorsList, updateFavVendordsList] = useState([])

    useEffect(() => {
        GetFavVendor(success => {
            updateFavVendordsList(success.data)
        }, fail => {
            console.log(fail)
        })
    }, [])
    return (
        <div>
            <h5 className='f-16 my-4'>{currentLocal.buyerHome.myFavVendors}</h5>
            <div className='d-flex'>
                {favVendorsList.map(vendor => {
                    return <FavVendorCard key={vendor} vendorDetails={vendor} />
                })}
            </div>
        </div>
    )
}

export default FavVendorsBox