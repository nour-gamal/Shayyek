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
		ADDNEWPACKAGE: (state, action) => {
			state.rfqData.rfqPackages = [...state.rfqData.rfqPackages, action.payload.newPackageData]
			if (action.payload.oldPackageData) {
				state.rfqData.rfqPackages.push(action.payload.oldPackageData)
			}
		},
		UPDATEPACKAGE: (state, action) => {
			state.rfqData.rfqPackages[action.payload.index].rfqPackageDetailsRequests = action.payload.dataSource
			state.rfqData.rfqPackages[action.payload.index].address = action.payload.address
			state.rfqData.rfqPackages[action.payload.index].notes = action.payload.notes
			state.rfqData.rfqPackages[action.payload.index].receivingOffersDeadline = action.payload.receivingOffersDeadline
			state.rfqData.rfqPackages[action.payload.index].deliveryToId = action.payload.deliveryToId
			state.rfqData.rfqPackages[action.payload.index].deliveryDate = action.payload.deliveryDate
			state.rfqData.rfqPackages[action.payload.index].packageCCColleagues = action.payload.packageCCColleagues
			state.rfqData.rfqPackages[action.payload.index].packageFiles = action.payload.packageFiles
		},
		DELETEPACKAGE: (state, action) => {
			state.rfqData.rfqPackages.splice(action.payload.index, 1)
		}
	},
});
export const { addRFQDetails, UPDATEPACKAGE, DELETEPACKAGE, ADDNEWPACKAGE } = RFQSlice.actions;

export default RFQSlice.reducer;
