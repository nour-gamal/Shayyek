import { GetResource, PostResource } from "../../Services";

export const CompanyList = (languageId, onSuccess, onFail, reqAuth = true) => {
	const path = `api/Company/GetListOfCompanies?languageId=${languageId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};

export const CompanyHasAdmin = (companyId, onSuccess, onFail, reqAuth) => {
	const path = `api/Company/IsCompanyHasAdmin?companyId=${companyId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};
export const countryList = (languageId, onSuccess, onFail, reqAuth = true) => {
	const path = `api/Account/GetCountries?languageId=${languageId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};
export const governmentList = (
	languageId,
	countryId,
	onSuccess,
	onFail,
	reqAuth = true
) => {
	const path = `api/Account/GetGovernments?languageId=${languageId}&countryId=${countryId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};
export const getWork = (language, onSuccess, onFail, reqAuth = true) => {
	const path = `api/Account/GetCategoriesWithChilds?language=${language}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};
export const getRole = (languageId, onSuccess, onFail, reqAuth = true) => {
	const path = `api/Account/GetRoles?languageId=${languageId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};
export const getAccountType = (
	languageId,
	onSuccess,
	onFail,
	reqAuth = true
) => {
	const path = `api/Account/GetAccountTypes?languageId=${languageId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};
export const getCompanyType = (
	languageId,
	onSuccess,
	onFail,
	reqAuth = true
) => {
	const path = `api/Company/GetCompanyTypes?languageId=${languageId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};

export const addRegisterImage = (
	data,
	onSuccess,
	onFail,
	reqAuth = false,
	formData = true
) => {
	const path = "api/Account/GetImagePath";
	PostResource(path, data, onSuccess, onFail, reqAuth, formData);
};
export const register = (
	body,
	onSuccess,
	onFail,
	reqAuth = false,
	formData = false
) => {
	const path = `api/Account/Register`;
	PostResource(path, body, onSuccess, onFail, reqAuth, formData);
};
