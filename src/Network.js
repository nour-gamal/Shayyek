import { GetResource } from "./Services";

export const GetLanguages = (onSuccess, onFail, reqAuth = false) => {
  const path = "api/Account/GetLanguages";
  GetResource(path, onSuccess, onFail, reqAuth);
};
