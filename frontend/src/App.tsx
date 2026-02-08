import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import CustomersPage from "./pages/CustomersPage";
import OrdersPage from "./pages/OrdersPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Route pour afficher les clients */}
        <Route path="/" element={<CustomersPage />} />
        <Route path="/customers" element={<CustomersPage />} />

        {/* Route pour afficher les commandes d’un client */}
        <Route path="/customers/:id/orders" element={<OrdersPage />} />
      </Routes>
    </Layout>
  );
}
