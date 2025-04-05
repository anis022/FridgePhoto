"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import Return from "@/components/ui/return";

// Login component using integrated message box
export default function connexion() {
  // State for username and password inputs
  const [form, setForm] = useState({ username: "", password: "" });
  // Loading state for disabling button during fetch
  const [loading, setLoading] = useState(false);
  // Message state: holds an object with text and type ("error" or "success")
  const [loginMessage, setLoginMessage] = useState({ text: "", type: "" });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form refresh
    setLoading(true);
    setLoginMessage({ text: "", type: "" }); // Clear any existing messages
    try {
      // Send a POST request to your login endpoint
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        // If login fails, set the error message (styled in red)
        setLoginMessage({ text: data.error || "Login failed", type: "error" });
      } else {
        // On success, set the success message (styled in green)
        setLoginMessage({ text: "Login successful!", type: "success" });
        // Optionally, store the token received from the backend:
        // localStorage.setItem("token", data.token);
      }
    } catch (err) {
      // Network errors (e.g. "Failed to fetch") are caught here
      setLoginMessage({ text: "Server error: " + err, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Return />
      <section className="relative flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
        {/* Login form */}
        <form
          onSubmit={handleSubmit}
          className="relative z-10 bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
        >
          <div className="p-8 pb-6">
            <div>
              <Link href="/" aria-label="go home">
                <Logo className="size-15" />
              </Link>
              <h1 className="text-title mb-1 mt-4 text-xl font-semibold">
                Login to FridgePhoto
              </h1>
              <p className="text-sm">Welcome! Connect to start!</p>
            </div>
            <hr className="my-4 border-dashed" />
            <div className="space-y-5">
              {/* Username field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="block text-sm">
                  Username
                </Label>
                <Input
                  type="text"
                  required
                  name="username"
                  id="username"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                />
              </div>
              {/* Password field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-title text-sm">
                  Password
                </Label>
                <Input
                  type="password"
                  required
                  name="password"
                  id="password"
                  className="input sz-md variant-mixed"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
              {/* Submit button */}
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </div>
          <div className="bg-muted rounded-(--radius) border p-3">
            <p className="text-accent-foreground text-center text-sm">
              Don't have an account?{" "}
              <Button asChild variant="link" className="px-2">
                <Link href="/signup">Create one here</Link>
              </Button>
            </p>
          </div>
        </form>

        {/* Integrated message box that appears at the top center */}
        {loginMessage.text && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 max-w-md bg-background/80 backdrop-blur-lg rounded-2xl border border-white/20 p-4 shadow-lg">
            <p
              className={`text-center text-lg font-semibold ${
                loginMessage.type === "error"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {loginMessage.text}
            </p>
          </div>
        )}
      </section>
    </>
  );
}
