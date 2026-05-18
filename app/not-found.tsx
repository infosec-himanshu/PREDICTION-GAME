import Link from "next/link";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-6xl font-bold mb-4 text-gradient">404</h1>
      <p className="text-xl text-gray-400 mb-8">Page not found</p>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}

