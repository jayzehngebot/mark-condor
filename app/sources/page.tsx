// i'm going to be using a server endpoint to get the data for this page
// then i'm going to render cards for each source, three cards per row
'use client'

import Basecard from '../components/Basecard';
import { useEffect, useState } from "react";

async function getSources() {
    try {
        const res = await fetch('/api/getSources');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching sources data:", error);
        return [];
    }
}


export default function Sources() {
    
    const [sources, setSources] = useState<Source[]>([]);

    useEffect(() => {
        getSources().then(setSources);
    }, []);

    interface Source {
        id: number;
        title: string;
        description: string;
        source_url: string;
        image: string;
    } 
    
    return (
        <div className="flex flex-col items-center justify-center h-500 p-10 max-w-7xl">
            <h1 className="text-4xl text-center mt-4 text-slate-400 w-full pb-10">Sources <span className="hidden sm:inline text-slate-600">(of Inspiration)</span></h1>
            <div className="flex flex-row flex-wrap items-center justify-center w-full sm:ml-4 sm:mr-4 sm:mt-4">
            {sources.map((source: Source) => (
                <Basecard key={source.id} id={source.id} title={source.title} openInNewTab={true} image={source.image} description={source.description} source_url={source.source_url} />
            ))}
            </div>
        </div>
    )
}