"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0, totalRevenue: 0 });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") { router.push("/login"); return; }
    fetchProducts();
    fetchOrders();
    fetchMessages();
  }, []);

  async function fetchProducts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Products`);
    const data = await res.json();
    setProducts(data);
    setStats((prev) => ({ ...prev, totalProducts: data.length }));
  }

  async function fetchOrders() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setOrders(data);
    const revenue = data.reduce((sum: number, o: any) => sum + o.totalAmount, 0);
    setStats((prev) => ({ ...prev, totalOrders: data.length, totalRevenue: revenue }));
  }

  async function fetchMessages() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Contact`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMessages(data);
  }

  async function handleAddProduct() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Products`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, description, price: parseFloat(price), stock: parseInt(stock), category, imageUrl }),
    });
    if (res.ok) {
      setMessage("Product added!");
      fetchProducts();
      setName(""); setDescription(""); setPrice(""); setStock(""); setCategory(""); setImageUrl("");
    }
  }

  async function handleDelete(id: number) {
    const token = localStorage.getItem("token");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
  }

  async function updateOrderStatus(id: number, status: string) {
    const token = localStorage.getItem("token");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Orders/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(status),
    });
    fetchOrders();
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Products", value: stats.totalProducts },
          { label: "Total Orders", value: stats.totalOrders },
          { label: "Total Revenue", value: `Rs. ${stats.totalRevenue}` },
          { label: "Status", value: "Live" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button onClick={() => setActiveTab("products")}
          className={`px-5 py-2 rounded-full font-medium text-sm ${activeTab === "products" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
          Products
        </button>
        <button onClick={() => setActiveTab("orders")}
          className={`px-5 py-2 rounded-full font-medium text-sm ${activeTab === "orders" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
          Orders
        </button>
        <button onClick={() => setActiveTab("add")}
          className={`px-5 py-2 rounded-full font-medium text-sm ${activeTab === "add" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
          Add Product
        </button>
        <button onClick={() => setActiveTab("messages")}
          className={`px-5 py-2 rounded-full font-medium text-sm ${activeTab === "messages" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
          Messages
        </button>
      </div>

      {/* Products Tab */}
      {activeTab === "products" && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">All Products</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-sm text-gray-500">
                <th className="pb-3">Name</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Stock</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p: any) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{p.name}</td>
                  <td className="py-3">{p.category}</td>
                  <td className="py-3">Rs. {p.price}</td>
                  <td className="py-3">{p.stock}</td>
                  <td className="py-3">
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline text-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">All Orders</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-sm text-gray-500">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Address</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Update</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o: any) => (
                <tr key={o.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">#{o.id}</td>
                  <td className="py-3">Rs. {o.totalAmount}</td>
                  <td className="py-3">{o.shippingAddress}</td>
                  <td className="py-3">{o.phone}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      o.status === "delivered" ? "bg-green-100 text-green-700" :
                      o.status === "shipped" ? "bg-blue-100 text-blue-700" :
                      "bg-yellow-100 text-yellow-700"}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <select value={o.status} onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                      className="border rounded-lg px-2 py-1 text-sm">
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Product Tab */}
      {activeTab === "add" && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          {message && <p className="text-green-600 mb-3">{message}</p>}
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-3 rounded-lg" />
            <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="border p-3 rounded-lg" />
            <input placeholder="Price" value={price} type="number" onChange={(e) => setPrice(e.target.value)} className="border p-3 rounded-lg" />
            <input placeholder="Stock" value={stock} type="number" onChange={(e) => setStock(e.target.value)} className="border p-3 rounded-lg" />
            <input placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="border p-3 rounded-lg col-span-2" />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-3 rounded-lg col-span-2" />
          </div>
          <button onClick={handleAddProduct} className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700">
            Add Product
          </button>
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === "messages" && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Messages</h2>
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No messages yet</p>
          ) : (
            <div className="space-y-4">
              {messages.map((msg: any) => (
                <div key={msg.id} className={`border rounded-xl p-4 ${msg.isRead ? "bg-gray-50" : "bg-blue-50 border-blue-200"}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-semibold">{msg.name}</span>
                      <span className="text-gray-400 text-sm ml-2">{msg.email}</span>
                    </div>
                    <span className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{msg.message}</p>
                  {!msg.isRead && (
                    <span className="inline-block mt-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-full">New</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}