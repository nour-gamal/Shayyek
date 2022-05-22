import { createSlice } from "@reduxjs/toolkit";

export const packageIdSlice = createSlice({
  name: "packageId",
  initialState: {
    packageId: null,
  },
  reducers: {
    createPackageId: (state, action) => {
      state.packageId = action.payload;
    },
    deletePackageId: (state) => {
      state.packageId = null;
    },
  },
});
export const { createPackageId, deletePackageId } = packageIdSlice.actions;

export default packageIdSlice.reducer;
