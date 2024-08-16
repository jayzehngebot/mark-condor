'use client'
// page showing all projects

import { Metadata } from 'next'
import { useEffect, useState } from 'react'
import Basecard from '../components/Basecard';
// fetch projects api
import { GET } from '../api/getProjects/route';

const metadata: Metadata = {
    title: "Projects",
    description: "List of all projects",
};

type Project = {
    id: number;
    name: string;
    tags: string;
    description: string;
    images: string[];
    url: string;
};

async function getProjects() {
    try {
        const res = await fetch('/api/getProjects');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching projects data:", error);
        return [];
    }
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        getProjects().then(setProjects);
        console.log(projects);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-auto p-10">
            <h1 className="text-4xl text-center mt-4 text-slate-400">Projects</h1>
                {Array.isArray(projects) ? (
                    projects.map((project) => (
                        <Basecard key={project.id} source_url={`/projects/${project.url}`} title={project.name} description={project.description} tags={project.tags} images={project.images} />
                    ))
                ) : (
                    <li>No projects available</li>
                )}
        </div>
    )
}