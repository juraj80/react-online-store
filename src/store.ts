import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./features/shopping-cart/CartSlice";
import productsSliceReducer from "./features/product-llst/ProductsSlice";

export const store = configureStore({
  reducer: {
    cartItems: cartSliceReducer,
    productItems: productsSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
