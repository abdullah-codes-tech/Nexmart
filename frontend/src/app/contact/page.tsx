"use client";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!name || !email || !message) return;
    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <main className="max-w-3xl mx-auto px-8 py-12 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold mb-2">Message Sent!</h1>
        <p className="text-gray-500 mb-8">We'll get back to you within 24 hours.</p>
        <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700">Back to Home</a>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
      <p className="text-gray-500 mb-10">Have a question? We'd love to hear from you.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-white border rounded-xl p-5 shadow-sm flex gap-4 items-start">
            <span className="text-2xl">📧</span>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-sm text-gray-500">support@nexmart.com</p>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-5 shadow-sm flex gap-4 items-start">
            <span className="text-2xl">📞</span>
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-sm text-gray-500">+92 300 1234567</p>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-5 shadow-sm flex gap-4 items-start">
            <span className="text-2xl">📍</span>
            <div>
              <h3 className="font-semibold">Address</h3>
              <p className="text-sm text-gray-500">Islamabad, Pakistan</p>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-5 shadow-sm flex gap-4 items-start">
            <span className="text-2xl">🕐</span>
            <div>
              <h3 className="font-semibold">Business Hours</h3>
              <p className="text-sm text-gray-500">Mon - Sat: 9am - 6pm</p>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-lg mb-3 text-sm"
          />
          <input
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg mb-3 text-sm"
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4 text-sm h-32"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </main>
  );
}