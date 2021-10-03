import { PostResource } from "../../Services";

export const loginApi = (body, onSuccess, onFail, reqAuth = true) => {
	const path = "'api/Account/Login'";
	PostResource(path, body, onSuccess, onFail, reqAuth);
};

