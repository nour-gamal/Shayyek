import { postResource, getResource } from "../../Services";

export const login = (body, onSuccess, onFail, reqAuth = true) => {
	const path = "user/login";
	postResource(path, body, onSuccess, onFail, reqAuth);
};

export const getAllUsers = (onSuccess, onFail, reqAuth = true) => {
	const path = "getAllUsers";
	getResource(path, onSuccess, onFail, reqAuth);
};

export const userProfile = (onSuccess, onFail, reqAuth) => {
	const path = "user/me";
	getResource(path, onSuccess, onFail, reqAuth);
};
