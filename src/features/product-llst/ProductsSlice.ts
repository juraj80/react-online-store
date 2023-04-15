import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { ProductItem } from "../../types";
import products from "../../data/products.json";

interface ProductsState {
  items: ProductItem[];
}

const initialState: ProductsState = {
  items: products.map((product) => ({
    id: product.id,
    name: product.name,
    unitPrice: product.unit_price_incl_vat,
    quantity: product.stock_quantity,
    vatRate: product.vat_category,
  })),
};

console.log("initialState", initialState);
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex !== -1) {
        state.items = [
          ...state.items.slice(0, existingIndex),
          {
            ...state.items[existingIndex],
            quantity: action.payload.quantity,
          },
          ...state.items.slice(existingIndex + 1),
        ];
      } else {
        throw new Error("Product not found");
      }
    },
    decreaseProductQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex !== -1) {
        state.items = [
          ...state.items.slice(0, existingIndex),
          {
            ...state.items[existingIndex],
            quantity:
              state.items[existingIndex].quantity - action.payload.quantity,
          },
          ...state.items.slice(existingIndex + 1),
        ];
      } else {
        throw new Error("Product not found");
      }
    },
  },
});

export const { setProductQuantity, decreaseProductQuantity } =
  productsSlice.actions;
export const selectProductsItems = (state: RootState) =>
  state.productItems.items;
export default productsSlice.reducer;
