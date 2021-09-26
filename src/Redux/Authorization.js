import { createSlice } from "@reduxjs/toolkit";

export const authorizationSlice = createSlice({
	name: "authorization",
	initialState: {
		authorization: {},
	},
	reducers: {
		login: (state, action) => {
			state.authorization = action.payload;
		},
		logout: (state, action) => {
			state.authorization = {};
		},
	},
});

export const { login } = authorizationSlice.actions;

export default authorizationSlice.reducer;
