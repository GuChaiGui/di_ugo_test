import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../api/customers_api";
import type { Customer } from "../api/customers_api";
import Table from "../components/Table/Table";
import "../styles/CustomersPage.scss";
import Loader from "../components/Loader/Loader";


export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getCustomers()
        .then(setCustomers)
        .finally(() => setLoading(false));
    }, []);

    // loading logo
    if (loading) return <Loader />;


    return (
        <main className="customers-page">
        <h1 className="page-title">Customers</h1>

        <Table
            columns={[
            { key: "id", label: "ID" },
            { key: "title", label: "Title" },
            { key: "lastname", label: "Lastname" },
            { key: "firstname", label: "Firstname" },
            { key: "city", label: "City" },
            { key: "email", label: "Email" },
            {
                key: "id",
                label: "Orders",
                render: (_, row) => (
                <button
                    className="btn-orders"
                    onClick={() => navigate(`/customers/${row.id}/orders`)}
                >
                    View orders
                </button>
                ),
            },
            ]}
            data={customers}
        />
        </main>
    );
}
