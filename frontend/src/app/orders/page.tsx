"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetchOrders(token);
  }, []);

  async function fetchOrders(token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Orders/myorders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  }

  if (loading) return <div className="p-8 text-center">Loading orders...</div>;

  return (
    <main className="max-w-4xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg mb-4">No orders yet</p>
          <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700">
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="font-bold text-lg">Order #{order.id}</h2>
                  <p className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "delivered" ? "bg-green-100 text-green-700" :
                  order.status === "shipped" ? "bg-blue-100 text-blue-700" :
                  order.status === "processing" ? "bg-purple-100 text-purple-700" :
                  "bg-yellow-100 text-yellow-700"}`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {order.items?.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.product?.name || "Product"} x{item.quantity}</span>
                    <span className="font-medium">Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 flex justify-between">
                <span className="text-gray-500 text-sm">Delivery to: {order.shippingAddress}</span>
                <span className="font-bold">Rs. {order.totalAmount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}