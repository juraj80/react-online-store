import { CartProductItem, ProductItem } from "../../types";
import { useNavigate } from "react-router-dom";

import { HiOutlineTrash, HiOutlineArrowLeft } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addItem, deleteItem, selectCartItems } from "./CartSlice";
import {
  selectProductsItems,
  setProductQuantity,
} from "../product-llst/ProductsSlice";

const ShoppingCartPage = () => {
  const cartItems = useAppSelector(selectCartItems);
  const productItems = useAppSelector(selectProductsItems);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (item: CartProductItem, quantity: number) => {
    if (quantity < 1) {
      alert("Please enter a valid quantity");
      return;
    }
    if (quantity > item.availableQuantity) {
      alert("Out of stock");
      return;
    }

    dispatch(
      setProductQuantity({
        id: item.id,
        quantity: item.availableQuantity - quantity,
      })
    );
    dispatch(addItem({ id: item.id, quantity: quantity }));
  };

  const cartProductItems: CartProductItem[] = cartItems.map((item) => {
    const productItem = productItems.find(
      (product: ProductItem) => product.id === item.id
    );

    if (!productItem) {
      throw new Error("Product not found");
    }
    return {
      ...item,
      name: productItem.name,
      unitPrice: productItem.unitPrice,
      vatRate: productItem.vatRate,
      availableQuantity: productItem.quantity,
    };
  });

  const vatSums: { [key: number]: number } = {};

  cartProductItems.forEach((item) => {
    const vatAmount =
      (item.unitPrice / (100 + item.vatRate)) * item.vatRate * item.quantity;
    if (vatSums[item.vatRate]) {
      vatSums[item.vatRate] += vatAmount;
    } else {
      vatSums[item.vatRate] = vatAmount;
    }
  });

  const totalExclVat = cartProductItems.reduce(
    (total, item) =>
      total + (item.unitPrice * item.quantity) / (1 + item.vatRate / 100),
    0
  );

  const handleCheckout = () => {
    console.log("Order: ", cartProductItems);
    navigate("/checkout", {
      state: { items: cartProductItems, total: total },
    });
  };

  const vat = Object.values(vatSums).reduce((sum, curr) => sum + curr, 0);
  const total = totalExclVat + vat;

  return (
    <div className="shopping-cart" style={styles.container}>
      <div style={styles.header}>
        <h2>Cart</h2>
      </div>
      <div style={styles.tableSection}>
        <table className="table">
          <thead className="thead">
            <tr className="tr-head">
              <th className="th col-left">item</th>
              <th className="th col-left">quantity</th>
              <th className="th col-right">unit price incl. VAT</th>
              <th className="th col-right">VAT</th>
              <th className="th col-right">total</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {cartProductItems &&
              cartProductItems.map((item: CartProductItem) => (
                <tr className="tr-body" key={item.id}>
                  <td className="td">{item.name}</td>
                  <td className="td">
                    <input
                      className="table-input"
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item, parseInt(e.target.value))
                      }
                    />
                    <span className="trash-icon">
                      <HiOutlineTrash
                        size={16}
                        onClick={() => {
                          dispatch(deleteItem({ id: item.id }));
                          dispatch(
                            setProductQuantity({
                              id: item.id,
                              quantity: item.availableQuantity + item.quantity,
                            })
                          );
                        }}
                      />
                    </span>
                  </td>
                  <td className="td col-right">
                    {item.unitPrice.toFixed(2)} €
                  </td>
                  <td className="td col-right">{item.vatRate} %</td>
                  <td className="td col-right">
                    {(item.unitPrice * item.quantity).toFixed(2)} €
                  </td>
                </tr>
              ))}

            {cartProductItems.length > 0 && (
              <>
                <tr className="tr-body-bt">
                  <td className="td col-right" colSpan={4}>
                    Total excl. VAT
                  </td>
                  <td className="td col-right">{totalExclVat?.toFixed(2)} €</td>
                </tr>
                <tr className="tr-body-bt">
                  <td className="td col-right" colSpan={4}>
                    VAT 10%
                  </td>
                  <td className="td col-right">{vatSums[10]?.toFixed(2)} €</td>
                </tr>
                <tr className="tr-body">
                  <td className="td col-right" colSpan={4}>
                    VAT 20%
                  </td>
                  <td className="td col-right">{vatSums[20]?.toFixed(2)} €</td>
                </tr>
                <tr className="tr-body-bt">
                  <td className="td col-right" colSpan={4}>
                    Total
                  </td>
                  <td className="td col-right">{total?.toFixed(2)} €</td>
                </tr>
              </>
            )}
          </tbody>
        </table>

        {cartProductItems.length > 0 && (
          <>
            <div className="item-row justify-between">
              <div
                className="back-btn"
                onClick={() => {
                  navigate("/products");
                }}
              >
                <span className="icon">
                  <HiOutlineArrowLeft size={12} />
                </span>
                <span className="icon-text">Back</span>
              </div>
              <div>
                <button className="blue-button" onClick={handleCheckout}>
                  Send order
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",

    height: "100vh",
  },
  header: {
    display: "flex",
    height: "10%",
    alignItems: "center",
  },
  tableSection: {
    display: "flex",
    flexDirection: "column",
    width: "60%",
  },
} as const;

export default ShoppingCartPage;
