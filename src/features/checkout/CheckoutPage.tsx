import { useLocation, useNavigate } from "react-router-dom";
import { CartProductItem } from "../../types";

type Item = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

const CheckoutPage = () => {
  const { state } = useLocation();

  const navigate = useNavigate();
  const items = state?.items.map((item: CartProductItem) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    price: item.unitPrice,
  }));

  const total = state.total ? state.total : 0;

  return (
    <div className="checkout" style={styles.container}>
      {!items && items.length === 0 && <h2>Cart is empty</h2>}

      {items && items.length > 0 && (
        <>
          <div style={styles.header}>
            <h2>Thank you for your order</h2>
          </div>
          <div style={styles.tableSection}>
            <div>
              <table className="table">
                <tbody>
                  {items?.map((item: Item) => (
                    <tr key={item.id}>
                      <td className="td col-right" style={{ width: "50%" }}>
                        {item.quantity}x
                      </td>
                      <td className="td col-left">{item.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="item-row">
            <p>
              Please send us the payment of
              <span className="header"> {`${total.toFixed(2)}`} € </span> to our
              bitcoin address.
            </p>
          </div>
        </>
      )}

      <div className="item-row">
        <button
          className="blue-button"
          onClick={() => {
            navigate("/products");
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    //justifyContent: "center",
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
    // backgroundColor: "lightblue",
    width: "20%",
    minHeight: "30%",
  },
} as const;

export default CheckoutPage;
