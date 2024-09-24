
import FeaturedProducts from "./components/FeaturedProducts";
import StoryCard from "./components/StoryCard";
import SmallCard from "./components/SmallCard";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mark Condor : American Tidyguy",
  description: "Mark Condor is the American Tidyguy",
};

async function getNews(){
  try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/getNews`);
      if (!response.ok) {
          throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      return data.slice(0, 2);
  } catch (error) {
      console.error('Error fetching news:', error);
      return null;
  }
};

async function getStories(){
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/getStories`);
      if (!response.ok) {
          throw new Error('Failed to fetch stories');
      }
      const data = await response.json();
      return data[0];
  } catch (error) {
      console.error('Error fetching stories:', error);
      return null;
  }

}

async function getThoughts(){
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/getStories`);
      if (!response.ok) {
          throw new Error('Failed to fetch thoughts');
      }
      const data = await response.json();
      return data.slice(0, 2);
  } catch (error) {
      console.error('Error fetching thoughts:', error);
      return null;
  }
}

// Define the Thought type
type Thought = {
  id: string | number;
  url: string;
  title: string;
  description: string;
  image_url: string;
  priority: number; // Change this from string to number
};

type News = {
  id: string | number;
  url: string;
  headline: string;
  subhead: string;
  news: string;
  image_url: string;
  category: string;
  date: string;
  priority: number;
}

import { NextResponse } from "next/server";

const thoughts: Thought[] = await getThoughts();
const news: News[] = await getNews();
const firstStory = await getStories();

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between px-6">
      {/* Header Div */}
      <div className="flex flex-col items-center justify-between w-full max-w-6xl mt-6"> 
        <div className="grid grid-cols-1 sm:grid-cols-4 w-full h-90 sm:min-h-[500px]">
              <div className="col-span-1 sm:col-span-2 min-h-80 rounded-lg overflow-hidden p-4 text-left mb-10 sm:mr-6 max-w-6xl relative" style={{ backgroundImage: `url(/about/mc_rides_02-3.webp)`, backgroundSize: "cover", backgroundPositionX: "calc(50% - 100px)" }}>    
                <div className="absolute inset-0 bg-slate-900 bg-opacity-65"></div>
                <div className="relative z-10">
                  <h1 className="text-4xl text-white font-bold relative bottom-0 left-0">The Condor <br /> Method</h1>
                </div>
              </div>
          <div className="col-span-1 mb-10 sm:mb-0">
            <h2 className="text-2xl">Thoughts</h2>
              <ul>
                {thoughts && Array.isArray(thoughts) ? thoughts.map((thought: Thought) => (
                  <li key={thought.id}><SmallCard section="thoughts" url={thought.url} title={thought.title} description={thought.description} image_url={thought.image_url}/></li>
                )) : <li>No thoughts found</li>}
              </ul>
          </div>
          <div className="col-span-1 justify-end pl-2">
            <h2 className="text-2xl">News</h2>
            <ul>
                {news && Array.isArray(news) ? news.map((newsItem: News) => (
                  <li key={newsItem.id}><SmallCard section="news" url={newsItem.url} title={newsItem.headline} description={newsItem.subhead} image_url={newsItem.image_url}/></li>
                )) : <li>No news found</li>}
              </ul>
          </div>
        </div>
      </div>

      <div className="bottom-30 left-0 right-0 mb-10 w-full max-w-6xl grid text-center">
      <hr className="w-full mx-auto text-slate mb-2"/>
      
      <FeaturedProducts />

      <StoryCard story={firstStory} />

      </div>
    </main>
  );
}