import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "antd";
import { getProducts } from "../../../network";
import ProductsCard from "../ProductsCard/ProductsCard";
import AddProductModal from "../AddProductModal/AddProductModal";
import DraftsModal from "./../../../../ProfilePage/Components/SubComponents/DraftsModal/DraftsModal";
// icons
import noProducts from "../../../../../Resources/Assets/noRFQs.svg";
import Plus from "../../../../../Resources/Assets/plus (2).svg";
import Drafts from "../../../../../Resources/Assets/draft.svg";

import "./Products.css";

function Products({ draftsCount }) {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [products, updateProducts] = useState([]);
  const { authorization } = useSelector((state) => state.authorization);
  const [isModalVisible, toggleProductModal] = useState(false);
  const [draftsModalVisible, setDraftsModalVisible] = useState(false);

  useEffect(() => {
    getProducts(
      currentLocal.language === "English"
        ? localStorage.getItem("englishId")
        : localStorage.getItem("arabicId"),
      authorization.companyId,
      (success) => {
        updateProducts(success.data);
      },
      (fail) => {
        console.log(fail);
      }
    );
  }, [authorization.companyId, currentLocal.language]);

  const requestAllProducts = () => {
    getProducts(
      currentLocal.language === "English"
        ? localStorage.getItem("englishId")
        : localStorage.getItem("arabicId"),
      authorization.companyId,
      (success) => {
        updateProducts(success.data);
      },
      (fail) => {
        console.log(fail);
      }
    );
  };
  function openDraftsModal() {
    setDraftsModalVisible(true);
    console.log("hi there");
  }
  return (
    <div
      className={
        currentLocal.language === "English" ? "products ppl" : "products ppr"
      }
    >
      <div className="header d-flex justify-content-between align-items-between my-2 headerContainer">
        <button
          className="orange_btn"
          onClick={() => {
            toggleProductModal(!isModalVisible);
          }}
        >
          <img src={Plus} alt="Plus" className="mx-1" />
          <span>{currentLocal.supplierHome.addNewProduct}</span>
        </button>

        <div
          className="d-flex align-items-center cursorPointer"
          onClick={openDraftsModal}
        >
          <img src={Drafts} alt="Drafts" className="mx-2" />
          <span>{currentLocal.supplierHome.drafts}</span>
          <div className="invitations_number mx-2">{draftsCount}</div>
        </div>
      </div>

      <Row>
        {products.length === 0 ? (
          <div className="noProducts text-center">
            <img src={noProducts} alt="noCompanies" />
            <div>{currentLocal.supplierHome.noProducts}</div>
            <div>{currentLocal.supplierHome.youCanAddProducts}</div>
          </div>
        ) : (
          products.map((product) => {
            return (
              <Col xs={24} md={12} lg={6} key={product.id}>
                <ProductsCard
                  product={product}
                  requestAllProducts={requestAllProducts}
                />
              </Col>
            );
          })
        )}
      </Row>
      {isModalVisible && (
        <AddProductModal
          isModalVisible={isModalVisible}
          onCancel={() => {
            toggleProductModal(!isModalVisible);
            requestAllProducts();
          }}
        />
      )}

      {draftsModalVisible && (
        <DraftsModal
          isVisible={draftsModalVisible}
          onCancel={() => setDraftsModalVisible(false)}
        />
      )}
    </div>
  );
}

export default Products;
