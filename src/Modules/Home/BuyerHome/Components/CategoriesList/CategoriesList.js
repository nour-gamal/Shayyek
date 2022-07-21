import React, { useState, useRef, useEffect } from 'react'
import { Input, Tree } from 'antd';
import { useSelector } from "react-redux";
import searchGlass from "../../../../../Resources/Assets/searchGlass.svg";
import dropdownRectangle from "../../../../../Resources/Assets/dropdownRectangle.svg"
import './CategoriesList.css'
function CategoriesList({ categoriesListArr, getSelectedCategories, selectedCategories, dangerClass }) {
    const { currentLocal } = useSelector((state) => state.currentLocal);
    const [dropdownState, updateDropdownState] = useState(false);
    const [frequentlyUsedData, updateFrequentlyUsedData] = useState([]);
    const [allCategories, updateallCategories] = useState([]);
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
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };

    }, []);
    useEffect(() => {
        updateFrequentlyUsedData(categoriesListArr.frequentlyUsedCategories);
        updateallCategories(categoriesListArr.allCategories)
    }, [categoriesListArr]);

    const handleSearch = (e) => {
        const searchedText = e.target.value;
        let frequentlyUsedDataVar = [...frequentlyUsedData];
        let allCategoriesVar = [...allCategories]

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
        allCategoriesVar.forEach((data, index) => {
            let newChildren = data.originalChildren.filter(
                (subData) => subData.title.includes(searchedText)
            )
            if (newChildren.length) {
                delete allCategoriesVar[index].disabled
            } else {
                allCategoriesVar[index].disabled = true
            }
            data.children = newChildren
        })
        updateFrequentlyUsedData([...frequentlyUsedDataVar]);
        updateallCategories([...allCategoriesVar])
    }


    const onCheck = (checkedKeys) => {
        getSelectedCategories(checkedKeys)
    };

    return (
        <span
            className='categoryDropDown'
            ref={ref}
        >
            <div className={`dropdownHeader d-flex justify-content-between ${dangerClass}`} onClick={toggleDropdown}>
                <span>{currentLocal.buyerHome.selectCategory}</span>
                <img src={dropdownRectangle} alt='dropdownRectangle' />
            </div>

            <div className={dropdownState ? 'listArea' : 'd-none'}>
                <div className="searchContainer d-flex">
                    <img src={searchGlass} alt='searchGlass' className='px-2' />
                    <Input type='search'
                        placeholder={currentLocal.buyerHome.categorySearch}
                        onChange={handleSearch} />
                </div>
                <div className='actionContainer'>
                    {frequentlyUsedData?.length > 0 && <div className='section p-2'>
                        <label>{currentLocal.buyerHome.mostFrequentlyUsed}</label>
                        <Tree
                            checkable
                            onCheck={onCheck}
                            treeData={frequentlyUsedData}
                            defaultCheckedKeys={selectedCategories ? selectedCategories : []}
                            checkedKeys={selectedCategories ? selectedCategories : []}
                        />
                    </div>}
                    <div className='section p-2'>
                        <label>{currentLocal.buyerHome.allCategories}</label>
                        <Tree
                            checkable
                            onCheck={onCheck}
                            treeData={allCategories}
                            defaultCheckedKeys={selectedCategories ? selectedCategories : []}
                            checkedKeys={selectedCategories ? selectedCategories : []}
                        />
                    </div>
                </div>
            </div>
        </span >
    )
}

export default CategoriesList