// page showing all projects
'use client'

import { useEffect, useState } from 'react'
// fetch projects api
import { GET } from '../api/getProjects/route';

type Project = {
    id: number;
    name: string;
};

export default function Projects() {
    // Use the Project type in your state declaration
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        GET()
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProjects(data)
                } else {
                    console.error('Expected an array but got:', data)
                }
            })
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-auto mt-40">
            <h1 className="text-4xl font-bold">Projects</h1>
            <ul>
                {Array.isArray(projects) ? (
                    projects.map((project) => (
                        <li key={project.id}>{project.name}</li>
                    ))
                ) : (
                    <li>No projects available</li>
                )}
            </ul>
        </div>
    )
}