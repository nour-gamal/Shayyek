import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cart: [],
	},
	reducers: {
		addToCart: (state, action) => {
			state.cart = [...state.cart, action.payload];
		},
		removeFromCart: (state, action) => {
			let oldCart = [...state.cart];
			oldCart = oldCart.filter((item) => item.id !== action.payload.id);
			state.cart = oldCart;
		},
		deleteCart: (state, action) => {
			state.cart = [];
		},
	},
});
export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
