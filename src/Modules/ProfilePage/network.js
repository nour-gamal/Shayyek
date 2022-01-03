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
