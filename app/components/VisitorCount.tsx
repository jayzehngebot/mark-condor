"use client";

import { useState, useEffect } from 'react';


export default function VisitorCount() {
    const [count, setCount] = useState(0);

    // use local storage to determine if the user has visited the page
    const [hasVisited, setHasVisited] = useState(false);
    // if the user has visited the page, set the local storage to true
    useEffect(() => {
        if (hasVisited) {
            localStorage.setItem("hasVisited", "true");
        }
    }, [hasVisited]);

    useEffect(() => {
        console.log("fetching visitor count");
        // include param to check if the user has visited the page
        fetch("/api/updateVisitorCount?hasVisited=" + hasVisited)
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
        <div className="text-medium font-light text-color-slate-800">Total Visitors : {count !== 0 ? count : ""}</div>

    );
}   