import { configureStore } from "@reduxjs/toolkit";
import localizationReducer from "./Localization";
import authorizationReducer from "./Authorization";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
};

const RootReducers = combineReducers({
	currentLocal: localizationReducer,
	authorization: authorizationReducer,
});

const persistedReducer = persistReducer(persistConfig, RootReducers);

export default configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
