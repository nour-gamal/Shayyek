import { GetResource, PostResource } from "../../Services";

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
  let path = `api/Profile/SupplierContractorAddWork`;
  PostResource(path, data, onSuccess, onFail, reqAuth, true);
};
