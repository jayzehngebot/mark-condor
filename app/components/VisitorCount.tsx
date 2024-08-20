"use client";

import { useState, useEffect } from 'react';


export default function VisitorCount() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("fetching visitor count");
        fetch("/api/updateVisitorCount")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setCount(data.count)
            })
            .catch((error) => {
                console.error("Error fetching visitor count:", error);
            });
    }, []);
    return (
        <div className="text-medium font-light text-color-slate-800">{count}</div>

    );
}   