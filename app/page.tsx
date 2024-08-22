import Image from "next/image";

import FeaturedProducts from "./components/FeaturedProducts";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mark Condor : American Tidyguy",
  description: "Mark Condor is the American Tidyguy",
};


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between px-6">
      <div className="w-full max-w-4xl mx-auto mt-8 mb-8">
        <div className="relative h-96">
          <Image
            priority={true}
            src="/about/mc_rides_02-2.webp"
            alt="The Condor Rides"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-2xl sm:text-4xl text-center mt-4 text-slate-400">The Condor Method</h1>
          </div>
        </div>
      </div>

      




      <div className="bottom-30 left-0 right-0 mb-32 grid text-center">
      <hr className="w-full mx-auto text-slate mb-2"/>
      <h2 className="text-center w-full mb-4 text-lg pt-1">Featured Products</h2>

      <FeaturedProducts />
      </div>
    </main>
  );
}