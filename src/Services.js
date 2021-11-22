import axios from "axios";

const baseUrl =
	"http://ec2-54-194-113-34.eu-west-1.compute.amazonaws.com:8080/";

const token =
	localStorage.getItem("persist:root") &&
	JSON.parse(JSON.parse(localStorage.getItem("persist:root")).authorization)
		.authorization.token;

export const PostResource = (
	path,
	data,
	onSuccess,
	onFail,
	reqAuth = true,
	formData = false
) => {
	const requestData = {
		method: "post",
		url: baseUrl + path,
		headers: {},
		data,
	};
	console.log(formData);
	if (formData) {
		requestData.headers = {
			"content-type": "multipart/form-data",
		};
	}

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
			console.log(error);
		});
};
