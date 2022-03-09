import axios from "axios";

export const baseUrl = "https://api.shayyek.co/";

let token;
export const setStoreData = (newToken = null) => {
  token = newToken;
};

token =
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
      // onFailStatus(err.response);
      console.log(err);
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
    .catch((err) => {
      onFail(err.response);
      // onFailStatus(err.response);
      console.log(err);
    });
}

export function deleteResource(path, onSuccess, onFail, reqAuth) {
  const requestData = {
    method: "delete",
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
    .catch((err) => {
      onFail(err.response);
      // onFailStatus(err.response);
      console.log(err);
    });
}

export function PatchResource(
  path,
  data,
  onSuccess,
  onFail,
  reqAuth,
  formData
) {
  const requestData = {
    method: "patch",
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
      console.log(err);
      // onFailStatus(err.response);
    });
}
