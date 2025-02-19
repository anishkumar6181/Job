"use client";
import { useGlobalContext } from "@/context/globalContext";
import { LogIn, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Profile from "./Profile";
import { ThemeToggle } from "./themeToggle";


function Header() {
  const { isAuthenticated } = useGlobalContext();
  const pathname = usePathname();
  return (
    <header className="px-10 py-6 bg-background border-b border-border text-muted-foreground flex justify-between items-center">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={45} height={45} />
        <h1 className="font-extrabold text-2xl text-primary">JobFindr</h1>
      </Link>

      <ul className="flex items-center gap-12">
        <li>
          <Link
            href={"/findwork"}
            className={`py-2 px-6 rounded-md transition-colors ${
              pathname === "/findwork"
                ? "text-primary border-primary border bg-primary/10"
                : "hover:text-primary"
            }`}
          >
            Find Work
          </Link>
          {/* <Link
            href={"/myjobs"}
            className={`py-2 px-6 rounded-md transition-colors ${
              pathname === "/myjobs"
                ? "text-primary border-primary border bg-primary/10"
                : "hover:text-primary"
            }`}
          >
            My Jobs
          </Link>
          <Link
            href={"/post"}
            className={`py-2 px-6 rounded-md transition-colors ${
              pathname === "/post"
                ? "text-primary border-primary border bg-primary/10"
                : "hover:text-primary"
            }`}
          >
            Post a Job
          </Link> */}
          <Link
            href={"/about"}
            className={`py-2 px-6 rounded-md transition-colors ${
              pathname === "/post"
                ? "text-primary border-primary border bg-primary/10"
                : "hover:text-primary"
            }`}
          >
            About
          </Link>
          <Link
            href={"/contact"}
            className={`py-2 px-6 rounded-md transition-colors ${
              pathname === "/post"
                ? "text-primary border-primary border bg-primary/10"
                : "hover:text-primary"
            }`}
          >
            Contact Us
          </Link>
        </li>
      </ul>
      <ThemeToggle />

      {/* <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <Profile />
        ) : (
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <Link
              href={"http://localhost:8000/login"}
              className="py-2 px-6 rounded-md border flex items-center gap-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 ease-in-out"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <Link
              href={"http://localhost:8000/login"}
              className="py-2 px-6 rounded-md border flex items-center gap-4 border-primary text-primary hover:bg-primary/10 transition-all duration-200 ease-in-out"
            >
              <UserPlus className="w-4 h-4" />
              Register
            </Link>
          </div>
        )}
      </div> */}
        <Link
              href={"/admin/login"}
              className="py-2 px-6 rounded-md border flex items-center gap-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 ease-in-out"
            >
              <LogIn className="w-4 h-4" />
              Admin
            </Link>
    </header>
  );
}

export default Header;
