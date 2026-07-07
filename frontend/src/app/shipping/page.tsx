export default function ShippingPage() {
  return (
    <main className="max-w-3xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Shipping Policy</h1>
      <p className="text-gray-500 mb-10">Everything you need to know about our shipping process.</p>

      <div className="space-y-6">
        {[
          {
            title: "Processing Time",
            content: "All orders are processed within 1-2 business days after payment confirmation. Orders placed on weekends or public holidays will be processed the next business day."
          },
          {
            title: "Delivery Timeframes",
            content: "Standard Delivery: 3-5 business days. Express Delivery: 1-2 business days. Remote areas may require additional 1-2 days."
          },
          {
            title: "Shipping Charges",
            content: "Standard Delivery: Rs. 150 flat rate. Express Delivery: Rs. 300 flat rate. Free shipping on orders above Rs. 5,000."
          },
          {
            title: "Coverage Areas",
            content: "We deliver to all major cities including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and surrounding areas."
          },
          {
            title: "Order Tracking",
            content: "Once your order is shipped, you can track it from the My Orders section in your account. You will also receive an SMS notification with tracking details."
          },
          {
            title: "Damaged or Lost Packages",
            content: "If your package arrives damaged or is lost in transit, please contact us within 48 hours. We will arrange a replacement or full refund."
          },
        ].map((section, i) => (
          <div key={i} className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">{section.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}