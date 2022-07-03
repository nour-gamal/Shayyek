import { Input } from 'antd';
import React, { useState } from 'react'
import { useSelector } from "react-redux";
import searchGlass from "../../../../../Resources/Assets/searchGlass.svg";
import dropdownRectangle from "../../../../../Resources/Assets/dropdownRectangle.svg"
import './CategoriesList.css'
function CategoriesList() {
    const { currentLocal } = useSelector((state) => state.currentLocal);
    const [dropdownState, updateDropdownState] = useState(false);
    const toggleDropdown = () => {
        updateDropdownState(!dropdownState)
    }
    return (
        <span className='categoryDropDown'>
            <div className='dropdownHeader d-flex justify-content-between' onClick={toggleDropdown}>
                <span>{currentLocal.buyerHome.selectCategory}</span>
                <img src={dropdownRectangle} alt='dropdownRectangle' />
            </div>
            {dropdownState &&
                <div className='listArea'>
                    <div className='searchContainer'>
                        <Input type='search' />
                        <img src={searchGlass} alt='searchGlass' />
                    </div>
                </div>}
        </span>
    )
}

export default CategoriesList