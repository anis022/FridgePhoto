//login

import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import Return from "@/components/ui/return";

export default function connexion() {
  return (
    <>
      <Return />
      <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
        <form
          method="POST"
          action=""
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
              <p className="text-sm">
                Welcome! Connect to start!
              </p>
            </div>

            <hr className="my-4 border-dashed" />

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="block text-sm">
                  Username
                </Label>
                <Input
                  type="text"
                  required
                  name="username"
                  id="username"
                />
              </div>

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
                />
              </div>

              <Button className="w-full">Login</Button>
            </div>
          </div>

          <div className="bg-muted rounded-(--radius) border p-3">
            <p className="text-accent-foreground text-center text-sm">
              Don't have an account ?
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
