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
    key: number;
    name: string;
    tags: string;
    description: string;
    image: string;
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
    }, []);

    return (
        <div className="flex flex-col items-center justify-center align-center h-auto p-10">
            <h1 className="text-4xl text-center mt-4 text-slate-400 w-full pb-10">Projects</h1>
                <div className="flex flex-row flex-wrap items-center justify-center w-full sm:ml-4 sm:mr-4 sm:mt-4">
                {Array.isArray(projects) ? (
                    projects.map((project) => (
                        <Basecard key={project.id} id={project.id} openInNewTab={false} source_url={`/projects/${project.url}`} title={project.name} description={project.description} tags={project.tags} image={project.image} />
                    ))
                ) : (
                    <li>No projects available</li>
                )}
                </div>
        </div>
    )
}