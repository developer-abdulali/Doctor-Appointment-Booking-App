import React from "react";

const WhyChooseUs = () => {
  const reasons = [
    {
      title: "EFFICIENCY:",
      description:
        "Streamlined appointment scheduling that fits into your busy lifestyle.",
      bgColor: "bg-blue-300",
      textColor: "text-gray-700",
    },
    {
      title: "CONVENIENCE:",
      description:
        "Access to a network of trusted healthcare professionals in your area.",
      bgColor: "bg-white",
      textColor: "text-gray-800",
    },
    {
      title: "PERSONALIZATION:",
      description:
        "Tailored recommendations and reminders to help you stay on top of your health.",
      bgColor: "bg-white",
      textColor: "text-gray-800",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">WHY CHOOSE US</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow ${reason.bgColor} ${reason.textColor}`}
          >
            <h3 className="font-semibold mb-2">{reason.title}</h3>
            <p>{reason.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
