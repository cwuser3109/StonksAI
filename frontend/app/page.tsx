"use client";

import { useState } from "react";

export default function Home() {
  const [inputs, setInputs] = useState({
    open: "",
    high: "",
    low: "",
    volume: "",
  });

  const [result, setResult] = useState<number[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = async () => {
    setLoading(true);

    const features = [
      Number(inputs.open),
      Number(inputs.high),
      Number(inputs.low),
      Number(inputs.volume),
    ];

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ features }),
      });

      const data = await res.json();
      setResult(data.prediction);
    } catch (err) {
      console.error(err);
      alert("Error connecting to API");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">
        <h1 className="text-2xl font-bold mb-6 text-center">
          📈 STONKS Predictor
        </h1>

        {/* Inputs */}
        {["open", "high", "low", "volume"].map((field) => (
          <input
            key={field}
            name={field}
            type="number"
            placeholder={field.toUpperCase()}
            value={(inputs as any)[field]}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
        ))}

        {/* Button */}
        <button
          onClick={handlePredict}
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          {loading ? "Predicting..." : "Predict"}
        </button>

        {/* Result */}
        {result && (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold">
              Prediction: {result[0]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}