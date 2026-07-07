"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const name = localStorage.getItem("name");
    const userRole = localStorage.getItem("role");
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const count = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
    if (name) setUserName(name);
    if (userRole) setRole(userRole);
    setCartCount(count);

    const handleStorage = () => {
      const n = localStorage.getItem("name");
      const r = localStorage.getItem("role");
      const c = JSON.parse(localStorage.getItem("cart") || "[]");
      const cnt = c.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setUserName(n || "");
      setRole(r || "");
      setCartCount(cnt);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("cart");
    setUserName("");
    setRole("");
    router.push("/login");
  }

  return (
    <nav className="bg-black/95 backdrop-blur-md border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <a href="/" className="text-2xl font-black tracking-tight text-white">
        Nex<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Mart</span>
      </a>

      {/* Search Bar */}
      <div className="flex-1 mx-8">
        <input
          type="text"
          placeholder="Search products..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = (e.target as HTMLInputElement).value;
              window.location.href = `/?search=${value}`;
            }
          }}
          className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-full px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Cart */}
        <a href="/cart" className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300 hover:text-white transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {mounted && cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </a>

        {/* Auth */}
        {!mounted ? (
          <div className="w-24 h-8 bg-white/10 rounded-full animate-pulse"></div>
        ) : userName ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">Hi, {userName.split(" ")[0]}</span>
            <a href="/orders" className="text-sm text-gray-300 hover:text-white transition">My Orders</a>
            {role === "admin" && (
              <a href="/admin" className="text-sm text-blue-400 hover:text-blue-300 transition font-medium">Dashboard</a>
            )}
            <button onClick={handleLogout} className="text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition border border-white/20">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <a href="/login" className="text-sm text-gray-300 hover:text-white transition">Login</a>
            <a href="/register" className="text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-full hover:opacity-90 transition font-semibold">
              Register
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}