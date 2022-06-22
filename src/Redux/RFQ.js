import { createSlice } from "@reduxjs/toolkit";
export const RFQSlice = createSlice({
	name: "rfqSlice",
	initialState: {
		rfqData: {},
	},
	reducers: {
		addRFQDetails: (state, action) => {
			state.rfqData = action.payload;
		},
		UPDATEPACKAGE: (state, action) => {
			state.rfqData.rfqPackages[action.payload.index].rfqPackageDetailsRequests = action.payload.dataSource
		}
	},
});
export const { addRFQDetails, UPDATEPACKAGE } = RFQSlice.actions;

export default RFQSlice.reducer;
