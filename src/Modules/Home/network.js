import { postResource } from "../../Services";

export const login = (body, onSuccess, onFail) => {
	const path = "user/login";
	postResource(path, body, onSuccess, onFail);
};
