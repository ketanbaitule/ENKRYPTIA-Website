"use client";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<Session | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        (user === null && session !== null) ||
        (user !== null && session === null)
      ) {
        setUser(session);
      }
    });

    return () => data.subscription.unsubscribe();
  });
  return (
    <div className="flex items-center justify-center text-primary border-b-2">
      <nav className="container flex flex-row justify-between p-4">
        <div className=" font-semibold text-2xl">Sales Path</div>
        <div className="flex gap-x-4 text-xl">
          {user ? (
            <>
              <div>Hi {user.user.email}</div>
              <Link href={"/dashboard"}>Dashboard</Link>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.refresh();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href={"/login"} className="btn btn-primary">
                Login
              </Link>
              <Link href={"/signup"} className="btn btn-secondary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
