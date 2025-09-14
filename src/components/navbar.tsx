"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      {/* Logo / App Name */}
      <Link href="/" className="text-xl font-bold text-orange-600">
        Goa AI Travel
      </Link>

      {/* Links */}
      <div className="hidden md:flex gap-6 items-center">
        <Link href="/" className="text-gray-700 hover:text-orange-600">Home</Link>
        <Link href="/#features" className="text-gray-700 hover:text-orange-600">Features</Link>
        <Link href="/#about" className="text-gray-700 hover:text-orange-600">About</Link>
        <Link href="/#contact" className="text-gray-700 hover:text-orange-600">Contact</Link>
      </div>

      {/* Sign in / Sign up buttons */}
      <div className="flex gap-2">
        <Button variant="outline" className="rounded-xl">Sign In</Button>
        <Button className="rounded-xl bg-orange-600 hover:bg-orange-700">Sign Up</Button>
      </div>
    </nav>
  )
}
