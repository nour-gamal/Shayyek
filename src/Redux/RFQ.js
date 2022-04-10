import { createSlice } from "@reduxjs/toolkit";
export const RFQSlice = createSlice({
	name: "localization",
	initialState: {
		rfqData: {},
	},
	reducers: {
		addRFQDetails: (state, action) => {
			state.rfqData = action.payload;
		},
	},
});
export const { addRFQDetails } = RFQSlice.actions;

export default RFQSlice.reducer;
