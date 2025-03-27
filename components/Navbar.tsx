import { Activity } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="flex h-16 items-center justify-between md:px-16 px-4 py-4 gap-4">
        <div className="flex items-center">
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-blue-950 to-indigo-500 bg-clip-text text-transparent">
            Alarticle
          </h2>
          <Activity />
        </div>

        {/* DESKTOP NAVBAR */}
        <div className="items-center gap-4 hidden md:flex">
          <Button
            asChild
            className="border bg-transparent text-white hover:bg-transparent"
          >
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <SignedOut>
            <Button
              asChild
              className="cursor-pointer border bg-transparent text-white hover:bg-transparent"
            >
              <SignUpButton mode="modal">Login</SignUpButton>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        <MobileNavbar />
      </div>
    </nav>
  );
};

export default Navbar;
