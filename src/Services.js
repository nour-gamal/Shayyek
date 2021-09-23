import axios from "axios";

const baseUrl = "https://ttask-mmanger.herokuapp.com/";
const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTQ3OTA1NWVkMGE0ZDY2YzliMTc2ZmMiLCJpYXQiOjE2MzI0MDc3NTF9.tSQDwKEE7cNEepaoOKzAn3AgXotcnKxRH3DECq2ZUZc";

export const postResource = (path, data, onSuccess, onFail) => {
	const requestData = {
		method: "post",
		url: baseUrl + path,
		headers: {},
		data,
	};

	if (path !== "user/login") {
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
