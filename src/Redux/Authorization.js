import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "../Services";

export const authorizationSlice = createSlice({
	name: "authorization",
	initialState: {
		authorization: {},
		deviceToken: {},
		deviceId: {},
	},
	reducers: {
		getDeviceId: (state, action) => {
			if (Object.keys(action.payload)[0] === "deviceId") {
				state.deviceId = action.payload;
			} else {
				state.authorization.deviceId = action.payload;
			}
		},
		login: (state, action) => {
			if (Object.keys(action.payload)[0] === "deviceToken") {
				state.deviceToken = action.payload;
			} else {
				state.authorization = action.payload;
			}
		},
		logout: (state, action) => {
			state.authorization = {};
			getToken(null);
		},
	},
});

export const { getDeviceId } = authorizationSlice.actions;
export const { login } = authorizationSlice.actions;
export const { logout } = authorizationSlice.actions;

export default authorizationSlice.reducer;
