import { GetResource } from "../../Services";

export const getCart = (body, onSuccess, onFail, reqAuth = false) => {
	let { userId, languageId } = body;
	const path = "/api/Cart/GetCart?";
	GetResource(path, onSuccess, onFail, reqAuth);
};
