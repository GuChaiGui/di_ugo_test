import { Routes, Route } from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <Routes>
      {/* Home page: list of customers */}
      <Route path="/" element={<CustomersPage />} />

      {/* Orders page: list of orders for a specific customer */}
      <Route path="/orders/:id" element={<OrdersPage />} />
    </Routes>
  );
}

export default App;
