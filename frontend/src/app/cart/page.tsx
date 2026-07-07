"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  function updateQuantity(id: number, quantity: number) {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    ).filter((item) => item.quantity > 0);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  }

  function removeItem(id: number) {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="max-w-5xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg mb-4">Your cart is empty</p>
          <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700">
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white border rounded-xl p-4 flex gap-4 items-center shadow-sm">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-blue-600 font-bold mt-1">Rs. {item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 border rounded-lg flex items-center justify-center hover:bg-gray-100">-</button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 border rounded-lg flex items-center justify-center hover:bg-gray-100">+</button>
                </div>
                <button onClick={() => removeItem(item.id)}
                  className="text-red-400 hover:text-red-600 text-sm ml-4">Remove</button>
              </div>
            ))}
          </div>

          <div className="bg-white border rounded-xl p-6 shadow-sm h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-gray-600">
                  <span>{item.name} x{item.quantity}</span>
                  <span>Rs. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>
            <button
              onClick={() => router.push("/checkout")}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}