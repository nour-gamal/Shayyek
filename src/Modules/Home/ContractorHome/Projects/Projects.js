import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "antd";
import "./Projects.css";
function MyOrders({ projects }) {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [currentPage, setCurrentPage] = useState(1);

  const location = "bottomRight";

  console.log(currentLocal);
  const columns = [
    {
      title: currentLocal.profilePage.projectName,
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: currentLocal.profilePage.buyerName,
      dataIndex: "buyerName",
      key: "buyerName",
    },
    {
      title: currentLocal.contractorHome.date,
      dataIndex: "date",
      key: "date",
    },
    {
      title: currentLocal.contractorHome.sizeOfWork,
      dataIndex: "sizeOfContractor",
      key: "sizeOfContractor",
    },
  ];

  return (
    <div className="projects mb-2">
      <h6 className="title p-4">
        {currentLocal.contractorHome.shayyekProjects}
      </h6>
      <Table
        className="table-striped-rows"
        dataSource={projects}
        columns={columns}
        scroll={{ x: "calc(100wh - 4em)" }}
        pagination={{
          position: [location],
          current: currentPage,
          pageSize: 5,
          hideOnSinglePage: true,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
          },
        }}
      />
    </div>
  );
}
export default MyOrders;
