import Head from 'next/head'
import { Metadata } from 'next'
import Image from 'next/image'

async function getProjects() {
  try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${baseUrl}/api/getProjects`);
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

export async function generateStaticParams() {
    const projects = await getProjects();
    return projects.map((project: Project) => ({ 
      id: project.id,
      name: project.name,
      tags: project.tags,
      description: project.description,
      image: project.image,
      url: project.url
     }));
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
    const { id } = params;
    const projects: Project[] = await getProjects(); // Ensure this line is awaited properly
    const project = projects.find((p: Project) => p.id === id);

    if (!project) {
      return (
        <div>
          <h1>404 - Project Not Found</h1>
        </div>
      );
    }

    return (
        <div className="flex flex-col items-center justify-center h-auto mt-40">
            <h1 className="text-4xl font-bold">Project : {project.name}</h1>
            <Image priority={true} src={`/projectimages/${project.image}?v=${project.id}`} alt={project.name} width={600} height={600} />
        </div>
    )
  }