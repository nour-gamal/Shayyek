import { GetResource } from "../../Services";

export const getBuyerProfile = (languageId, onSuccess, onFail, reqAuth = true) => {
	const path = `api/Profile/BuyerProfile?languageId=${languageId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};
