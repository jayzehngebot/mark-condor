'use client'

import { useState, useEffect, useRef } from 'react';

import Basecard from '../components/Basecard';

async function fetchKoans(): Promise<Koan[]> {
    try {
        const res = await fetch('/api/getKoans');
        const data = await res.json();
        console.log(data);  
        return data;
    } catch (error) {
        console.error("Error fetching koans data:", error);
        return [];
    }
}

async function fetchThoughts(): Promise<Thought[]> {
    try {
        const res = await fetch('/api/getThoughts');
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching thoughts data:", error);
        return [];
    }
}

interface Koan {
    id: number;
    koan: string;
}

interface Thought {
    id: number;
    text: string;
    subhed: string;
    image: string;
    title: string;
    description: string; // Added this line
}

export default function Thoughts() {
    const [koans, setKoans] = useState<Koan[]>([]);
    const [currentKoanIndex, setCurrentKoanIndex] = useState(0);
    const [thoughts, setThoughts] = useState<Thought[]>([]);
    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        async function fetchData() {
            const [fetchedKoans, fetchedThoughts] = await Promise.all([
                fetchKoans(),
                fetchThoughts()
            ]);
            setKoans(fetchedKoans);
            setThoughts(Array.isArray(fetchedThoughts) ? fetchedThoughts : []);
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (koans.length > 0) {
            const interval = setInterval(() => {
                setCurrentKoanIndex((prevIndex) => (prevIndex + 1) % koans.length);
            }, 10000); // Change koan every 10 seconds
            return () => clearInterval(interval);
        }
    }, [koans]);

    return (
        <div className="flex w-full flex-col items-center justify-center h-auto p-2 sm:p-10">
            {koans.length > 0 && (
            <div className="text-4xl text-center mt-4 text-slate-400 mb-4 koan">
                {koans[currentKoanIndex]?.koan || 'No koan available'}
            </div>
            )}

            {/* Thoughts cards */}
            <div className="flex flex-col items-center text-center justify-center sm:m-10">
                {thoughts.map((thought) => (
                    <Basecard 
                        key={thought.id} 
                        id={thought.id} 
                        wide={true} 
                        title={thought.title} 
                        subhed={thought.subhed} 
                        source_url={`/thoughts/${thought.id}`} 
                        image={thought.image}
                        description={thought.description} // Added this line
                    />
                ))}
            </div>

            <style jsx>{`   
                .koan {
                    animation: fadeInOut 10s infinite;
                }

                @keyframes fadeInOut {
                    0%, 100% { opacity: 0; }
                    50% { opacity: 1; }
                }
            `}</style>
        </div>
    )
}