import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers, Customer } from "../api/customers";

export default function CustomersPage() {
  // Store the list of customers retrieved from the backend
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Loading state to display a message while data is being fetched
  const [loading, setLoading] = useState(true);

  // React Router navigation hook
  const navigate = useNavigate();

  // Fetch customers when the component is mounted
  useEffect(() => {
    getCustomers()
      .then(setCustomers)
      .finally(() => setLoading(false));
  }, []);

  // Display a loading message while fetching data
  if (loading) {
    return <p>Loading customers...</p>;
  }

  return (
    <div>
      <h1>Customers</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Orders</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.customerId}</td>
              <td>{c.firstname} {c.lastname}</td>
              <td>{c.email}</td>

              <td>
                {/* Navigate to the orders page for this specific customer */}
                <button onClick={() => navigate(`/orders/${c.id}`)}>
                  Show orders
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
