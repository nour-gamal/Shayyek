import { createSlice } from "@reduxjs/toolkit";

export const authorizationSlice = createSlice({
	name: "authorization",
	initialState: {
		authorization: {},
	},
	reducers: {

	},
});

export const { login } = authorizationSlice.actions;

export default authorizationSlice.reducer;
