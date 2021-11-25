import { GetResource } from "../../Services";

export const getCompanies = (languageId, onSuccess, onFail, reqAuth = true) => {
	const path = `api/Company/GetCompanies?languageId=${languageId}`;
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

export const getProducts = (
	languageId,
	companyId,
	onSuccess,
	onFail,
	reqAuth = false
) => {
	const path = `api/Product/GetProducts?languageId=${languageId}&&companyId=${companyId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};

// export const getRateDetails = (
// 	languageId,
// 	companyId,
// 	onSuccess,
// 	onFail,
// 	reqAuth = false
// ) => {
// 	const path = `api​/Rate​/UserRate?languageId=${languageId}&&companyId=${companyId}`;
// 	GetResource(path, onSuccess, onFail, reqAuth);
// };
