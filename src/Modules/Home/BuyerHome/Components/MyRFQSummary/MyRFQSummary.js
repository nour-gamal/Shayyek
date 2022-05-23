import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Dropdown, Menu } from "antd";
import Lottie from "react-lottie-player";
import moment from "moment";
import stepsRight from "../../../../../Resources/Assets/stepsRight.svg";
import Package from "../../../../../Resources/Assets/package.svg";
import PackageDisabled from "../../../../../Resources/Assets/packageDisabled.svg";
import questionImg from "../../../../../Resources/Assets/questions.json";
import SummaryTable from "../SummaryTable/SummaryTable";
import AllQuotaionsRecievedForRFQ from "../AllQuotationsRecievedTable/AllQuotationsRecievedTable";
import { GetRFQSummary } from "../../../network"
import { getQuestionsList, AnswerQuestionWall } from "../../../../ProfilePage/network";
import "./MyRFQSummary.css";

function MyRFQSummary(props) {
  const [currentPackageId, updateCurrentPackageId] = useState(null);
  const [questionsList, updateQuestionsList] = useState([]);
  const [rfqPackages, updateRfqPackages] = useState([]);
  // const [addQuestBtnState, updateAddQuestBtnState] = useState(false);
  const [openAnswer, setOpenAnswer] = useState(false);
  const [answer, setAnswer] = useState(null);
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const [rfqData, updateRFQData] = useState({});
  const [dataSource, updateDataSource] = useState([])
  function handleAddAnswer(QuestionWallId) {
    if (answer) {
      let data = { QuestionWallId, answer }
      AnswerQuestionWall(data, success => {
        setAnswer("")
        setOpenAnswer((state) => !state)
        getQuestionsList({ rfqPackageId: currentPackageId }, success => {
          updateQuestionsList(success.data);
        }, fail => {
          console.log(fail)
        })
      }, fail => {
        console.log(fail)
      })
    }
  }

  useEffect(() => {
    let rfqId = props.rfqId;
    GetRFQSummary(rfqId, success => {
      updateRFQData(success.data);
      updateRfqPackages(success.data.rfqPackages);
      updateCurrentPackageId(success.data.rfqPackages[0].packageId)
      updateDataSource(success.data.rfqPackages[0].rfqPackageDetails)
      let data = {
        rfqPackageId: success.data.rfqPackages[0].packageId
      }
      getQuestionsList(data, success => {
        updateQuestionsList(success.data);
      }, fail => {
        console.log(fail)
      })
    }, fail => {
      console.log(fail)
    })
  }, [])


  const QAndAMenu = (
    <Menu className="px-2 py-4">
      <Menu.Item disabled={true}>
        <div className="d-flex flex-column">
          <div className="questionsList">
            {questionsList.map((question, index) => {
              return (
                <div
                  key={index}
                  className={
                    index % 2 === 0
                      ? "questionBlock my-2 p-2"
                      : "questionBlock my-2 grayBackground p-2"
                  }
                >
                  <div className="f-14 fw-600 question">{question.question}</div>

                  <div className="info d-flex">
                    <div>{question.sUpplierContractorName} {currentLocal.buyerHome.asked} </div>
                    <div className="date">{moment(question.questionDate).format("LLL")}</div>
                  </div>
                  {!question.answer ? (
                    <>
                      <div
                        className={
                          openAnswer
                            ? "questionArea form-control m-2"
                            : "d-none"
                        }
                      >
                        <textarea
                          value={answer}
                          onChange={(e) => {
                            setAnswer(e.target.value);
                          }}
                        />
                        <div
                          className={openAnswer ? "addQuestionBtn f-14 " : "d-none"}
                          onClick={() => { handleAddAnswer(question.questionWallId) }}
                          role="button"
                        >
                          {currentLocal.buyerHome.addAnswer}
                        </div>
                      </div>
                      <div
                        className={`info addAnswer d-flex justify-content-end ${openAnswer ? "d-none" : ""}`}
                        onClick={() => setOpenAnswer((state) => !state)}
                      >
                        {currentLocal.buyerHome.addAnswer}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="questionAnswer">{question.answer}</div>
                      <div className="info d-flex">
                        <div>You {currentLocal.buyerHome.answered} </div>
                        <div className="date">{moment(question.answerDate).format("LLL")}</div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Menu.Item>
    </Menu >
  );

  useEffect(() => { }, []);

  return (
    <div className="myRFQSummary">
      <div className="procurementSteps ppe pps d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className="title fw-500 mx-2">
            {currentLocal.rfqSummary.procSteps}:
          </div>
          <div className="d-flex  white-capsules-container">
            <div className="white-capsules d-flex">
              <div className="text">
                {currentLocal.rfqSummary.Prequalification}
              </div>
              <img src={stepsRight} alt="stepsRight" className="stepsRight" />
            </div>
            <div className="white-capsules d-flex">
              <div className="text">
                {currentLocal.rfqSummary.technicalComparison}
              </div>
              <img src={stepsRight} alt="stepsRight" className="stepsRight" />
            </div>
            <div className="white-capsules d-flex">
              <div className="text">
                {currentLocal.rfqSummary.commercialComparison}
              </div>
              <img src={stepsRight} alt="stepsRight" className="stepsRight" />
            </div>
          </div>
        </div>
        <div>
          <Dropdown
            overlay={QAndAMenu}
            placement="bottomLeft"
            trigger={["click"]}
            overlayClassName={"QAndAMenu cursor-pointer"}
          >
            <div
              className="qAndAWall d-flex justify-content-end"
              role={"button"}
            >
              <figure>
                <Lottie loop animationData={questionImg} play />
              </figure>
              <div className="text">{currentLocal.offerTable.QANDAWALL}</div>
              <div className="invitations_number mx-2">
                {questionsList.length}
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
      <div className="pps ppe">
        <div className="d-flex my-2 justify-content-between flex-wrap">
          <div className="mx-3">{currentLocal.rfqSummary.projectName}:{rfqData.projectName}</div>
          <div className="mx-3">
            {currentLocal.rfqSummary.projectOwner}:{rfqData.projectOwner}
          </div>
          <div className="mx-3">
            {currentLocal.rfqSummary.projectConsultant}:{rfqData.projectConsultant}
          </div>
          <div className="mx-3">
            {currentLocal.rfqSummary.projectContractor}:{rfqData.projectContractor}
          </div>
          <div className="mx-3">
            {currentLocal.rfqSummary.deliveryDate}:{rfqData.projectContractor}
          </div>
          <div className="mx-3">
            {currentLocal.rfqSummary.deliveryAddress}:{rfqData.projectAddress}
          </div>
        </div>
        <div className="d-flex packages-container align-items-center my-4">
          <div className="title mx-3 fw-500">
            {currentLocal.rfqSummary.projectPackages}
          </div>
          {rfqPackages.map((packageItem, packageIndex) => {
            return (
              <div className="packageInfo mx-4 cursorPointer" key={packageIndex} onClick={() => {
                updateCurrentPackageId(packageItem.packageId);
                updateDataSource(packageItem.rfqPackageDetails);
                let data = {
                  rfqPackageId: packageItem.packageId
                }
                getQuestionsList(data, success => {
                  updateQuestionsList(success.data);
                }, fail => {
                  console.log(fail)
                })
              }}>

                <img
                  src={currentPackageId === packageItem.packageId ? Package : PackageDisabled}
                  alt="Package"
                />
                <div
                  className={
                    currentPackageId === true
                      ? "packageName p-2 fw-500 flex-wrap"
                      : "packageName p-2 fw-500 flex-wrap disabled"
                  }
                  data-tip="packageName"
                >
                  {packageItem.packageName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <SummaryTable currentPackageId={currentPackageId} dataSourceList={dataSource} />
      <AllQuotaionsRecievedForRFQ dataSourceProp={false} />
    </div>
  );
}

export default MyRFQSummary;
