"use client";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

export default function Navbar() {
  const [user, setUser] = useState<Session | null>(null);
  const supabase = createClient();

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
    <div className="flex items-center justify-center bg-primary text-black">
      <nav className="container flex flex-row justify-between p-4">
        <div className="text-2xl">Sales Path</div>
        <div className="flex gap-x-4 text-xl">
          {user ? (
            <>
              <div>Hi {user.user.email}</div>
              <Link href={"/dashboard"}>Dashboard</Link>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
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
