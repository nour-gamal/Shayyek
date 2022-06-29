import { Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Input, Checkbox, Select, Radio } from "antd";
import { governmentList } from "../../../../Registration/Network";
import PublicTender from "../PublicTender/PublicTender";
import PrivateTender from "../PrivateTender/PrivateTender";
import { useDispatch, useSelector } from "react-redux";
import { addRFQDetails } from "../../../../../Redux/RFQ";
import "./AddRFQDetails.css";

function AddRFQDetails({ getRFQPageName }) {
  const [projectName, updateProjectName] = useState("");
  const [govList, updateGovList] = useState([]);
  const [alert, updateAlert] = useState(false);
  const [selectedGov, updateSelectedGov] = useState(null);
  const [projectOwner, updateProjectOwner] = useState({
    name: "",
    makeNotVisibleToVendors: false,
  });
  const [revealPrices, updateRevealPrices] = useState(false);
  const [projectConsultant, updateProjectConsultant] = useState({
    name: "",
    makeNotVisibleToVendors: false,
  });
  const [projectContractor, updateProjectContractor] = useState({
    name: "",
    makeNotVisibleToVendors: false,
  });
  const { currentLocal, currentLanguageId } = useSelector(
    (state) => state.currentLocal
  );
  const { rfqData } = useSelector((state) => state.rfq);
  const [tenderType, setTenderType] = useState("private");
  const [publicTenderData, updatePublicTenderData] = useState({});
  const [privateTenderData, updatePrivateTenderData] = useState({});
  const { Option } = Select;
  const dispatch = useDispatch();

  useEffect(() => {
    const countryId = "ab534c08-ddc1-4389-8d5c-2e3a88cb5417";
    governmentList(
      currentLanguageId,
      countryId,
      (success) => {
        updateGovList(success.data);
      },
      (fail) => {
        console.log(fail);
      }
    );
  }, [currentLanguageId]);

  useEffect(() => {
    if (rfqData) {
      updateProjectName(rfqData.projectName);
      updateSelectedGov(rfqData.projectLocationId);
      updateProjectOwner({
        name: rfqData.projectOwner,
        makeNotVisibleToVendors: rfqData.isShownProjectOwner,
      });
      updateProjectConsultant({
        name: rfqData.projectConsultant,
        makeNotVisibleToVendors: rfqData.isShownProjectConsultant,
      });
      updateProjectContractor({
        name: rfqData.projectContractor,
        makeNotVisibleToVendors: rfqData.isShownProjectContractor,
      });

      setTenderType(rfqData.publicTender ? "public" : "private");
      updateRevealPrices(rfqData.isRevealPricesToBidders);
      let privateTenderDataa = {
        invitedEmails: rfqData.invitedEmails,
        inviteByWhatsapp: rfqData.inviteByWhatsapp,
        favouriteVendors: rfqData.favouriteVendors,
      };
      let publicTenderDataa = {
        isPublishToSuppliersNetwork: rfqData.isPublishToSuppliersNetwork,
        publicTenderFilter: rfqData.publicTenderFilter,
      };
      updatePrivateTenderData(privateTenderDataa);
      updatePublicTenderData(publicTenderDataa);
    }
    // eslint-disable-next-line
  }, []);

  const getPublicTenderData = (data) => {
    updatePublicTenderData(data);
  };
  const getPrivateTenderData = (data) => {
    updatePrivateTenderData(data);
  };

  const handleSubmit = () => {
    let data = {
      projectName: projectName,
      projectLocationId: selectedGov,
      projectOwner: projectOwner.name,
      isShownProjectOwner: !projectOwner.makeNotVisibleToVendors,
      projectConsultant: projectConsultant.name,
      isShownProjectConsultant: !projectConsultant.makeNotVisibleToVendors,
      projectContractor: projectContractor.name,
      isShownProjectContractor: !projectContractor.makeNotVisibleToVendors,
      publicTender: tenderType === "public" ? true : false,
      isRevealPricesToBidders: revealPrices,
      rfqPages: "rfqTable",
    };
    data = {
      ...data,
      ...publicTenderData,
      ...privateTenderData,
      rfqPackages: [],
    };
    if (
      projectName === undefined ||
      !projectName.length ||
      !selectedGov ||
      !projectOwner.name.length ||
      // eslint-disable-next-line
      (tenderType === "private" &&
        (!data.favouriteVendors || data.favouriteVendors.length === 0) &&
        !data.inviteByWhatsapp &&
        (!data.invitedEmails || data.invitedEmails.length === 0 || !privateTenderData.isValidEmail))) {
      updateAlert(true);
    } else {
      updateAlert(false);
      dispatch(addRFQDetails(data));
      getRFQPageName("rfqTable");
    }
  };

  return (
    <div className="pps ppe my-4 addRFQDetails">
      {alert && (
        <Alert variant={"danger"} className="text-center">
          {currentLocal.registration.pleaseFillAllRequiredFields}
        </Alert>
      )}
      <div className="d-flex justify-content-between rfq-info-container">
        <div className="flex-1 mx-2">
          <div className="d-flex  my-4 field-container flex-1">
            <label className="f-14 fw-500 d-flex align-items-start label">
              <span>{currentLocal.buyerHome.projectName}</span>
              <span className="errorSign">*</span>
            </label>
            <div className="d-flex flex-1">
              <Input
                type="text"
                className="input-field"
                value={projectName}
                onChange={(e) => {
                  updateProjectName(e.target.value);
                }}
                placeholder={currentLocal.buyerHome.typeProjectName}
              />
            </div>
          </div>
          <div className="d-flex  my-4 field-container">
            <label className="f-14 fw-500 d-flex align-items-start label">
              <span>{currentLocal.buyerHome.projectLocation}</span>
              <span className="errorSign">*</span>
            </label>
            <div className="d-flex flex-1">
              <Select
                placeholder={currentLocal.buyerHome.selectFromCities}
                className="input-field"
                onChange={(val) => {
                  updateSelectedGov(val);
                }}
                defaultValue={selectedGov}
                key={selectedGov}
              >
                {govList.map((gov) => {
                  return (
                    <Option value={gov.id} key={gov.id}>
                      {gov.name}
                    </Option>
                  );
                })}
              </Select>
            </div>
          </div>
          <div className="d-flex my-4 field-container">
            <label className="f-14 fw-500 d-flex align-items-start label ">
              <span>{currentLocal.buyerHome.projectOwner}</span>
              <span className="errorSign">*</span>
            </label>
            <div className="flex-1">
              <Input
                type="text"
                className="input-field"
                value={projectOwner.name}
                onChange={(e) => {
                  updateProjectOwner({
                    ...projectOwner,
                    name: e.target.value,
                  });
                }}
                placeholder={currentLocal.buyerHome.typeProjectOwner}
              />
              <Checkbox
                onChange={(e) => {
                  updateProjectOwner({
                    ...projectOwner,
                    makeNotVisibleToVendors: e.target.checked,
                  });
                }}
                className="my-2"
                defaultChecked={projectOwner.makeNotVisibleToVendors}
                key={projectOwner.makeNotVisibleToVendors}
              >
                {currentLocal.buyerHome.makeNotVisibleToVendors}
              </Checkbox>
            </div>
          </div>
        </div>
        <div className="flex-1 mx-2">
          <div className="d-flex my-4 field-container">
            <label className="f-14 fw-500 d-flex align-items-start label">
              <span>{currentLocal.buyerHome.projectConsultant}</span>
              {/* <span className="errorSign">*</span> */}
            </label>
            <div className="d-flex flex-column flex-1">
              <Input
                type="text"
                className="input-field"
                value={projectConsultant.name}
                onChange={(e) => {
                  updateProjectConsultant({
                    ...projectConsultant,
                    name: e.target.value,
                  });
                }}
                placeholder={currentLocal.buyerHome.typeProjectConsultantName}
              />
              <Checkbox
                onChange={(e) => {
                  updateProjectConsultant({
                    ...projectConsultant,
                    makeNotVisibleToVendors: e.target.checked,
                  });
                }}
                className="my-2"
                defaultChecked={projectConsultant.makeNotVisibleToVendors}
                key={projectConsultant.makeNotVisibleToVendors}
              >
                {currentLocal.buyerHome.makeNotVisibleToVendors}
              </Checkbox>
            </div>
          </div>
          <div className="d-flex my-4 field-container flex-1">
            <label className="f-14 fw-500 d-flex align-items-start label">
              <span>{currentLocal.buyerHome.projectContractor}</span>
              {/* <span className="errorSign">*</span> */}
            </label>
            <div className="d-flex flex-column flex-1 ">
              <Input
                type="text"
                className="input-field"
                value={projectContractor.name}
                onChange={(e) => {
                  updateProjectContractor({
                    ...projectContractor,
                    name: e.target.value,
                  });
                }}
                placeholder={currentLocal.buyerHome.typeProjectContractorName}
              />
              <Checkbox
                onChange={(e) => {
                  updateProjectContractor({
                    ...projectContractor,
                    makeNotVisibleToVendors: e.target.checked,
                  });
                }}
                className="my-2"
                defaultChecked={projectContractor.makeNotVisibleToVendors}
                key={projectContractor.makeNotVisibleToVendors}
              >
                {currentLocal.buyerHome.makeNotVisibleToVendors}
              </Checkbox>
            </div>
          </div>
        </div>
      </div>
      <div className="tenderType">
        <Radio.Group
          onChange={(e) => setTenderType(e.target.value)}
          value={tenderType}
        >
          <Radio value={"private"} className="mx-1">
            {currentLocal.buyerHome.privateTender}{" "}
            <span className="errorSign">*</span>
          </Radio>
          <Radio value={"public"} className="mx-1">
            {currentLocal.buyerHome.publicTender}
          </Radio>
        </Radio.Group>
        {tenderType === "public" ? (
          <PublicTender
            getPublicTenderData={getPublicTenderData}
            publicTenderData={publicTenderData}
            isListNotEmpty={Object.keys(publicTenderData).length ? true : false}
          />
        ) : (
          <PrivateTender
            getPrivateTenderData={getPrivateTenderData}
            privateTenderData={privateTenderData}
            isListNotEmpty={
              Object.keys(privateTenderData).length ? true : false
            }
          />
        )}
      </div>
      <Checkbox
        className="m-4"
        onChange={() => {
          updateRevealPrices(!revealPrices);
        }}
        defaultChecked={revealPrices}
        key={revealPrices}
      >
        {currentLocal.buyerHome.revealPrices}
      </Checkbox>
      <div className="text-center">
        <button className="button-primary" onClick={handleSubmit}>
          {currentLocal.buyerHome.confirm}
        </button>
      </div>
    </div>
  );
}

export default AddRFQDetails;
