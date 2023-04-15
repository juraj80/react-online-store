import React from "react";
import ProductList from "../../components/ProductList";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { decreaseProductQuantity, selectProductsItems } from "./ProductsSlice";
import { addItem } from "../shopping-cart/CartSlice";

function ProductsPage() {
  const productItems = useAppSelector(selectProductsItems);
  const dispatch = useAppDispatch();

  const handleAddToCart = (id: number) => {
    dispatch(addItem({ id: id, quantity: 1 }));
    dispatch(decreaseProductQuantity({ id: id, quantity: 1 }));
  };

  return (
    <div className="products-page" style={styles.container}>
      <h1>Products</h1>
      <ProductList products={productItems} onAddToCart={handleAddToCart} />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
} as const;
export default ProductsPage;
