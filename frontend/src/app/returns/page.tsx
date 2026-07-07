export default function ReturnsPage() {
  return (
    <main className="max-w-3xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Return Policy</h1>
      <p className="text-gray-500 mb-10">We want you to be completely satisfied with your purchase.</p>

      <div className="space-y-6">
        {[
          {
            title: "Return Window",
            content: "You have 7 days from the date of delivery to return an item. After 7 days, unfortunately we cannot offer a refund or exchange."
          },
          {
            title: "Eligibility",
            content: "To be eligible for a return, your item must be unused, in the same condition that you received it, and in its original packaging with all tags attached."
          },
          {
            title: "Non-Returnable Items",
            content: "The following items cannot be returned: items on sale, gift cards, downloadable products, and items marked as final sale."
          },
          {
            title: "How to Return",
            content: "To initiate a return, contact us at support@nexmart.com with your order number and reason for return. We will provide you with return instructions within 24 hours."
          },
          {
            title: "Refunds",
            content: "Once your return is received and inspected, we will notify you of the approval or rejection. If approved, your refund will be processed within 3-5 business days."
          },
          {
            title: "Exchanges",
            content: "If you need to exchange an item for a different size or color, contact us at support@nexmart.com. Exchanges are subject to product availability."
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