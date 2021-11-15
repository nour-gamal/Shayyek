import { PostResource, GetResource } from "../../Services";

export const getCategories = (
	languageId,

	onSuccess,
	onFail,
	reqAuth = true
) => {
	const path = `api/Account/GetRFQCategories?language=${languageId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};
export const searchCompany=(languageId,search,onSuccess,onFail,reqAuth = true)=>{
	const path = `api/Company/SearchCompany?languageId=${languageId}&&search=${search}`;
	GetResource(path, onSuccess, onFail, reqAuth);
}
export const GetUserTypes = (languageId, onSuccess, onFail, reqAuth = true) => {
	const path = `api/Account/GetUserTypes?languageId=${languageId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};

export const getDeliverdOptions = (
	languageId,
	onSuccess,
	onFail,
	reqAuth = true
) => {
	const path = `api/RFQ/GetDeliveryTo?languageId=${languageId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};


export const getCCEmails = (
	languageId,
	companyId,
	onSuccess,
	onFail,
	reqAuth = true
) => {
	const path = `api/RFQ/GetEmailsOfTheSameBuyerCompany?companyId=${companyId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};

export const GetSupplierAndContractorEmails = (
	onSuccess,
	onFail,
	reqAuth = true
) => {
	const path = `api/RFQ/GetSupplierAndContractorEmails`;
	GetResource(path, onSuccess, onFail, reqAuth);
};

export const postRFQ = (data, onSuccess, onFail, reqAuth = true) => {
	const path = `api/RFQ/GetSupplierAndContractorEmails`;
	PostResource(path, data, onSuccess, onFail, reqAuth);
};
