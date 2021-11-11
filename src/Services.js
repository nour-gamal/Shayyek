import axios from "axios";
const baseUrl = "http://192.175.123.213:9000/";
// const token =
// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRjZGQxMDdiZjM1YWM1OGYxMGZmNzkiLCJpYXQiOjE2MzI2NDg3MjN9.fNbFiXODEfYnQrBFn5yzClSYHadCUndxw-n5VcM8XHU";

// const authorization =
// 	localStorage.getItem("persist:root") &&
// 	JSON.parse(JSON.parse(localStorage.getItem("persist:root")).authorization)
// 		.authorization;

export const PostResource = (path, data, onSuccess, onFail, reqAuth) => {
	//	const { authorization } = useSelector((state) => state.authorization);
	const requestData = {
		method: "post",
		url: baseUrl + path,
		headers: {},
		data,
	};

	// if (reqAuth && authorization) {
	// 	requestData.headers = {
	// 		Authorization: "Bearer " + authorization.token,
	// 	};
	// }

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
		headers: {},
	};

	// if (reqAuth && authorization) {
	// 	requestData.headers = {
	// 		Authorization: "Bearer " + authorization.token,
	// 	};
	// }

	axios(requestData)
		.then((res) => {
			onSuccess(res.data);
		})
		.catch((error) => {
			onFail(error.response);
		});
};
