import { GetResource } from "../../Services";


export const getCategories = (
	languageId,
	onSuccess,
	onFail,
	reqAuth = true
) => {
	const path = `api/Account/GetRFQCategories?language=${languageId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};
export const GetUserTypes = (languageId, onSuccess, onFail, reqAuth = true) => {
    const path = `api/Account/GetUserTypes?languageId=${languageId}`;
    GetResource(path, onSuccess, onFail, reqAuth);
  };
  