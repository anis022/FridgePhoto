"use client";

import { useEffect, useState } from "react";

interface FridgeItem {
  name: string;
  category: string;
  freshness: string;
}

export default function Results() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [items, setItems] = useState<FridgeItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("fridgeResult");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPhoto(parsed.photo);
        setItems(parsed.items || []);
      } catch (err) {
        console.error("Error parsing fridgeResult:", err);
      }
    }
  }, []);

  return (
    <main className="flex flex-col items-center justify-center py-20 px-4">
      <h1 className="text-4xl font-bold mb-6">Analysis Results</h1>

      {photo ? (
        <>
          <img
            src={photo}
            alt="Fridge analysis"
            className="max-w-md rounded-xl border shadow-lg mb-6"
          />
          <h2 className="text-2xl font-semibold mb-4">Detected Items</h2>
          {items.length > 0 ? (
            <ul className="space-y-4 text-left w-full max-w-md">
              {items.map((item, i) => (
                <li key={i} className="border rounded-lg p-4 shadow-sm">
                  <p>
                    <strong>Name:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p>
                    <strong>Freshness:</strong> {item.freshness}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items detected.</p>
          )}
        </>
      ) : (
        <p className="text-red-500">
          No result data found. Go back to Analyse.
        </p>
      )}
    </main>
  );
}
