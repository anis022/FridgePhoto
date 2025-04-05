"use client"; // Tells Next.js this is a client component, so hooks (like useState) are allowed

// Importing required modules and components
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react"; // Import React and useState hook
import Return from "@/components/ui/return";

// Define the login component function
export default function connexion() {
  // Initialize local state for the form fields: username and password.
  const [form, setForm] = useState({ username: "", password: "" });
  // A loading state to disable the button and display a loading message while the request is processing.
  const [loading, setLoading] = useState(false);

  // Define a handleSubmit function that will intercept the form submission.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the default HTML form submission and page refresh.
    setLoading(true);   // Set the loading state to true.
    try {
      // Send a POST request to the login endpoint with the form data.
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST", // HTTP method
        headers: { "Content-Type": "application/json" }, // Specify JSON format for request body
        body: JSON.stringify(form), // Convert the form data to JSON string
      });
      // Parse the JSON response.
      const data = await res.json();
      // If the response is not OK, alert the error message.
      if (!res.ok) {
        alert(data.error || "Login failed");
      } else {
        // Otherwise, alert the user that login was successful.
        alert("Login successful");
        // (Optional) Add redirection or further actions after successful login here.
      }
    } catch (err) {
      // Alert if there was a server error during the fetch.
      alert("Server error: " + err);
    } finally {
      // Reset the loading state.
      setLoading(false);
    }
  };

  // Return the JSX for rendering the login form.
  return (
    <>
      <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
        {/* Attach the handleSubmit function to the onSubmit event of the form */}
        <form
          onSubmit={handleSubmit}
          className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
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
              {/* Username input field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="block text-sm">
                  Username
                </Label>
                <Input
                  type="text"
                  required
                  name="username"
                  id="username"
                  value={form.username} // Bind the value to form.username
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  } // Update state on change
                />
              </div>
              {/* Password input field */}
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
                  value={form.password} // Bind the value to form.password
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  } // Update state on change
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
      </section>
    </>
  );
}
