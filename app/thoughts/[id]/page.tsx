import { Metadata } from 'next'
import './thoughts.css';
import ThoughtContent from './ThoughtContent'

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
  image_url: string;
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

    return <ThoughtContent thought={thought} />;
}