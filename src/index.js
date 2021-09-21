import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./Redux/Store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const persistor = persistStore(store);

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);
