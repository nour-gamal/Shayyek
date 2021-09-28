import axios from "axios";
const baseUrl = "https://ttask-mmanger.herokuapp.com/";
// const token =
// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRjZGQxMDdiZjM1YWM1OGYxMGZmNzkiLCJpYXQiOjE2MzI2NDg3MjN9.fNbFiXODEfYnQrBFn5yzClSYHadCUndxw-n5VcM8XHU";
const token = localStorage.getItem("token");

export const PostResource = (path, data, onSuccess, onFail, reqAuth) => {
	//	const { authorization } = useSelector((state) => state.authorization);
	console.log(token);
	const requestData = {
		method: "post",
		url: baseUrl + path,
		headers: {},
		data,
	};

	if (reqAuth) {
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
};

export const GetResource = (path, onSuccess, onFail, reqAuth = true) => {
	const requestData = {
		method: "get",
		url: baseUrl + path,
	};

	if (reqAuth) {
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
		});
};
