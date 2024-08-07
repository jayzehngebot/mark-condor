

import Image from "next/image";
import dynamic from "next/dynamic";

const FeaturedProducts = dynamic(() => import("./components/FeaturedProducts"), { ssr: false });

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mark Condor : American Tidyguy",
  description: "Mark Condor is the American Tidyguy",
};


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between px-6">

      <div className="container inline-block mx-auto h-[30vh] text-center mt-10">
        <h1 className="text-4xl font-bold">Mark Condor</h1>
        <br/>
        <h2 className="text-2xl">American Tidyguy</h2>
      </div>

      <div className="bottom-30 left-0 right-0 mb-32 grid text-center">
      <hr className="w-full mx-auto text-slate mb-2"/>
      <h3 className="text-center w-full mb-4">Featured Products</h3>

      {/* loop through featured products and present them. link them */}
      <FeaturedProducts />
      </div>
    </main>
  );
}
