"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/navbar";

export default function PlanMyTripPage() {
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [travelingWith, setTravelingWith] = useState("Solo");
  const [specific, setSpecific] = useState("");
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<string[]>([]);

  const handleInterestChange = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/plan-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          days,
          budget,
          interests,
          travelingWith,
          specific,
        }),
      });

      const data = await res.json();
      setItinerary(data.itinerary || []);
    } catch (err) {
      console.error("Error generating itinerary:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/goa-unsplash.jpg')" }}
    >
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Your Trip Preferences
        </h1>

        {/* Trip Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="font-medium">Number of Days</label>
            <Input
              placeholder="e.g. 3"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-medium">Budget</label>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger>
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="font-medium">What interests you?</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {["Beaches", "Nightlife", "Culture", "Food", "Adventure"].map(
                (interest) => (
                  <div
                    key={interest}
                    className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg"
                  >
                    <Checkbox
                      checked={interests.includes(interest)}
                      onCheckedChange={() => handleInterestChange(interest)}
                    />
                    <span>{interest}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div>
            <label className="font-medium">Who are you traveling with?</label>
            <Select value={travelingWith} onValueChange={setTravelingWith}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Solo">Solo</SelectItem>
                <SelectItem value="Couple">Couple</SelectItem>
                <SelectItem value="Family">Family</SelectItem>
                <SelectItem value="Friends">Friends</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="font-medium">Anything specific you want?</label>
            <Textarea
              placeholder="e.g. I want kayaking included"
              value={specific}
              onChange={(e) => setSpecific(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700"
            disabled={loading}
          >
            {loading ? "Planning..." : "Plan My Trip"}
          </Button>
        </form>

        {/* Timeline Output */}
        {itinerary.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-orange-600 mb-6 text-center">
              Your AI-Generated Itinerary ✨
            </h2>

            <div className="relative border-l-4 border-orange-500 ml-6">
              {itinerary.map((day, idx) => (
                <div key={idx} className="mb-10 ml-6 relative">
                  <span className="absolute -left-7 flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold shadow-lg">
                    {idx + 1}
                  </span>
                  <div className="bg-white/85 backdrop-blur-md rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-orange-600">
                      Day {idx + 1}
                    </h3>
                    <p className="text-gray-700 mt-2">{day}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
