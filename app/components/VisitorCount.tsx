"use client";

import { useState, useEffect } from 'react';

export default function VisitorCount() {
    const [count, setCount] = useState(0);
    const [firstVisit, setFirstVisit] = useState("false");
    const [isReady, setIsReady] = useState(false);


    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedFirstVisit = localStorage.getItem("firstVisit") || "true";
        setFirstVisit(storedFirstVisit);
        localStorage.setItem("firstVisit", "true");
        setIsReady(true);
        }
    }, []);

    useEffect(() => {
        if (isReady) {

        fetch("/api/updateVisitorCount?firstVisit=" + firstVisit)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            localStorage.setItem("firstVisit", "false");
            return response.json();
        })
        .then((data) => {
            localStorage.setItem("firstVisit", "false");
            setFirstVisit("false");
            setCount(data.count);
        })
        .catch((error) => {
            console.error("Error fetching visitor count:", error);
            });
        }
    }, [isReady, firstVisit]);


    return (
        <div className="text-medium font-light text-color-slate-800">Total Visitors : {count !== 0 ? count : ""}</div>
    );
}