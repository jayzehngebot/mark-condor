import Head from 'next/head'
import { Metadata } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import './thoughts.css';


async function getThoughts() {
  try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${baseUrl}/api/getThoughts`);
      if (!res.ok) {
          throw new Error(`Failed to fetch thoughts: ${res.statusText}`);
      }
      const data = await res.json();
      return data;
  } catch (error) {
      console.error("Error fetching thoughts data:", error);
      return [];
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    return {
        title: `Thought ${params.id}`,
        description: `Thought ${params.id}`,
    }
}

interface Thought {
  id: string;
  title: string;
  subhed: string;
  text: string;
  image: string;
}

export default async function Page({ params }: { params: { id: string } }) {
    const thoughts: Thought[] = await getThoughts();
    const thought = thoughts.find((p: Thought) => p.id === params.id);

    if (!thought) {
      console.error(`Thought with id ${params.id} not found`);
      return (
        <div>
          <h1>404 - Thought Not Found</h1>
        </div>
      );
    }

    return (
        <div className="flex flex-col items-center justify-center h-auto mt-40">
            <h1 className="text-4xl font-bold">{thought.title}</h1>
            <p className="text-2xl text-gray-500">{thought.subhed}</p>
            
            <div className="flex flex-col items-left text-left justify-left h-auto mt-2 sm:w-1/2 sm:mt-0 p-2 sm:p-10">
                <div className="text-medium text-slate-500 paragraph-padding" style={{ textIndent: '0' }} dangerouslySetInnerHTML={{ __html: thought.text }}></div>
            </div>
        </div>
    )
  }