export default function FAQPage() {
  const faqs = [
    { q: "How long does delivery take?", a: "Standard delivery takes 3-5 business days within Pakistan. Express delivery is available for 1-2 business days." },
    { q: "What payment methods do you accept?", a: "We currently accept Cash on Delivery (COD) for all orders across Pakistan." },
    { q: "Can I track my order?", a: "Yes, once your order is shipped you can track it from the My Orders page in your account." },
    { q: "What is your return policy?", a: "We offer a 7-day return policy on all products. Items must be unused and in original packaging." },
    { q: "How do I cancel my order?", a: "You can cancel your order within 24 hours of placing it by contacting our support team." },
    { q: "Do you deliver across all of Pakistan?", a: "Yes, we deliver to all major cities and towns across Pakistan." },
    { q: "Is my personal information secure?", a: "Yes, we use industry-standard encryption to protect your personal information." },
    { q: "How do I contact customer support?", a: "You can reach us at support@nexmart.com or call +92 300 1234567 during business hours." },
  ];

  return (
    <main className="max-w-3xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
      <p className="text-gray-500 mb-10">Find answers to the most common questions about NexMart.</p>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Q: {faq.q}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}