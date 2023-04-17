import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./features/product-llst/ProductsPage";
import ShoppingCartPage from "./features/shopping-cart/ShoppingCartPage";
import CheckoutPage from "./features/checkout/CheckoutPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route index element={<ProductsPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="cart" element={<ShoppingCartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
