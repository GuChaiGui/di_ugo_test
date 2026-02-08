console.log(">>> customers_api.ts LOADED");
export interface Customer {
  id: number;
  title: string | null;
  lastname: string | null;
  firstname: string | null;
  postal_code: string | null;
  city: string | null;
  email: string | null;
}

const API_URL = "http://localhost:8000";

export async function getCustomers(): Promise<Customer[]> {
  const response = await fetch(`${API_URL}/customers`);
  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }
  return response.json();
}
