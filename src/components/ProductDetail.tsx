import React from "react";
import product_img from "../assets/images/product-img.png";

type ProductDetailProps = {
  name: string;
  price: number;
  onAddToCart: () => void;
};

export const ProductDetail = (props: ProductDetailProps) => {
  return (
    <div className="product-detail" style={styles.container}>
      <img src={product_img} alt="" />
      <h2>{props.name}</h2>
      <div style={styles.bottomSection}>
        <p style={styles.priceSection}>{`${props.price.toFixed(2)} €`}</p>
        <button className="blue-button" onClick={props.onAddToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem",
  },

  bottomSection: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceSection: {
    width: "20%",
  },
} as const;
