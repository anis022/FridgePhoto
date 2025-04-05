import Link from "next/link";
export default function Return() {
  return (
    <div className="flex bg-zinc-50 px-4 py-1 dark:bg-transparent">
      <Link
        href={"/"}
        className="text-muted-foreground hover:text-accent-foreground block duration-150"
      >
        <span>Return to Home page</span>
      </Link>
    </div>
  );
}
