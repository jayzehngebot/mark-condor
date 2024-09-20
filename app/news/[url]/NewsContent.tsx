'use client'

import { useEffect, useRef } from 'react';
import { News } from './types';

export default function NewsContent({ news }: { news: News }) {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const contentDiv = contentRef.current;
        const newsContent = contentDiv?.querySelector('#news-content');
        if (newsContent) {
            newsContent.classList.add('hidden');
        }
        const elements = contentDiv?.querySelectorAll('p, li');
        elements?.forEach((el, index) => {
            el.classList.add('hidden');
            if (newsContent) {
                newsContent.classList.remove('hidden');
            }
            setTimeout(() => {
                el.classList.remove('hidden');
                el.classList.add('fade-in');
            }, index * 200);
        });
    }, []);

    return (
        <div className="flex flex-col items-center p-10">
            <h1 className="text-4xl text-center mt-4 text-slate-400 mb-6">{news.headline}</h1>
            <h2 className="text-2xl text-gray-500">{news.subhed}</h2>
            <div className="flex flex-col items-left text-left justify-left h-auto mt-2 sm:w-1/2 sm:mt-0 p-2 sm:p-10" ref={contentRef}>
                <div 
                    id="news-content" 
                    className="hidden animate-fade-in text-medium text-slate-500 paragraph-padding news-content" 
                    style={{ textIndent: '0' }} 
                    dangerouslySetInnerHTML={{ __html: news.text }}
                ></div>
            </div>
        </div>
    );
}