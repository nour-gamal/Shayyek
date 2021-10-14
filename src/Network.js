import { GetResource } from "./Services";

export const  GetLanguages= (body, onSuccess, onFail, reqAuth = true) => {
	const path = "api/Account/GetLanguages";
	GetResource(path, body, onSuccess, onFail, reqAuth);
};
