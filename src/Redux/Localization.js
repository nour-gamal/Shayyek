import { createSlice } from "@reduxjs/toolkit";
import { en } from "../Resources/English";
import { ar } from "../Resources/Arabic";
export const localizationSlice = createSlice({
	name: "localization",
	initialState: {
		currentLocal: en,
		currentLanguageId: localStorage.getItem("englishId"),
	},
	reducers: {
		changeLocal: (state, action) => {
			state.currentLocal = action.payload === "en" ? en : ar;
			state.currentLanguageId =
				action.payload === "en"
					? localStorage.getItem("englishId")
					: localStorage.getItem("arabicId");
		},
	},
});
export const { changeLocal } = localizationSlice.actions;

export default localizationSlice.reducer;
