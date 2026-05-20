"use client";
import { useState } from "react";
import { Avatar, Button, Link } from "@heroui/react";
import DropdownCompo from "./DropdownCompo";
import { DarkLightToggle } from "./DarkLightToggle";
import { authClient } from "@/lib/auth-client";
import { ArrowDown } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="flex items-center gap-1.5">
            <Avatar>
              <Avatar.Image alt="petlogo" src={"/petLogo.avif"} />
            </Avatar>{" "}
            <h2 className="font-bold">PetAdopt</h2>
          </div>
        </div>
        <ul className="hidden items-center gap-4 md:flex">
          <li>
            <Link className={"no-underline"} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={"no-underline"} href="/all-pets">
              Pets
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <DarkLightToggle></DarkLightToggle>

          {user && <DropdownCompo user={user}></DropdownCompo>}

          {!user && (
            <div>
              <Link className={"no-underline"} href={"/login"}>
                <Button size="sm" className={"mr-1.5"}>
                  Login
                </Button>
              </Link>
              <Link className={"no-underline"} href={"/signup"}>
                <Button size="sm" className={"mr-1.5"}>
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            <li>
              <Link href="/" className="block py-2">
                Home
              </Link>
            </li>
            <li>
              <Link href="all-pets" className="block py-2">
                All Pets
              </Link>
            </li>
            <li>
              <Link href="my-listings" className="block py-2">
                My Listings
              </Link>
            </li>
            <li>
              <Link href="my-requests" className="block py-2">
                My Requests
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
