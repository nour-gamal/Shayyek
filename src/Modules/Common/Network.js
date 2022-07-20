import { GetResource, PostResource, PutResource } from "../../Services";
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

export const getVendorsReverseAuction = (packageId, onSuccess, onFail) => {
	const path = `api/Session/VendorsReverseAuction?packageId=${packageId}`;
	GetResource(path, onSuccess, onFail, true);
};

export const postReverseAuction = (data, onSuccess, onFail, reqAuth = true) => {
	const path = `api/Session/ReversAuction`;
	PostResource(path, data, onSuccess, onFail, reqAuth);
};

export const readNotificationsAPI = (data, onSuccess, onFail, reqAuth = true) => {
	const { notificationId } = data
	const path = `api/Notification/UpdateNotification${notificationId ? `?notificationId=${notificationId}` : ``}`;
	PutResource(path, onSuccess, onFail, reqAuth);
};

export const endSession = (data, onSuccess, onFail, reqAuth = true) => {
	const path = ``;
	PostResource(path, data, onSuccess, onFail, reqAuth);
};


