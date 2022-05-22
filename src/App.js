import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Routes from "./Routes";
import { getMessaging, getToken } from "firebase/messaging";
import { login, getDeviceId } from "./Redux/Authorization";
import { GetLanguages } from "./Network";
import { changeLocal } from "./Redux/Localization";
import { createPackageId, deletePackageId } from "./Redux/packageId";
import "./firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./App.css";

function App() {
  const { currentLocal } = useSelector((state) => state.currentLocal);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { packageId } = queryString.parse(search);

  useEffect(() => {
    if (packageId) {
      dispatch(createPackageId(packageId));
    } else {
      dispatch(deletePackageId());
    }
  }, [packageId, dispatch]);

  //Check whether user is not authorized then force logout
  // const logoutState = localStorage.getItem("logout");
  // if (logoutState) {
  // 	dispatch(logout({}));
  // 	 localStorage.setItem("logout", false);
  // }

  useEffect(() => {
    const fpPromise = FingerprintJS.load();
    // Get the visitor identifier when you need it.
    fpPromise
      .then((fp) => fp.get())
      .then((result) => {
        dispatch(getDeviceId({ deviceId: result.visitorId }));
      });
    const messaging = getMessaging();
    getToken(messaging, {
      vapidKey:
        "BK4EZ-CVW_XmNSdDbpW-0hRbx8lxdqGJDH_TyKtrog1jepnhJ8k58c81lE-_KFE3SlY471jWX5PGp9QqgoJowgk",
    })
      .then((currentToken) => {
        if (currentToken) {
          dispatch(login({ deviceToken: currentToken }));
        } else {
          // Show permission request UI
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              getToken(messaging, {
                vapidKey:
                  "BJ9PKzvyRs-YIlF_A_uL-kYeAUUn2woHVUUtGKKULdqRKaLQHkp2rhh4ybOlP7D9hF_dB9cMrq3Hg5gZrYnLO94",
              }).then((currentToken) => {
                dispatch(login({ deviceToken: currentToken }));
              });
            }
          });
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        if (!("Notification" in window)) {
          alert("This browser does not support desktop notification");
        }
        if (
          Notification["permission"] !== "granted" &&
          Notification["permission"] !== "denied"
        ) {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              getToken(messaging, {
                vapidKey:
                  "BJ9PKzvyRs-YIlF_A_uL-kYeAUUn2woHVUUtGKKULdqRKaLQHkp2rhh4ybOlP7D9hF_dB9cMrq3Hg5gZrYnLO94",
              }).then((currentToken) => {
                dispatch(login({ deviceToken: currentToken }));
              });
            }
          });
        } else {
          // notification permissions denied
          dispatch(
            login({ deviceToken: "user denied notifications permissions!" })
          );
        }
      });
    GetLanguages(
      (success) => {
        localStorage.setItem("englishId", success.data[0].id);
        localStorage.setItem("arabicId", success.data[1].id);
        dispatch(
          changeLocal(currentLocal.language === "English" ? "en" : "ar")
        );
      },
      (fail) => console.log(fail),
      false
    );
  });

  document
    .querySelector("html")
    .setAttribute("dir", currentLocal.language === "English" ? "ltr" : "rtl");

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
