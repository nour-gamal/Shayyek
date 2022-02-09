import { GetResource } from "../../Services";
export const GetUserTypes = (languageId, onSuccess, onFail, reqAuth = true) => {
  const path = `api/Account/GetUserTypes?languageId=${languageId}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};
export const GetProductDetails = (
  languageId,
  productId,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const path = `api/Product/GetProductDetails?languageId=${languageId}&productId=${productId}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};

export const getNotifications = (languageId, onSuccess, onFail) => {
  const path = `api/Notification/GetAllNotifications?languageId=${languageId}`;
  GetResource(path, onSuccess, onFail, true);
};
