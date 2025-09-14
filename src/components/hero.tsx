"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
    return (
        <section className="relative h-[80vh] bg-[url('/goa-unsplash.jpg')] flex items-center justify-center bg-cover bg-center">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Plan Your Perfect Goa Trip
                </h1>
                <p className="text-lg md:text-xl mb-8">
                    Beaches, Food, Nightlife, and Local Experiences — all with AI.
                </p>
                <div className="flex gap-4 justify-center">


                    <Link href="/plan-my-trip" passHref>
                        <Button asChild size="lg" className="rounded-xl bg-orange-600 hover:bg-orange-700">
                            <span>Plan My Trip</span>
                        </Button>
                    </Link>

                    <Button size="lg" className="rounded-xl bg-white text-black hover:bg-gray-200">
                        Ask AI
                    </Button>
                </div>
            </div>
        </section>
    )
}
