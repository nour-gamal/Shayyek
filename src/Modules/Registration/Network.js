import { GetResource } from "../../Services";

export const CompanyList = (languageId, onSuccess, onFail, reqAuth = true) => {
  const path = `api/Company/GetListOfCompanies?languageId=${languageId}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};

export const CompanyHasAdmin = (
  companyId,
  onSuccess,
  onFail,
  reqAuth = true
) => {
  const path = `api/Company/IsCompanyHasAdmin?companyId=${companyId}`;
  GetResource(path, onSuccess, onFail, reqAuth);
};
