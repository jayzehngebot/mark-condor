'use client'

import { useState, useEffect } from 'react';

async function fetchKoans(): Promise<Koan[]> {
    try {
        const res = await fetch('/api/getKoans');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching koans data:", error);
        return [];
    }
}

interface Koan {
    id: number;
    koan: string;
}

export default function Thoughts() {
    const [koans, setKoans] = useState<Koan[]>([]);
    const [currentKoanIndex, setCurrentKoanIndex] = useState(0);

    useEffect(() => {
        async function fetchKoansData() { // Renamed to avoid conflict
            const fetchedKoans = await fetchKoans();
            setKoans(fetchedKoans);
        }
        fetchKoansData();
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
        <div className="flex flex-col items-center text-centerjustify-center  h-auto p-10">
            {koans.length > 0 && (
            <div className="koan">
                {koans[currentKoanIndex]?.koan || 'No koan available'}
            </div>
            )}
            <style jsx>{`   
                .koan {
                    text-align: center;
                    opacity: 0;
                    color: white;
                    font-size: 2rem;
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