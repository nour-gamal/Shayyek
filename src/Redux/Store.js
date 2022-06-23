import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import localizationReducer from "./Localization";
import authorizationReducer from "./Authorization";
import packageIdReducer from "./packageId";
import RFQReducer from "./RFQ";
import cartReducer from "./Cart";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
  key: "shayyek",
  version: 1,
  storage,
};

const RootReducers = combineReducers({
  currentLocal: localizationReducer,
  authorization: authorizationReducer,
  cart: cartReducer,
  rfq: RFQReducer,
  packageId: packageIdReducer,
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
