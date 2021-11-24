import axios from "axios";
const baseUrl =
	"http://ec2-54-194-113-34.eu-west-1.compute.amazonaws.com:8080/";

const token =
	localStorage.getItem("persist:root") &&
	JSON.parse(JSON.parse(localStorage.getItem("persist:root")).authorization)
		.authorization.token;

export function PostResource(path, data, onSuccess, onFail, reqAuth, formData) {
	const requestData = {
		method: "post",
		url: baseUrl + path,
		headers: {},
		data,
	};
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
		});
}

export function GetResource(path, onSuccess, onFail, reqAuth) {
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
		// 	if(error.response){
		// 	if (error.response.status === 401) {
		// 		if (localStorage.getItem("persist:root")) {
		// 			localStorage.removeItem("persist:root");
		// 			window.location.reload();
		// 		}
		// 	}
		// }
		});
}
