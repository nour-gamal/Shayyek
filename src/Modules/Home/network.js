import {
  PostResource,
  GetResource,
  deleteResource,
  PatchResource,
} from "../../Services";

export const getCategories = (
  languageId,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const path = `api/Account/GetRFQCategories?language=${languageId}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};

export const GetProductDetailsForEdit = (
  data,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const { productId } = data;
  const path = `api/Product/GetProductDetailsForEdit?productId=${productId}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};
export const searchCompany = (
  languageId,
  search,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const path = `api/Company/SearchCompany?languageId=${languageId}&&search=${search}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};
export const GetUserTypes = (languageId, onSuccess, onFail, reqAuth = true) => {
  const path = `api/Account/GetUserTypes?languageId=${languageId}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};

export const getDeliverdOptions = (
  languageId,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const path = `api/RFQ/GetDeliveryTo?languageId=${languageId}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};

export const getCCEmailsList = (
  companyId,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const path = `api/RFQ/GetEmailsOfTheSameBuyerCompany?companyId=${companyId}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};

export const GetSupplierAndContractorEmails = (
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const path = `api/RFQ/GetSupplierAndContractorEmails`;
  GetResource(path, onSuccess, onFail, reqAuth);
};

export const postRFQ = (data, onSuccess, onFail, reqAuth = true) => {
  const path = `api/RFQ/AddRFQ`;
  PostResource(path, data, onSuccess, onFail, reqAuth);
};
export const ContactUs = (data, onSuccess, onFail, reqAuth = true) => {
  const path = `api/Account/ContactUs`;
  PostResource(path, data, onSuccess, onFail, reqAuth);
};
export const BuyerRFQ = (onSuccess, onFail, reqAuth = true) => {
  const path = `api/RFQ/GetBuyerRFQsNew`;
  GetResource(path, onSuccess, onFail, reqAuth);
};
export const getBuyerCompany = (
  languageId,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const path = `api/Company/GetRelatedCompaniesForBuyer?languageId=${languageId}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};
export const getRFQ = (isDrafted, onSuccess, onFail, reqAuth = true) => {
  const path = `api/RFQ/GetSupplierContractorRFQInvitationsNew?isDrafted=${isDrafted}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};

export const ImportProductsAsExcelSheet = (
  data,
  onSuccess,
  onFail,
  reqAuth = true,
  formData = true
) => {
  const path = "api/Product/ImportProductsAsExcelSheet";
  PostResource(path, data, onSuccess, onFail, reqAuth, formData);
};

export const addProduct = (
  data,
  onSuccess,
  onFail,
  reqAuth = true,
  formData = false
) => {
  const path = "api/Product/AddProduct";
  PostResource(path, data, onSuccess, onFail, reqAuth, formData);
};

export const addProductImg = (
  data,
  onSuccess,
  onFail,
  reqAuth = true,
  formData = true
) => {
  const path = "api/Account/GetImagePath";
  PostResource(path, data, onSuccess, onFail, reqAuth, formData);
};
export const getProducts = (
  languageId,
  companyId,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const path = `api/Product/GetProductsByCompanyId?languageId=${languageId}&companyId=${companyId}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};
export const deleteProducts = (
  productId,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const path = `api/Product/DeleteProduct?productId=${productId}`;
  deleteResource(path, onSuccess, onFail, reqAuth);
};
export const GetBuyerAddedRFQOffers = (
  RFQId,
  languageId,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const path = `api/RFQ/GetBuyerAddedRFQOffers?RFQId=${RFQId}&LanguageId=${languageId}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};
export const GetBuyerRFQ = (RFQId, onSuccess, onFail, reqAuth = true) => {
  const path = `api/RFQ/GetRFQ?rfqHeaderId=${RFQId}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};

export const DeleteRFQ = (RFQId, onSuccess, onFail, reqAuth = true) => {
  const path = `api/RFQ/DeleteRFQNew?RFQId=${RFQId}`;
  deleteResource(path, onSuccess, onFail, reqAuth);
};

export const fillRFQ = (data, onSuccess, onFail, reqAuth = true) => {
  const path = "api/RFQ/FillRFQ";
  PostResource(path, data, onSuccess, onFail, reqAuth);
};
export const getFilledRFQ = (
  RFQId,
  languageId,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const path = `api/RFQ/GetFilledRFQOfferDetails?rfqHeaderId=${RFQId}&languageId=${languageId}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};

export const BuyerAcceptRFQ = (data, onSuccess, onFail, reqAuth = true) => {
  const { RFQId, filledRFQId } = data;
  const path = `api/RFQ/BuyerAcceptRFQ?RFQId=${RFQId}&filledRFQId=${filledRFQId}`;
  PostResource(path, data, onSuccess, onFail, reqAuth);
};
export const BuyerRejectOffer = (data, onSuccess, onFail, reqAuth = true) => {
  const { supplierOrContractorId } = data;
  const path = `api/RFQ/BuyerRejectOffer?supplierOrContractorId=${supplierOrContractorId}`;
  PostResource(path, data, onSuccess, onFail, reqAuth);
};
export const GetFilledRFQOfferDetails = (
  body,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const { fillRFQHeaderId, languageId } = body;
  const path = `api/RFQ/GetFilledRFQOfferDetails?languageId=${languageId}&fillRFQHeaderId=${fillRFQHeaderId}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};

export const getSupplierContractorHomePage = (
  languageId,
  onSuccess,
  onFail
) => {
  const path = `api/Profile/SupplierContractorHomePage?languageId=${languageId}`;
  GetResource(path, onSuccess, onFail, true);
};
export const GetProductDetails = (data, onSuccess, onFail) => {
  const { languageId, ProductId } = data;
  const path = `api/Product/GetProductDetails?languageId=${languageId}&ProductId=${ProductId}`;
  GetResource(path, onSuccess, onFail, true);
};

export const EditProduct = (data, onSuccess, onFail, reqAuth = true) => {
  const path = `api/Product/EditProduct`;
  PatchResource(path, data, onSuccess, onFail, reqAuth);
};

export const GetFavVendor = (onSuccess, onFail, reqAuth = true) => {
  const path = `api/Profile/FavouriteVendors`;
  GetResource(path, onSuccess, onFail, true);
};

export const AddDocumentList = (
  data,
  onSuccess,
  onFail,
  reqAuth = true,
  formData = true
) => {
  const path = "api/Account/DocumentList";
  PostResource(path, data, onSuccess, onFail, reqAuth, formData);
};

export const getQuestionWall = (onScuccess, onFail) => {
  const path = "api/QuestionsWall/QuestionWall";
  GetResource(path, onScuccess, onFail);
};

export function postQuestionWall(onSuccess, onFail) {
  const path = "api/QuestionsWall/AnswerQuestionWall";
  PostResource(path, onSuccess, onFail);
}
export const GetSuppliersAndContratorsThatFilledRFQ = (
  data,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const { rfqId } = data;
  const path = `api/Session/GetSuppliersAndContratorsThatFilledRFQ?rfqId=${rfqId}`;
  GetResource(path, onSuccess, onFail, true);
};

export function assignRfqToSupplierContractor(packageId, onSuccess, onFail) {
  const path = `api/RFQ/AssignRFQToSupplierContractor?rfqId=${packageId}`;
  PostResource(path, null, onSuccess, onFail, true);
}
export function GetBuyerRFQForEdit(rfqId, onSucces, onFail) {
  const path = `api/RFQ/GetBuyerRFQForEdit?rfqId=${rfqId}`;
  GetResource(path, onSucces, onFail, true);
}

export function GetRFQSummary(rfqId, onSucces, onFail, reqAuth = true) {
  const path = `api/RFQ/GetRFQSummary?rfqId=${rfqId}`;
  GetResource(path, onSucces, onFail, reqAuth);
}

export function editRFQPackage(data, onSuccess, onFail, reqAuth = true) {
  const path = `api/RFQ/EditRFQ`;
  PostResource(path, data, onSuccess, onFail, reqAuth);
}
