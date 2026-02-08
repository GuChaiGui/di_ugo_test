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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        getOrdersByCustomer(Number(id))
        .then(setOrders)
        .finally(() => setLoading(false));
    }, [id]);

    // loading logo
    if (loading) return <Loader />;


    return (
        <main className="orders-page">
        <button className="btn-back" onClick={() => navigate(-1)}>
            ← Back
        </button>

        <h1 className="page-title">Orders for customer #{id}</h1>

        <Table
            columns={[
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
        />
        </main>
    );
}
