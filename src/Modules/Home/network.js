import { PostResource, GetResource, deleteResource } from "../../Services";

export const getCategories = (
	languageId,
	onSuccess,
	onFail,
	reqAuth = true
) => {
	const path = `api/Account/GetRFQCategories?language=${languageId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};
export const searchCompany = (
	languageId,
	search,
	onSuccess,
	onFail,
	reqAuth = true
) => {
	const path = `api/Company/SearchCompany?languageId=${languageId}&&search=${search}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};
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

export const getCCEmails = (companyId, onSuccess, onFail, reqAuth = true) => {
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
	const path = `api/RFQ/AddOrEditRFQ`;
	PostResource(path, data, onSuccess, onFail, reqAuth);
};
export const ContactUs = (data, onSuccess, onFail, reqAuth = true) => {
	const path = `api/Account/ContactUs`;
	PostResource(path, data, onSuccess, onFail, reqAuth);
};
export const BuyerRFQ = (onSuccess, onFail, reqAuth = true) => {
	const path = `api/RFQ/GetBuyerRFQs`;
	GetResource(path, onSuccess, onFail, reqAuth);
};
export const getBuyerCompany = (
	languageId,
	onSuccess,
	onFail,
	reqAuth = true
) => {
	const path = `api/Company/GetRelatedCompaniesForBuyer?languageId=${languageId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};
export const getRFQ = (isDrafted, onSuccess, onFail, reqAuth = true) => {
	const path = `api/RFQ/GetSupplierContractorRFQInvitations?isDrafted=${isDrafted}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};

export const ImportProductsAsExcelSheet = (
	data,
	onSuccess,
	onFail,
	reqAuth = true,
	formData = true
) => {
	const path = "api/Product/ImportProductsAsExcelSheet";
	PostResource(path, data, onSuccess, onFail, reqAuth, formData);
};

export const addProduct = (
	data,
	onSuccess,
	onFail,
	reqAuth = true,
	formData = false
) => {
	const path = "api/Product/AddProduct";
	PostResource(path, data, onSuccess, onFail, reqAuth, formData);
};

export const addProductImg = (
	data,
	onSuccess,
	onFail,
	reqAuth = true,
	formData = true
) => {
	const path = "api/Account/GetImagePath";
	PostResource(path, data, onSuccess, onFail, reqAuth, formData);
};
export const getProducts = (
	languageId,
	companyId,
	onSuccess,
	onFail,
	reqAuth = true
) => {
	const path = `api/Product/GetProductsByCompanyId?languageId=${languageId}&companyId=${companyId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};
export const deleteProducts = (
	productId,
	onSuccess,
	onFail,
	reqAuth = true
) => {
	const path = `api/Product/DeleteProduct?productId=${productId}`;
	deleteResource(path, onSuccess, onFail, reqAuth);
};
export const GetBuyerAddedRFQOffers = (
	RFQId,
	languageId,
	onSuccess,
	onFail,
	reqAuth = true
) => {
	const path = `api/RFQ/GetBuyerAddedRFQOffers?RFQId=${RFQId}&LanguageId=${languageId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};
export const GetBuyerRFQ = (
	RFQId,
	onSuccess,
	onFail,
	reqAuth = true
) => {
	const path = `api/RFQ/GetRFQ?rfqHeaderId=${RFQId}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};

export const DeleteRFQ = (RFQId, onSuccess, onFail, reqAuth = true) => {
	const path = `api/RFQ/DeleteRFQ?RFQId=${RFQId}`;
	deleteResource(path, onSuccess, onFail, reqAuth);
};
