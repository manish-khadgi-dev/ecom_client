import "./App.css";

import { BrowserRouter as Browser, Routes, Route } from "react-router-dom";
import Registration from "./pages/register/Registration";
import LoginPage from "./pages/login/LoginPage";
import EmailVerify from "./pages/verify/EmailVerify";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/dashboard/Dashboard";
import ResetPassword from "./pages/reset-password/ResetPassword";
import Category from "./pages/category/Category";
import Products from "./pages/products/Products";
import Orders from "./pages/orders/Orders";
import PaymentOptions from "./pages/payment-options/PaymentOptions";
import Customers from "./pages/customers/Customers";
import Setting from "./pages/setting/Setting";
import { RequireAuth } from "./components/requireAuth/RequireAuth";

function App() {
  return (
    <div className="">
      <Browser>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="verify" element={<EmailVerify />} />
          <Route path="reset-password" element={<ResetPassword />} />

          {/* private routs */}
          <Route path="register" element={<Registration />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="category"
            element={
              <RequireAuth>
                <Category />
              </RequireAuth>
            }
          />
          <Route
            path="products"
            element={
              <RequireAuth>
                <Products />
              </RequireAuth>
            }
          />
          <Route
            path="orders"
            element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
            }
          />
          <Route
            path="payment-options"
            element={
              <RequireAuth>
                <PaymentOptions />
              </RequireAuth>
            }
          />
          <Route
            path="customers"
            element={
              <RequireAuth>
                <Customers />
              </RequireAuth>
            }
          />
          <Route
            path="setting"
            element={
              <RequireAuth>
                <Setting />
              </RequireAuth>
            }
          />
        </Routes>
      </Browser>
      <ToastContainer />
    </div>
  );
}

export default App;
