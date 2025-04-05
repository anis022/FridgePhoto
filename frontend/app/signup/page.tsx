//signup

import { Logo } from "@/components/logo";
import Return from "@/components/ui/return";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function inscription() {
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
                <Logo className="size-13" />
              </Link>
              <h1 className="text-title mb-1 mt-4 text-xl font-semibold">
                Create an account with FridgePhoto
              </h1>
              <p className="text-sm">
                Welcome! Create an account to start!
              </p>
            </div>

            <hr className="my-4 border-dashed" />

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="first_name" className="block text-sm">
                    First Name
                  </Label>
                  <Input type="text" required name="first_name" id="firstname" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name" className="block text-sm">
                    Last Name
                  </Label>
                  <Input type="text" required name="last_name" id="last_name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="block text-sm">
                  Email Address
                </Label>
                <Input type="email" required name="email" id="email" />
              </div>

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

              <div className="space-y-2">
                <Label
                  htmlFor="tel"
                  className="text-title text-sm"
                >
                  Phone Number
                </Label>
                <Input
                  type="tel"
                  required
                  name="tel"
                  id="tel"
                  className="input sz-md variant-mixed"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date_of_birth" className="text-title text-sm">
                  Date of Birth
                </Label>
                <Input
                  type="date"
                  required
                  name="date_of_birth"
                  id="date_of_birth"
                  className="input sz-md variant-mixed"
                />
              </div>

              <Button className="w-full">Create an account</Button>
            </div>
          </div>

          <div className="bg-muted rounded-(--radius) border p-3">
            <p className="text-accent-foreground text-center text-sm">
              You already have an existing account ?
              <Button asChild variant="link" className="px-2">
                <Link href="/login">Login here</Link>
              </Button>
            </p>
          </div>
        </form>
      </section>
    </>
  );
}
