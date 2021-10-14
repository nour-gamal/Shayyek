import { GetResource } from "../../Services";
export const GetUserTypes = (languageId, onSuccess, onFail, reqAuth = true) => {
    const path = `api/Account/GetUserTypes?languageId=${languageId}`;
    GetResource(path, onSuccess, onFail, reqAuth);
  };
  