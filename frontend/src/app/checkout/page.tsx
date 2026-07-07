"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    if (stored.length === 0) router.push("/cart");
    setCart(stored);
    const userName = localStorage.getItem("name") || "";
    setName(userName);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function handlePlaceOrder() {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        totalAmount: total,
        shippingAddress: address,
        phone: phone,
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      }),
    });

    if (res.ok) {
      localStorage.removeItem("cart");
      setPlaced(true);
    }
  }

  if (placed) {
    return (
      <main className="max-w-lg mx-auto px-8 py-20 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-8">Thank you for shopping with NexMart</p>
        <a href="/" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700">
          Continue Shopping
        </a>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-lg mb-3"
          />
          <input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-3 rounded-lg mb-3"
          />
          <textarea
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-3 rounded-lg mb-3 h-24"
          />
          <div className="bg-gray-50 border rounded-lg p-4 mt-4">
            <p className="text-sm text-gray-500 font-medium">Payment Method</p>
            <p className="font-semibold mt-1">Cash on Delivery</p>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.name} x{item.quantity}</span>
                <span className="font-medium">Rs. {item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>Rs. {total}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </main>
  );
}