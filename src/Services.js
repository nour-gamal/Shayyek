import axios from "axios";

const baseUrl = "http://192.175.123.213:9000/";

const token =
	localStorage.getItem("persist:root") &&
	JSON.parse(JSON.parse(localStorage.getItem("persist:root")).authorization)
		.authorization.token;

export const PostResource = (path, data, onSuccess, onFail, reqAuth) => {
	const requestData = {
		method: "post",
		url: baseUrl + path,
		headers: {},
		data,
	};

	if (reqAuth && token) {
		requestData.headers = {
			Authorization: "Bearer " + token,
		};
	}

	axios(requestData)
		.then((res) => {
			onSuccess(res.data);
		})
		.catch((err) => {
			onFail(err.response);
			// console.log(err);
			// if (err.response.status === 401) {
			// 	localStorage.setItem("logout", true);
			// }
		});
};

export const GetResource = (path, onSuccess, onFail, reqAuth = true) => {
	const requestData = {
		method: "get",
		url: baseUrl + path,
		headers: {},
	};

	if (reqAuth && token) {
		requestData.headers = {
			Authorization: "Bearer " + token,
		};
	}

	axios(requestData)
		.then((res) => {
			onSuccess(res.data);
		})
		.catch((error) => {
			onFail(error.response);
			if (error.response.status === 401) {
				localStorage.setItem("logout", true);
			}
		});
};
