import Image from "next/image";

import FeaturedProducts from "./components/FeaturedProducts";
import StoryCard from "./components/StoryCard";

import { Metadata } from "next";
import { getStories } from "./api/getStories/route";

export const metadata: Metadata = {
  title: "Mark Condor : American Tidyguy",
  description: "Mark Condor is the American Tidyguy",
};

// call the getThoughts function
const response = await getStories();
const thoughts = await response.json();
const firstThought = thoughts[0];

console.log("firstThought", firstThought);


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between px-6">
      <div className="w-full max-w-4xl mx-auto mt-8 mb-8">
        <div className="relative h-48 sm:h-96">
          <Image
            priority={true}
            src="/about/mc_rides_02-3.webp"
            alt="The Condor Rides"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
          <div className="absolute inset-0 bg-slate-900 bg-opacity-65 flex items-center justify-center">
            <h1 className="text-xl sm:text-4xl text-center mt-4 text-slate-400">The Condor Method</h1>
          </div>
        </div>
      </div>

      <div className="bottom-30 left-0 right-0 mb-32 grid text-center">
      <hr className="w-full mx-auto text-slate mb-2"/>
      <h2 className="text-center w-full mb-4 text-lg pt-1">Featured Products</h2>

      <FeaturedProducts />

      <StoryCard story={firstThought} />
      </div>
    </main>
  );
}