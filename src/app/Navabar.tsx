import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex items-center justify-center bg-primary text-black">
      <nav className="container flex flex-row justify-between p-4">
        <div className="text-2xl">Sales Path</div>
        <div className="flex gap-x-4 text-xl">
          <Link href={"/login"} className="btn btn-primary">
            Login
          </Link>
          <Link href={"/signup"} className="btn btn-secondary">
            Sign Up
          </Link>
        </div>
      </nav>
    </div>
  );
}
