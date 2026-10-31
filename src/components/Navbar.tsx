"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, X } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";


const leftLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/bookings" },
  { label: "Admin", href: "/admin" },
];

const rightLinks = [
  { label: "Login", href: "/logIn" },
  { label: "Sign Up", href: "/signUp" },
];

const mobileLinks = [
  ...leftLinks,
  { label: "Profile", href: "/profile" },
  ...rightLinks,
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const {data:session} = useSession();
  const user = session?.user;
  const pathname = usePathname();

  // Highlight the link matching the current route ("/" matches only home,
  // other links also match nested routes like /destinations/:id).
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  // console.log(user);
  const handleSigOut = () => {
    signOut();
  }
  return (
    <header className="w-full border-b border-black/10 bg-white">
      <nav className="relative mx-auto flex h-14 max-w-360 items-center justify-between px-4 sm:px-6">
        {/* Left links (desktop) */}
        <ul className="hidden items-center gap-7 lg:flex">
          {leftLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`text-[15px] transition-colors hover:text-[#00a2d4] ${
                  isActive(link.href)
                    ? "font-semibold text-[#00a2d4] underline underline-offset-4"
                    : "text-black"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Centered logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-xl font-bold tracking-wide text-[#00a2d4] sm:text-[26px]"
        >
          Wanderlast
        </Link>

        {/* Right links (desktop) */}
        <div className="hidden items-center gap-6 lg:flex">
          <Link
            href="/profile"
            className="flex items-center gap-1.5 text-[15px] text-black transition-colors hover:text-[#00a2d4]"
          >
            <User className="h-4 w-4" strokeWidth={2} />
            Profile
          </Link>
          {user ? 
            <Popover>
              <PopoverTrigger render={<Avatar>
                <AvatarImage referrerPolicy="no-referrer" src={user?.image as string } />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback></Avatar>}>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>{user?.name}</PopoverTitle>
                  <PopoverDescription><p>{user?.email}</p></PopoverDescription>
                  <Button onClick={handleSigOut} variant={'destructive'}>Signout</Button>
                </PopoverHeader>
              </PopoverContent>
          </Popover> :
          rightLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[15px] text-black transition-colors hover:text-[#00a2d4]"
            >
              {link.label}
            </Link>
          ))
          }

          
        </div>

        {/* Mobile: profile icon + hamburger */}
        <div className="flex items-center gap-4 lg:hidden">
          <Link
            href="/profile"
            aria-label="Profile"
            className="text-black transition-colors hover:text-[#00a2d4]"
          >
            <User className="h-5 w-5" strokeWidth={2} />
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="text-black transition-colors hover:text-[#00a2d4]"
          >
            {open ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-black/10 bg-white lg:hidden">
          <ul className="mx-auto flex max-w-360 flex-col px-4 py-2 sm:px-6">
            {mobileLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-[15px] transition-colors hover:text-[#00a2d4] ${
                    isActive(link.href)
                      ? "font-semibold text-[#00a2d4]"
                      : "text-black"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
