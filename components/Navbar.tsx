"use client";

import { Activity } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import MobileNavbar from "./MobileNavbar";
import { useEffect, useState } from "react";
import { getUserRoleAdmin, syncUser } from "@/actions/user.action";

const Navbar = () => {
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await syncUser();
        const adminRole = await getUserRoleAdmin();
        setIsAdmin(adminRole !== null);
      }
    };

    fetchData();
  }, [user]);

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="flex h-16 items-center justify-between md:px-16 px-4 py-4 gap-4">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-3xl font-semibold bg-gradient-to-r from-blue-950 to-indigo-500 bg-clip-text text-transparent"
            prefetch={true}
          >
            Alarticle
          </Link>
          <Activity />
        </div>

        {/* DESKTOP NAVBAR */}
        <div className="items-center gap-4 hidden md:flex">
          {isAdmin && (
            <>
              <Button
                asChild
                className="border bg-transparent text-white hover:bg-transparent"
              >
                <Link href="/dashboard" prefetch={true}>
                  Dashboard
                </Link>
              </Button>
              <Button
                asChild
                className="border bg-transparent text-white hover:bg-transparent"
              >
                <Link href="/profile" prefetch={true}>
                  Profile
                </Link>
              </Button>
            </>
          )}
          <SignedOut>
            <Button
              asChild
              className="cursor-pointer border bg-transparent text-white hover:bg-transparent"
            >
              <SignInButton mode="modal">Login</SignInButton>
            </Button>
          </SignedOut>
          <UserButton />
        </div>
        <MobileNavbar admin={isAdmin} />
      </div>
    </nav>
  );
};

export default Navbar;
