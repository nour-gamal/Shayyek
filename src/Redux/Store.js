import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import localizationReducer from "./Localization";
import authorizationReducer from "./Authorization";
import RFQReducer from "./RFQ";
import cartReducer from "./Cart";
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
	cart: cartReducer,
	rfq: RFQReducer,
});
export const store = createStore(RootReducers);
// export const store = RootReducers;
const persistedReducer = persistReducer(persistConfig, RootReducers);

export default configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
