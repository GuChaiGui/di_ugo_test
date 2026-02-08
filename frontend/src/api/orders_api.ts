export interface Order {
  purchase_identifier: string;
  product_id: number;
  quantity: number;
  price: number;
  currency: string;
  date: string;
}

const API_URL = "http://localhost:8000";

export async function getOrdersByCustomer(customerId: number): Promise<Order[]> {
  const response = await fetch(`${API_URL}/customers/${customerId}/orders`);

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
}