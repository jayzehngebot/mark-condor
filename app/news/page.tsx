'use client'

import { useState, useEffect, useRef } from 'react';

import Basecard from '../components/Basecard';

async function fetchNews(): Promise<News[]> {
    try {
        const res = await fetch('/api/getNews');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching thoughts data:", error);
        return [];
    }
}

interface News {
    id: number;
    text: string;
    subhed: string;
    image_url: string;
    title: string;
    description: string;
    url: string;
}

export default function Thoughts() {
    const [news, setNews] = useState<News[]>([]);
    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        async function fetchData() {
            const fetchedNews = await fetchNews();
            setNews(Array.isArray(fetchedNews) ? fetchedNews : []);
        }

        fetchData();
    }, []);

    return (
        <div className="flex w-full flex-col items-center justify-center h-auto p-2 sm:p-10">
            
            <h1 className="text-4xl text-center mt-4 text-slate-400 mb-4">News</h1>

            <div className="flex flex-col items-center text-center justify-center p-2 sm:m-10">
                {news.map((news) => (
                    <Basecard
                        key={news.id} 
                        id={news.id} 
                        show_thumbnail={false}
                        wide={true} 
                        title={news.title} 
                        subhed={news.subhed} 
                        source_url={`/news/${news.url}`} 
                        image_url={news.image_url}
                        description={news.description} // Added this line
                    />
                ))}
            </div>

        </div>
    )
}