import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { CartItem } from "../../types";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const existingItem = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItem !== -1) {
        state.items = [
          ...state.items.slice(0, existingItem),
          {
            ...state.items[existingItem],
            quantity: action.payload.quantity,
          },
          ...state.items.slice(existingItem + 1),
        ];
      } else {
        state.items = [
          ...state.items,
          {
            id: action.payload.id,
            quantity: action.payload.quantity,
          },
        ];
      }
    },
    deleteItem(state, action: PayloadAction<{ id: number }>) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        throw new Error("Product not found");
      }
    },
  },
});

export const { addItem, deleteItem } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cartItems.items;
export default cartSlice.reducer;
