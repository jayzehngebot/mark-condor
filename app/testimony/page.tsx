'use client'

import { useEffect, useState } from "react";

async function getTestimony() {
    try {
        const res = await fetch('/api/getTestimony');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching testimony data:", error);
        return [];
    }
}

interface Testimony {
    id: number;
    name: string;
    testimony: string;
}

export default function Testimony() {
    const [testimony, setTestimony] = useState<Testimony[]>([]);

    useEffect(() => {
        getTestimony().then(setTestimony);
    }, []);

    return (
        <div className="flex flex-col items-center p-2 sm:p-10">
            <h1 className="text-4xl font-bold text-center mt-4">Testimonials</h1>
            <ul className="flex flex-col items-center w-full sm:w-1/2">
                {testimony.map((testimony) => (
                    <div key={testimony.id} className="flex flex-col p-10">
                        <h2 className="text-2xl font-bold mb-2 text-grey">{testimony.name}</h2>
                        <div className="text-medium" style={{ textIndent: '2em' }} dangerouslySetInnerHTML={{ __html: testimony.testimony }}></div>
                    </div>  
                ))}
            </ul>
        </div>
    )
}