import { GetResource } from "../../Services";

export const getCompanies = (onSuccess, onFail, reqAuth = true) => {
	const path = "api/Company/GetCompanies";
	GetResource(path, onSuccess, onFail, reqAuth);
};
