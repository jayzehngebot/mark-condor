import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mark Condor - Sitemap",
};

export default function Sitemap() {
  return (
    <div className="w-full text-white max-w-6xl mx-auto p-4">
      <div className="w-full">
        <div className="text-2xl mb-4">Condor Method</div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="mb-4">
            <span className="text-slate-400">Company</span>
            <ul className="list-none pt-2">
              <li className="pb-2 text-slate-500">
                <Link href="/about">About MC</Link>
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <span className="text-slate-400">Explore</span>
            <ul className="list-none pt-2">
              <li className="pb-2 text-slate-500">
                <Link href="/shop">Shop</Link>
              </li>
              <li className="pb-2 text-slate-500">
                <Link href="/projects">Projects</Link>
              </li>
              <li className="pb-2 text-slate-500">
                <Link href="/testimony">Testimony</Link>
              </li>
              <li className="pb-2 text-slate-500">
                <Link href="/hire-mc">Hire M.C.</Link>
              </li>
              <li className="pb-2 text-slate-500">
                <Link href="/thoughts">Thoughts</Link>
              </li>
              <li className="pb-2 text-slate-500">
                <Link href="/sources">Sources</Link>
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <span className="text-slate-400">Support</span>
            <ul className="list-none pt-2">
              <li className="pb-2 text-slate-500">
                <Link href="/faq">FAQ</Link>
              </li>
              <li className="pb-2 text-slate-500">
                <Link href="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2 mb-4">
            <ul className="list-none">
              <span className="text-slate-200 text-xl pb-4">Early Access</span>
              <div className="flex flex-col pb-4 text-slate-500 pt-2">
                <p>
                  Sign up for our newsletter to get the latest news and updates about MC and the Condor Method.
                </p>
              </div>
              <input
                className="w-full p-2 text-black rounded-md"
                type="email"
                placeholder="Email"
              />
              <br />
              <button className="mt-4 bg-slate-700 p-2 rounded-md">Sign Up</button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}