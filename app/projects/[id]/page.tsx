import Head from 'next/head'
import { Metadata } from 'next'
import Image from 'next/image'

async function getProjects() {
  try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${baseUrl}/api/getProjects`);
      if (!res.ok) {
          throw new Error(`Failed to fetch projects: ${res.statusText}`);
      }
      const data = await res.json();
      return data;
  } catch (error) {
      console.error("Error fetching projects data:", error);
      return [];
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    return {
        title: `Project ${params.id}`,
        description: `Project ${params.id}`,
    }
}

interface Project {
  id: string;
  name: string;
  tags: string[];
  description: string;
  image: string;
  url: string;
}

export default async function Page({ params }: { params: { id: string } }) {
    const projects: Project[] = await getProjects();
    const project = projects.find((p: Project) => p.id === params.id);

    if (!project) {
      console.error(`Project with id ${params.id} not found`);
      return (
        <div>
          <h1>404 - Project Not Found</h1>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-500 p-10">
            <h1 className="text-4xl text-center mt-4 text-slate-400 w-full pb-10">Project : {project.name}</h1>
            <Image priority={true} src={`/projectimages/${project.image}`} alt={project.name} width={600} height={600} />
        </div>
    )
  }