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
        {/* <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"qq
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

  */}
      </div>
    </main>
  );
}
