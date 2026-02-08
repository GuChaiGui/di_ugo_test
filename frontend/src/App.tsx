import { Routes, Route } from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import OrdersPage from "./pages/OrdersPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomersPage />} />
      <Route path="/customers" element={<CustomersPage />} />

      {/* Route pour afficher les commandes d’un client */}
      <Route path="/customers/:id/orders" element={<OrdersPage />} />
    </Routes>
  );
}
