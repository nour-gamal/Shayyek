import { PostResource, GetResource } from "../../Services";

export const loginFun = (body, onSuccess, onFail, reqAuth = true) => {
	const path = "user/login";
	PostResource(path, body, onSuccess, onFail, reqAuth);
};

export const getAllUsers = (onSuccess, onFail, reqAuth = true) => {
	const path = "getAllUsers";
	GetResource(path, onSuccess, onFail, reqAuth);
};

export const userProfile = (onSuccess, onFail, reqAuth) => {
	const path = "user/me";
	GetResource(path, onSuccess, onFail, reqAuth);
};
