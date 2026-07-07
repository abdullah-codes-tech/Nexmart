"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5278/api/Products/${params.id}`, { cache: "no-store" } as any)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [params.id]);

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage")); // add this line
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (!product) return <div className="p-8 text-center">Loading...</div>;

  return (
    <main className="max-w-6xl mx-auto px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="rounded-xl overflow-hidden shadow-md">
          <img src={product.imageUrl} alt={product.name} className="w-full h-96 object-cover" />
        </div>
        <div>
          <span className="text-sm text-blue-600 font-medium uppercase tracking-wide">{product.category}</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
          <p className="text-gray-500 mt-4 leading-relaxed">{product.description}</p>
          <div className="mt-6">
            <span className="text-4xl font-bold text-gray-900">Rs. {product.price}</span>
          </div>
          <p className="text-sm text-gray-400 mt-2">{product.stock} items in stock</p>
          <div className="flex gap-4 mt-8">
            <button
              onClick={addToCart}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              {added ? "Added! ✓" : "Add to Cart"}
            </button>
            <button className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition">
              Buy Now
            </button>
          </div>
          <a href="/" className="block text-center text-sm text-gray-400 mt-6 hover:text-gray-600">← Back to products</a>
        </div>
      </div>
    </main>
  );
}