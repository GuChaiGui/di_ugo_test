import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrdersByCustomer } from "../api/orders_api";
import type { Order } from "../api/orders_api";
import Table from "../components/Table/Table";
import "../styles/OrdersPage.scss";
import Loader from "../components/Loader/Loader";

export default function OrdersPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [orders, setOrders] = useState<Order[]>([]);

    // total of price per currency
    const totalsByCurrency = orders.reduce((acc, o) => {
        if (!acc[o.currency]) acc[o.currency] = 0;
        acc[o.currency] += o.price * o.quantity;
        return acc;
    }, {} as Record<string, number>);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!id) return;

      getOrdersByCustomer(Number(id))
        .then(setOrders)
        .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Loader />;

    return (
      <main className="orders-page">
        <button className="btn-back" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1 className="page-title">Orders for customer #{id}</h1>

        <Table
          columns={[
            { key: "last_name", label: "Last Name" },
            { key: "purchase_identifier", label: "Purchase ID" },
            { key: "product_id", label: "Product ID" },
            { key: "quantity", label: "Qty" },
            { key: "price", label: "Price" },
            { key: "currency", label: "Currency" },
            {
              key: "date",
              label: "Date",
              render: (value) => new Date(value).toLocaleDateString(),
            },
          ]}
          data={orders}
          pagination={false} // PAS DE PAGINATION
        />

        <div className="orders-total">
            {Object.entries(totalsByCurrency).map(([currency, total]) => (
                <div key={currency}>
                Total ({currency}) : <strong>{total.toFixed(2)} {currency}</strong>
                </div>
            ))}
        </div>

      </main>
    );
}
