import { GetResource } from "../../Services";

export const getCompanies = (onSuccess, onFail, reqAuth = true) => {
	const path = "api/Company/GetCompanies";
	GetResource(path, onSuccess, onFail, reqAuth);
};

export const getCategories = (language, onSuccess, onFail, reqAuth = false) => {
	const path = `api/Account/GetCategoriesWithChilds?language=${language}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};
