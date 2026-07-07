"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:5278/api/Products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        const cats = ["All", ...new Set<string>(data.map((p: any) => p.category))];
        setCategories(cats);
        const urlParams = new URLSearchParams(window.location.search);
        const urlSearch = urlParams.get("search");
        if (urlSearch) setSearch(urlSearch);
      });
  }, []);

  useEffect(() => {
    let result = [...products];
    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category !== "All") result = result.filter((p) => p.category === category);
    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    setFiltered(result);
  }, [search, category, sort, products]);

  function addToCart(product: any) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) { existing.quantity += 1; } 
    else { cart.push({ ...product, quantity: 1 }); }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-600 rounded-full filter blur-3xl opacity-10"></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-10"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "50px 50px" }}>
        </div>

        <div className="relative z-10 text-center px-8 max-w-5xl mx-auto">
          <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium mb-6">
            🔥 New Collection Just Dropped
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-6 tracking-tight">
            DRESS TO
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              IMPRESS
            </span>
          </h1>
          <p className="text-gray-300 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Premium fashion for those who dare to stand out. Shoes, jackets, tops and more — curated for the bold.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#products" className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition">
              Shop Now →
            </a>
            <a href="#products" className="border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition backdrop-blur-sm">
              View Collection
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 justify-center mt-16 flex-wrap">
            {[
              { number: "500+", label: "Products" },
              { number: "10K+", label: "Happy Customers" },
              { number: "4.9★", label: "Rating" },
              { number: "Free", label: "Returns" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-white text-2xl font-black">{stat.number}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-blue-600 py-4">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center flex-wrap gap-4 text-white text-sm font-medium">
            {[
              { icon: "🚚", text: "Free Delivery on orders above Rs. 5,000" },
              { icon: "↩️", text: "7-Day Easy Returns" },
              { icon: "🔒", text: "Secure Payments" },
              { icon: "💬", text: "24/7 Customer Support" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-2">
                <span>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="px-8 py-16 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">Our Collection</p>
            <h2 className="text-4xl font-black text-gray-900">Featured Products</h2>
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-200 rounded-full px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="default">Sort: Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${category === cat ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 text-sm">
            Showing <span className="font-semibold text-gray-900">{filtered.length}</span> products
            {search && <span> for "<span className="font-semibold text-blue-600">{search}</span>"</span>}
          </p>
          {search && (
            <button onClick={() => { setSearch(""); window.history.replaceState({}, "", "/"); }}
              className="text-sm text-red-500 hover:underline">
              Clear search ✕
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-gray-400 text-lg mb-2">No products found</p>
            <button onClick={() => { setSearch(""); setCategory("All"); window.history.replaceState({}, "", "/"); }}
              className="mt-4 text-blue-600 hover:underline font-medium">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <a href={`/products/${product.id}`}>
                  <div className="relative overflow-hidden bg-gray-50 h-56">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-black text-white text-xs px-2 py-1 rounded-full font-medium">
                        {product.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-base group-hover:text-blue-600 transition">{product.name}</h3>
                    <p className="text-gray-400 text-sm mt-1 line-clamp-1">{product.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xl font-black text-gray-900">Rs. {product.price}</span>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{product.stock} left</span>
                    </div>
                  </div>
                </a>
                <div className="px-4 pb-4">
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-black text-white py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us */}
<section className="px-8 mb-16 max-w-7xl mx-auto">
  <div className="text-center mb-12">
    <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">Why NexMart</p>
    <h2 className="text-4xl font-black text-gray-900">Built Different.</h2>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[
      {
        icon: "🎯",
        title: "Curated Collections",
        desc: "Every product is hand-picked by our team for quality, style, and value. No compromises.",
        bg: "from-blue-50 to-blue-100",
        border: "border-blue-200"
      },
      {
        icon: "⚡",
        title: "Lightning Fast Delivery",
        desc: "Order today, receive tomorrow. We partner with Pakistan's fastest logistics networks.",
        bg: "from-purple-50 to-purple-100",
        border: "border-purple-200"
      },
      {
        icon: "🛡️",
        title: "Buyer Protection",
        desc: "Not happy? We'll make it right. Full refunds, hassle-free returns, zero questions asked.",
        bg: "from-pink-50 to-pink-100",
        border: "border-pink-200"
      },
    ].map((item) => (
      <div key={item.title} className={`bg-gradient-to-br ${item.bg} border ${item.border} rounded-3xl p-8`}>
        <div className="text-5xl mb-4">{item.icon}</div>
        <h3 className="text-xl font-black text-gray-900 mb-2">{item.title}</h3>
        <p className="text-gray-500 leading-relaxed">{item.desc}</p>
      </div>
    ))}
  </div>
</section>

{/* Bold CTA Banner */}
<section className="mx-8 mb-16">
  <div className="rounded-3xl bg-black text-white p-12 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
      <div>
        <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-2">Join the Movement</p>
        <h2 className="text-4xl font-black leading-tight">Style is not a luxury.<br/>It's a lifestyle.</h2>
        <p className="text-gray-400 mt-3 max-w-md">Thousands of Pakistanis are already shopping smarter. Premium fashion, unbeatable prices, delivered to your door.</p>
      </div>
      <div className="flex flex-col gap-3 min-w-fit">
        <a href="/register" className="bg-white text-black px-8 py-4 rounded-full font-black text-lg hover:bg-gray-100 transition text-center">
          Start Shopping →
        </a>
        <a href="/contact" className="border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition text-center">
          Talk to Us
        </a>
      </div>
    </div>
  </div>
</section>
    </main>
  );
}