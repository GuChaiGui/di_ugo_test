import { Routes, Route } from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import OrdersPage from "./pages/OrdersPage";

export default function App() {
  return (
    <Routes>
      {/* Home page: list of customers */}
      <Route path="/" element={<CustomersPage />} />
      <Route path="/customers" element={<CustomersPage />} />

      {/* Orders page: list of orders for a specific customer */}
      <Route path="/orders/:id" element={<OrdersPage />} />
    </Routes>
  );
}
