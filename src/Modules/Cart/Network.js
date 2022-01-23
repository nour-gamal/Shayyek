import { GetResource } from "../../Services";

export const getCart = (body, onSuccess, onFail, reqAuth = false) => {
	let { userId, languageId, deviceId } = body;
	const path = `api/Cart/GetCart?userId=${userId}&languageId=${languageId}&deviceId=${deviceId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};
