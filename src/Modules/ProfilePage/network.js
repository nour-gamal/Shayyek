import { GetResource, PatchResource, PostResource } from "../../Services";

export const getBuyerProfile = (
  languageId,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const path = `api/Profile/BuyerProfile?languageId=${languageId}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};

export const getCategoriesWithSelected = (
  languageId,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const path = `api/Profile/GetCategoriesWithSelected?languageId=${languageId}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};
export const postImage = (
  data,
  onSuccess,
  onFail,
  reqAuth = false,
  formData = true
) => {
  const path = `api/Account/GetImagePath`;
  PostResource(path, data, onSuccess, onFail, reqAuth, formData);
};

export const changePassword = (data, onSuccess, onFail, reqAuth = true) => {
  const { languageId, newPassword, oldPassword } = data;
  let path = `api/Account/IsPasswordMatched?oldPassword=${oldPassword}&newPassword=${newPassword}&languageId=${languageId}`;
  PostResource(path, data, onSuccess, onFail, reqAuth);
};
export const editProfile = (data, onSuccess, onFail, reqAuth = true) => {
  let path = `api/Account/EditUser`;
  PostResource(path, data, onSuccess, onFail, reqAuth);
};

export const SupplierContractorProfile = (
  languageId,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  let path = `api/Profile/SupplierContractorProfile?languageId=${languageId}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};

export const SupplierContractorAddWork = (
  data,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const path = `api/Profile/SupplierContractorAddWork`;
  PostResource(path, data, onSuccess, onFail, reqAuth, true);
};

export const GetWorkAddedBySupplierContractor = (
  prevWorkId,
  onSuccess,
  onFail
) => {
  const path = `api/Profile/GetWorkAddedBySupplierContractor?prevWorkId=${prevWorkId}`;
  GetResource(path, onSuccess, onFail, true);
};

export const supplierContractorEditWork = (data, onSuccess, onFail) => {
  const path = `api/Profile/SupplierContractorEditWork`;
  PatchResource(path, data, onSuccess, onFail, true);
};

export const getUsersByComapnyAdmin = (
  data,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const { companyId, languageId } = data;
  const path = `api/Profile/GetUsersByComapnyAdmin?companyId=${companyId}&languageId=${languageId}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};

export const userDetailsForAdminActions = (data, onSuccess, onFail) => {
  const path = "api/Profile/UserDetailsForAdminActions";
  PostResource(path, data, onSuccess, onFail, true);
};
export const acceptOrRejectUser = (
  { isActive, rejectedUserId },
  onSuccess,
  onFail
) => {
  const path = `api/Profile/AcceptOrRejectUser?rejectedUserId=${rejectedUserId}&isActive=${isActive}`;
  GetResource(path, onSuccess, onFail, true);
};

export const resetPassword = (data, onSuccess, onFail) => {
  const { userId, newPassword } = data;
  const path = `api/Account/ResetPassword?userId=${userId}&newPassword=${newPassword}`;
  PostResource(path, data, onSuccess, onFail);
};
export const getRFQDraftedForSupplierAndContractor = (
  fillRFQHeaderId,
  onSuccess,
  onFail
) => {
  const path = `api/RFQ/GetRFQDraftedForSupplierAndContractor?fillRFQHeaderId=${fillRFQHeaderId}`;
  GetResource(path, onSuccess, onFail, true);
};

export const SupplierContractorProfileForBuyer = (data, onSuccess, onFail) => {
  const { userId, currentLanguageId } = data;
  const path = `api/Profile/SupplierContractorProfileForBuyer?supplierContractorId=${userId}&languageId=${currentLanguageId}`;
  GetResource(path, onSuccess, onFail, true);
};
export const GetImagePath = (
  data,
  onSuccess,
  onFail,
  reqAuth = true,
  formData = true
) => {
  const path = "api/Account/GetImagePath";
  PostResource(path, data, onSuccess, onFail, reqAuth, formData);
};
export const AddToMyFavVendors = (data, onSuccess, onFail, reqAuth = true) => {
  const { vendorId, isAdded } = data;
  const path = `api/Profile/AddToFavouriteVendors?vendorId=${vendorId}&&isAdded=${isAdded}`;
  PostResource(path, {}, onSuccess, onFail, reqAuth);
};
export const getSingleRFQData = (data, onSuccess, onFail) => {
  const path = ``;
  GetResource(path, onSuccess, onFail, true);
};
export const getQuestionsList = (data, onSuccess, onFail) => {
  const path = `api/QuestionsWall/QuestionWall?PackageId=${data.rfqPackageId}`;
  GetResource(path, onSuccess, onFail, true);
};
export const AddQuestion = (data, onSuccess, onFail, reqAuth = true) => {
  const path = `api/QuestionsWall/QuestionWall`;
  PostResource(path, data, onSuccess, onFail, reqAuth);
};

export const fillRFQ = (data, onSuccess, onFail, reqAuth = true) => {
  const path = `api/RFQ/FillRFQPackage`;
  PostResource(path, data, onSuccess, onFail, reqAuth);
};
export const GetRFQPackageToFill = (
  data,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const { rfqPackageId } = data;
  const path = `api/RFQ/GetRFQPackage?rfqPackageId=${rfqPackageId}`;
  GetResource(path, onSuccess, onFail, true);
};
export const AnswerQuestionWall = (data, onSuccess, onFail, reqAuth = true) => {
  const { QuestionWallId, answer } = data;
  const path = `api/QuestionsWall/AnswerQuestionWall?QuestionWallId=${QuestionWallId}&answer=${answer}`;
  PostResource(path, {}, onSuccess, onFail, reqAuth);
};
export const GetSummaryFilter = (onSuccess, onFail, reqAuth = true) => {
  const path = `api/RFQ/GetSummaryFilter`;
  GetResource(path, onSuccess, onFail, true);
};

export const FilterPackageOffer = (data, onSuccess, onFail, reqAuth = true) => {
  const { PackageId, FilterId } = data;
  const path = `api/RFQ/FilterPackageOffer?PackageId=${PackageId}&FilterId=${FilterId}`;
  GetResource(path, onSuccess, onFail, true);
};

export const GetItemOffers = (data, onSuccess, onFail, reqAuth = true) => {
  const { ItemId } = data;
  const path = `api/RFQ/GetItemOffers?ItemId=${ItemId}`;
  GetResource(path, onSuccess, onFail, true);
};
export const ViewPackageQuotation = (
  data,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const { FilledItemId } = data;
  const path = `api/RFQ/ViewPackageQuotation?FilledItemId=${FilledItemId}`;
  GetResource(path, onSuccess, onFail, true);
};

export const BuyerAcceptPackageItems = (
  data,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const path = `api/RFQ/BuyerAcceptPackageItems`;
  PostResource(path, data, onSuccess, onFail, reqAuth);
};

export const getDeliveryPeriod = (
  languageId,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const path = `api/Account/DeliveryPeriod?languageId=${languageId}`;
  GetResource(path, onSuccess, onFail, true);
};

export const getRateQuestionAnswers = (
  data,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const { currentLanguageId } = data
  const path = `api/Rate/GetRateQuestionAnswers?languageId=${currentLanguageId}`;
  GetResource(path, onSuccess, onFail, true);
};

export const getVendorsForRating = (
  data,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const { headerIdOrOrderId, isOrder } = data
  const path = `api/Rate/VendorsForRating?headerIdOrOrderId=${headerIdOrOrderId}&isOrder=${isOrder}`;
  GetResource(path, onSuccess, onFail, true);
};


export const postUserRate = (
  data,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const path = `api/Rate/UserRate`;
  PostResource(path, data, onSuccess, onFail, reqAuth);
};


export const getVendorRates = (
  data,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const { vendorId, languageId } = data
  const path = `api/Rate/VendorRateSummary?vendorId=${vendorId}&languageId=${languageId}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};