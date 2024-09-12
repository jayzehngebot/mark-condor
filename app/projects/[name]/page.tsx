import Head from 'next/head'
import { Metadata } from 'next'
import Image from 'next/image'

async function getProjects() {
  try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
      const res = await fetch(`${baseUrl}/api/getProjects`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
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

export async function generateMetadata({ params }: { params: { url: string, name: string, description: string } }): Promise<Metadata> {
    return {
        title: `Project ${params.name}`,
        description: `Project ${params.description}`, 
    }
}

interface Project {
  id: string;
  name: string;
  tags: string[];
  description: string;
  image: string;
  url: string;
  primary_goal: string;
  secondary_goals: string[];
}

export default async function Page({ params }: { params: { name: string } }) {
    const projects: Project[] = await getProjects();
    const project = projects.find((p: Project) => p.url === params.name);

    if (!project) {
      console.error(`Project with name ${params.name} not found`);
      return (
        <div>
          <h1>404 - Project Not Found</h1>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-500 p-10">
            <h1 className="text-4xl text-center mt-4 text-slate-400 w-full pb-10">Project : {project.name}</h1>
            <h2 className="text-2xl text-center mt-4 text-slate-400 w-full pb-10">Primary Goal: {project.primary_goal}</h2>
            <Image priority={true} src={`/projectimages/${project.image}`} alt={project.name} width={600} height={600} />
        </div>
    )
  }