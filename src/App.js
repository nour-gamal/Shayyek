import { useEffect } from "react";
import Routes from "./Routes";
import { useSelector, useDispatch } from "react-redux";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { login } from "./Redux/Authorization";
import "antd/dist/antd.css";
import { GetLanguages } from "./Network";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { message } from "antd";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

function App() {
  // Initialize Firebase

  const { currentLocal } = useSelector((state) => state.currentLocal);
  const { authorization } = useSelector((state) => state.authorization);
  console.log(authorization);
  const dispatch = useDispatch();
  const firebaseConfig = {
    apiKey: "AIzaSyDl8exN4m1F52c8fe9dGlMKKhuWotvzF9U",
    authDomain: "shayyek-cc93c.firebaseapp.com",
    projectId: "shayyek-cc93c",
    storageBucket: "shayyek-cc93c.appspot.com",
    messagingSenderId: "22834068986",
    appId: "1:22834068986:web:d85ffc0deb26fd755bf843",
    measurementId: "G-JCL13JT214",
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics();

  useEffect(() => {
    console.log(currentLocal);
    // localStorage.setItem("token",)
    const messaging = getMessaging();

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        // TODO(developer): Retrieve a registration token for use with FCM.
        // ...
        getToken(messaging, {
          vapidKey:
            "BA1v5RxQh3M64jtZwZP7LQbQTcUvMLmadQ1ElIEy9pA3O0vh_NAzEO7sioowruP05x8qy2mmFAhgE8m7aDn7D4U",
        })
          .then((currentToken) => {
            if (currentToken) {
              // Send the token to your server and update the UI if necessary
              // ...
              console.log("Tokeeeeeeen :   ", currentToken);

              dispatch(login({ deviceToken: currentToken }));
            } else {
              // Show permission request UI
              console.log(
                "No registration token available. Request permission to generate one."
              );
              // ...
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
            // ...
          });
      } else {
        console.log("Unable to get permission to notify.");
      }
    });

    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      // ...
    });
    GetLanguages(
      (success) => {
        localStorage.setItem("englishId", success.data[0].id);
        localStorage.setItem("arabicId", success.data[1].id);
      },
      (fail) => console.log(fail),
      false
    );
  }, [dispatch]);

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
