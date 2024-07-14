import Link from "next/link";

export default function Header() {
  return (
    <header className="flex bg-slate-800 text-white px-7 py-5">
      <Link href="/">
        <span className="text-xl">Home</span>
      </Link>
    </header>
  );
}
