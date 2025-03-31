"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedIn, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs";
import { Activity, AlignRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";

const MobileNavbar = ({ admin }: { admin: boolean }) => {
  const [open, setOpen] = useState(false);
  const ADMIN = admin;

  return (
    <div className="md:hidden flex items-center gap-4 z-50">
      <div className="flex">
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

      {ADMIN && (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <AlignRight className="cursor-pointer" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <div className="flex items-center justify-center ">
                  <h2 className="text-3xl font-semibold bg-gradient-to-r from-blue-950 to-indigo-500 bg-clip-text text-transparent">
                    Alarticle
                  </h2>
                  <Activity />
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 px-4">
              <Button
                asChild
                className="border bg-transparent text-white hover:bg-transparent"
              >
                <Link href="/dashboard" prefetch={true}>Dashboard</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default MobileNavbar;
