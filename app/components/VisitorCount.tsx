"use client";

import { useState, useEffect } from 'react';

export default function VisitorCount() {
    const [count, setCount] = useState(0);
    const [visited, setVisited] = useState<boolean>(false);
    const [hasVisited, setHasVisited] = useState("false");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedHasVisited = localStorage.getItem("hasVisited") || "false";
            setHasVisited(storedHasVisited);
        }
    }, []);

    useEffect(() => {
        if (hasVisited !== "false") {   
            fetch("/api/updateVisitorCount?hasVisited=" + hasVisited)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    localStorage.setItem("hasVisited", "true");
                    setVisited(true);
                    setCount(data.count);
                })
                .catch((error) => {
                    console.error("Error fetching visitor count:", error);
                });
        }
    }, [hasVisited]);

    return (
        <div className="text-medium font-light text-color-slate-800">Total Visitors : {count !== 0 ? count : ""}</div>
    );
}