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
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>([]);
  const [showRemoveMenu, setShowRemoveMenu] = useState(false);

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

  const handleAddToFridge = async () => {
    try {
      const res = await fetch("/api/fridge/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (res.ok) {
        alert("Items added to your Perfect Fridge!");
      } else {
        alert("Failed to add items.");
      }
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  const fetchFridgeItems = async () => {
    try {
      const res = await fetch("/api/fridge/get");
      if (res.ok) {
        const data = await res.json();
        setFridgeItems(data.items || []);
      }
    } catch (err) {
      console.error("Failed to fetch fridge items:", err);
    }
  };

  const handleRemoveItem = async (name: string) => {
    try {
      const res = await fetch("/api/fridge/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        setFridgeItems((prev) => prev.filter((item) => item.name !== name));
      } else {
        alert("Failed to remove item.");
      }
    } catch (err) {
      console.error("Remove failed:", err);
    }
  };

  const toggleRemoveMenu = () => {
    setShowRemoveMenu((prev) => !prev);
    if (!showRemoveMenu) fetchFridgeItems();
  };

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
            <ul className="space-y-4 text-left w-full max-w-md mb-6">
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

          {/* ➕ Add button */}
          <button
            onClick={handleAddToFridge}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mt-2"
          >
            Add items to your Perfect Fridge
          </button>

          {/* ➖ Remove button */}
          <button
            onClick={toggleRemoveMenu}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mt-4"
          >
            {showRemoveMenu ? "Hide Remove Menu" : "Remove items from Fridge"}
          </button>

          {/* Menu: remove existing items */}
          {showRemoveMenu && (
            <div className="mt-6 w-full max-w-md text-left">
              <h3 className="text-xl font-bold mb-2">Items in Your Fridge:</h3>
              {fridgeItems.length > 0 ? (
                <ul className="space-y-2">
                  {fridgeItems.map((item, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-center border rounded p-3 bg-white shadow-sm"
                    >
                      <span>
                        {item.name} ({item.category} – {item.freshness})
                      </span>
                      <button
                        onClick={() => handleRemoveItem(item.name)}
                        className="bg-red-400 hover:bg-red-500 text-white text-sm px-3 py-1 rounded"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No items currently in your fridge.</p>
              )}
            </div>
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
