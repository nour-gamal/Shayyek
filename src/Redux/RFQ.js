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
		DELETERFQ: (state, action) => {
			state.rfqData = {}
		},
		ADDNEWPACKAGE: (state, action) => {
			if (action.payload.oldPackageData) {
				state.rfqData.rfqPackages = [...state.rfqData.rfqPackages, action.payload.oldPackageData, action.payload.newPackageData]
			} else {
				state.rfqData.rfqPackages = [...state.rfqData.rfqPackages, action.payload.newPackageData]
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
			state.rfqData.rfqPackages[action.payload.index].documentsList = action.payload.documentsList
			state.rfqData.rfqPackages[action.payload.index].ImportedSheet = action.payload.ImportedSheet
		},
		DELETEPACKAGE: (state, action) => {
			state.rfqData.rfqPackages.splice(action.payload, 1)
		}
	},
});
export const { addRFQDetails, UPDATEPACKAGE, DELETEPACKAGE, ADDNEWPACKAGE, DELETERFQ } = RFQSlice.actions;

export default RFQSlice.reducer;
