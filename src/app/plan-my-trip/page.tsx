"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function PlanMyTripPage() {
    const [itinerary, setItinerary] = useState<string[] | null>(null);
    const [loading, setLoading] = useState(false);

    const handlePlanTrip = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setItinerary([
                "Day 1: Relax at Baga Beach, evening shacks & live music",
                "Day 2: Visit Old Goa churches + Fontainhas heritage walk",
                "Day 3: Water sports at Calangute + Nightlife in Anjuna",
            ]);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="relative min-h-screen">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')", // Goa beach photo
                }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Content */}
            <div className="relative z-10 py-12 px-6 text-white">
                {/* Title */}
                <h1 className="text-5xl font-extrabold text-center mb-6 drop-shadow-lg">
                    Plan Your Perfect Goa Trip 🌴
                </h1>
                <p className="text-center text-lg mb-12 text-gray-200">
                    Tell us what you love and let AI craft the perfect itinerary for you.
                </p>

                {/* Trip Preferences Form */}
                {!itinerary && (
                    <Card className="max-w-3xl mx-auto shadow-xl rounded-2xl bg-white/80 backdrop-blur-md">
                        <CardHeader className="bg-orange-500 text-white rounded-t-2xl">
                            <CardTitle className="text-2xl">Your Trip Preferences</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 text-gray-800">
                            <form onSubmit={handlePlanTrip} className="space-y-6">
                                {/* Duration */}
                                <div>
                                    <Label>Number of Days</Label>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 3"
                                        className="mt-1 border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                                    />
                                </div>

                                {/* Budget */}
                                <div>
                                    <Label>Budget</Label>
                                    <select className="w-full border rounded p-2 mt-1 border-gray-300 focus:ring-orange-500 focus:border-orange-500">
                                        <option>Budget</option>
                                        <option>Mid-range</option>
                                        <option>Luxury</option>
                                    </select>
                                </div>

                                {/* Interests */}
                                <div>
                                    <Label>What interests you?</Label>
                                    <div className="grid grid-cols-2 gap-3 mt-2">
                                        {["Beaches", "Nightlife", "Culture", "Food", "Adventure"].map(
                                            (interest) => (
                                                <label
                                                    key={interest}
                                                    className="flex items-center space-x-2 p-2 bg-blue-50/70 rounded-lg hover:bg-blue-100 cursor-pointer"
                                                >
                                                    <Checkbox id={interest} />
                                                    <span>{interest}</span>
                                                </label>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Group Type */}
                                <div>
                                    <Label>Who are you traveling with?</Label>
                                    <select className="w-full border rounded p-2 mt-1 border-gray-300 focus:ring-orange-500 focus:border-orange-500">
                                        <option>Solo</option>
                                        <option>Couple</option>
                                        <option>Friends</option>
                                        <option>Family</option>
                                    </select>
                                </div>

                                {/* Notes */}
                                <div>
                                    <Label>Anything specific you want?</Label>
                                    <Textarea
                                        placeholder="e.g. I want kayaking included"
                                        className="mt-1 border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                                    />
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-lg font-semibold rounded-lg"
                                >
                                    {loading ? "Planning..." : "Plan My Trip"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* AI Itinerary */}
                {/* AI Itinerary (Timeline Style) */}
                {itinerary && (
                    <div className="max-w-4xl mx-auto mt-10">
                        <h2 className="text-3xl font-bold text-center text-white drop-shadow-lg mb-10">
                            ✨ Your AI-Generated Itinerary
                        </h2>

                        <div className="relative border-l-4 border-orange-500 ml-6">
                            {itinerary.map((day, idx) => (
                                <div key={idx} className="mb-10 ml-6 relative">
                                    {/* Circle marker */}
                                    <span className="absolute -left-7 flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold shadow-lg">
                                        {idx + 1}
                                    </span>

                                    {/* Itinerary Content */}
                                    <div className="bg-white/85 backdrop-blur-md rounded-xl shadow-lg p-6">
                                        <h3 className="text-xl font-semibold text-orange-600">
                                            Day {idx + 1}
                                        </h3>
                                        <p className="text-gray-700 mt-2">{day}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Refinement Chat */}
                        <div className="mt-12">
                            <div className="bg-white/85 backdrop-blur-md rounded-xl shadow-lg p-6">
                                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                                    Refine Your Trip
                                </h4>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Ask AI to refine (e.g. Add kayaking)"
                                        className="focus:ring-orange-500 focus:border-orange-500"
                                    />
                                    <Button className="bg-orange-500 hover:bg-orange-600">Send</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
