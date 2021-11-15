import { useEffect } from "react";
import Routes from "./Routes";
import { useSelector, useDispatch } from "react-redux";
//import { getMessaging, getToken } from "firebase/messaging";
//import { initializeApp } from "firebase/app";
//import { login } from "./Redux/Authorization";
import { GetLanguages } from "./Network";
import { changeLocal } from "./Redux/Localization";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

import "./App.css";

function App() {
	const { currentLocal } = useSelector((state) => state.currentLocal);

	const dispatch = useDispatch();
	// const firebaseConfig = {
	// 	apiKey: "AIzaSyDl8exN4m1F52c8fe9dGlMKKhuWotvzF9U",
	// 	authDomain: "shayyek-cc93c.firebaseapp.com",
	// 	projectId: "shayyek-cc93c",
	// 	storageBucket: "shayyek-cc93c.appspot.com",
	// 	messagingSenderId: "22834068986",
	// 	appId: "1:22834068986:web:d85ffc0deb26fd755bf843",
	// 	measurementId: "G-JCL13JT214",
	// };

	// initializeApp(firebaseConfig);

	useEffect(() => {
		// const messaging = getMessaging();
		// getToken(messaging, {
		// 	vapidKey:
		// 		"BHH-6zNNTm-rC6X7rfazhJlDc4HnCYhoEjN-A4qCuoDwiNUkoORYqd25nBMPm4WMMdfW7GTlk6o5eaRROAbn_NQ",
		// })
		// 	.then((currentToken) => {
		// 		if (currentToken) {
		// 			// Send the token to your server and update the UI if necessary
		// 			// ...
		// 			dispatch(login({ deviceToken: currentToken }));
		// 		} else {
		// 			// Show permission request UI
		// 			console.log(
		// 				"No registration token available. Request permission to generate one."
		// 			);
		// 			// ...
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		console.log("An error occurred while retrieving token. ", err);
		// 		// ...
		// 	});

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
