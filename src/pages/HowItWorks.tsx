import React from "react";
import { LucideShirt, LucideRefreshCcw, LucideRecycle } from "lucide-react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: "1. List Your Clothes",
      icon: <LucideShirt className="text-green-600 text-4xl" />,
      description:
        "Upload pictures, add descriptions, and give your pre-loved clothing a second chance.",
    },
    {
      title: "2. Swap or Request Items",
      icon: <LucideRefreshCcw className="text-green-600 text-4xl" />,
      description:
        "Browse other members’ listings and request exchanges that work for both parties.",
    },
    {
      title: "3. Ship & Rewear",
      icon: <LucideRecycle className="text-green-600 text-4xl" />,
      description:
        "Once approved, ship your items and enjoy your new sustainable wardrobe.",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        How It Works
      </h1>
      <div className="grid gap-10 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-center mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 text-center">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
