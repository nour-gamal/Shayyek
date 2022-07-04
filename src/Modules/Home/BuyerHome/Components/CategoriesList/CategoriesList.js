import React, { useState, useRef, useEffect } from 'react'
import { Input, Tree } from 'antd';
import { useSelector } from "react-redux";
import searchGlass from "../../../../../Resources/Assets/searchGlass.svg";
import dropdownRectangle from "../../../../../Resources/Assets/dropdownRectangle.svg"
import checkMark from "../../../../../Resources/Assets/checkMark.svg"
import './CategoriesList.css'
function CategoriesList() {
    const { currentLocal } = useSelector((state) => state.currentLocal);
    const [dropdownState, updateDropdownState] = useState(false);
    const [frequentlyUsedData, updateFrequentlyUsedData] = useState([]);
    const toggleDropdown = () => {
        updateDropdownState(!dropdownState)
    }
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            updateDropdownState(false);
        }
    };
    useEffect(() => {
        const frequentlyUsedDataVar = [
            {
                title: 'pa',
                key: '0-0',
                originalChildren: [
                    {
                        title: 'pc',
                        key: '0-0-0',
                    },
                    {
                        title: 'px',
                        key: '0-0-1',
                    },
                    {
                        title: 'pa',
                        key: '0-0-2',
                        disabled: true
                    },
                ],
                children: [
                    {
                        title: 'pc',
                        key: '0-0-0',
                    },
                    {
                        title: 'px',
                        key: '0-0-1',
                    },
                    {
                        title: 'pa',
                        key: '0-0-2',
                        disabled: true
                    },

                ]
            },
        ];
        updateFrequentlyUsedData(frequentlyUsedDataVar);
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };

    }, []);
    const handleSearch = (e) => {
        const searchedText = e.target.value;
        let frequentlyUsedDataVar = [...frequentlyUsedData]
        frequentlyUsedDataVar.forEach((data, index) => {
            let newChildren = data.originalChildren.filter(
                (subData) => subData.title.includes(searchedText)
            )
            if (newChildren.length) {
                delete frequentlyUsedDataVar[index].disabled
            } else {
                frequentlyUsedDataVar[index].disabled = true
            }
            data.children = newChildren
        })
        updateFrequentlyUsedData([...frequentlyUsedDataVar])
    }


    const onfrequentlyUsedCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    };

    return (
        <span
            className='categoryDropDown'
            ref={ref}
        >
            <div className='dropdownHeader d-flex justify-content-between' onClick={toggleDropdown}>
                <span>{currentLocal.buyerHome.selectCategory}</span>
                <img src={dropdownRectangle} alt='dropdownRectangle' />
            </div>
            {dropdownState &&
                <div className='listArea'>
                    <div className='searchContainer d-flex'>
                        <img src={searchGlass} alt='searchGlass' className='px-2' />
                        <Input type='search'
                            placeholder={currentLocal.buyerHome.categorySearch}
                            onChange={handleSearch} />
                    </div>
                    <div className='actionContainer'>
                        <div className='section p-2'>
                            <label>{currentLocal.buyerHome.mostFrequentlyUsed}</label>
                            <Tree
                                checkable
                                defaultExpandedKeys={['0-0-0', '0-0-1']}
                                defaultSelectedKeys={['0-0-0', '0-0-1']}
                                defaultCheckedKeys={['0-0-0', '0-0-1']}
                                onCheck={onfrequentlyUsedCheck}
                                treeData={frequentlyUsedData}
                            />
                        </div>
                        <div className='section p-2'>
                            <label>{currentLocal.buyerHome.allCategories}</label>
                        </div>
                    </div>
                </div>}
        </span>
    )
}

export default CategoriesList