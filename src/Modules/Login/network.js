import { GetResource, PostResource } from "../../Services";

export const loginApi = (body, onSuccess, onFail, reqAuth = true) => {
	const path = "api/Account/Login";
	PostResource(path, body, onSuccess, onFail, reqAuth);
};
export const forgetPasswordApi = (body, onSuccess, onFail, reqAuth = true) => {
	const path = "api/Account/SendMail";
	PostResource(path, body, onSuccess, onFail, reqAuth);
};

export const IsUserAdmin = (
	emailOrMobile,
	onSuccess,
	onFail,
	reqAuth = true
) => {
	const path = `api/Account/IsUserAdmin?emailOrMobile=${emailOrMobile}`;
	GetResource(path, onSuccess, onFail, reqAuth);
};
