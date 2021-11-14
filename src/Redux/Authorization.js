import { createSlice } from "@reduxjs/toolkit";
import { Redirect } from "react-router-dom";

export const authorizationSlice = createSlice({
	name: "authorization",
	initialState: {
		authorization: {},
		deviceToken: {},
	},
	reducers: {
		login: (state, action) => {
			if (Object.keys(action.payload)[0] === "deviceToken") {
				state.deviceToken = action.payload;
			} else {
				state.authorization = action.payload;
			}
		},
		logout: (state, action) => {
			state.authorization = {};
		},
	},
});

export const { login } = authorizationSlice.actions;
export const { logout } = authorizationSlice.actions;

export default authorizationSlice.reducer;
