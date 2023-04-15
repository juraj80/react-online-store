import React from "react";
import { ProductDetail } from "./ProductDetail";
import { ProductItem } from "../types";

type ProductListProps = {
  products: ProductItem[];
  onAddToCart: (id: number) => void;
};

type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

const ProductList = (props: ProductListProps) => {
  return (
    <div className="products-list" style={styles.container}>
      {props.products.map((product) => (
        <ProductDetail
          key={product.id}
          name={product.name}
          price={product.unitPrice}
          onAddToCart={() => props.onAddToCart(product.id)}
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap" as FlexWrap,
    justifyContent: "flex-start",
    padding: "2.5rem",
  },
};

export default ProductList;
