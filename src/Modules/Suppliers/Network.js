import { GetResource } from "../../Services";

export const getCompanies = (onSuccess, onFail, reqAuth = true) => {
	const path = "api/Company/GetCompanies";
	GetResource(path, onSuccess, onFail, reqAuth);
};

export const getCategories = (language, onSuccess, onFail, reqAuth = false) => {
	const path = `api/Account/GetCategoriesWithChilds?language=${language}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};
export const countryList = (languageId, onSuccess, onFail, reqAuth = true) => {
	const path = `api/Account/GetCountries?languageId=${languageId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};
export const getGovernmentList = (
	languageId,
	countryId,
	onSuccess,
	onFail,
	reqAuth = true
) => {
	const path = `api/Account/GetGovernments?languageId=${languageId}&countryId=${countryId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};
