import { GetResource, PatchResource, PostResource } from "../../Services";

export const getCart = (body, onSuccess, onFail, reqAuth = false) => {
	let { userId, languageId, deviceId } = body;

	let path = `api/cart/GetCart?languageId=${languageId}`;
	if (userId) {
		path = path + `&userId=${userId}`;
	} else {
		path = path + `&deviceId=${deviceId}`;
	}

	GetResource(path, onSuccess, onFail, reqAuth);
};
export const updateCart = (data, onSuccess, onFail) => {
	const { cartId, quantity, deviceId } = data;
	const path = `api/cart/updateCart?orderDetailsId=${cartId}&quantity=${quantity}&deviceId=${deviceId}`;
	PatchResource(path, {}, onSuccess, onFail);
};
export const GetPaymentMethods = (body, onSuccess, onFail, reqAuth = false) => {
	let { languageId } = body;
	let path = `api/Order/GetPaymentMethods?languageId=${languageId}`;

	GetResource(path, onSuccess, onFail, reqAuth);
};
export const AddOrder = (body, onSuccess, onFail, reqAuth = true) => {
	let path = `api/Order/AddOrder`;
	PostResource(path, body, onSuccess, onFail, reqAuth);
};
