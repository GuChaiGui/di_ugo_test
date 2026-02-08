export interface Customer {
    id: number;
    customerId: number;
    firstname: string;
    lastname: string;
    email: string;
}

const API_URL = "http://localhost:8000";

// Fetch all customers from the backend
export async function getCustomers(): Promise<Customer[]> {
    const response = await fetch(`${API_URL}/customers`);
    if (!response.ok) {
        throw new Error("Failed to fetch customers");
    }
    return response.json();
}
