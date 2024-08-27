'use client'

import { useEffect, useRef } from 'react';
import { Thought } from './types';

export default function ThoughtContent({ thought }: { thought: Thought }) {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const contentDiv = contentRef.current;
        const thoughtContent = contentDiv?.querySelector('#thought-content');
        if (thoughtContent) {
            thoughtContent.classList.add('hidden');
        }
        const elements = contentDiv?.querySelectorAll('p, li');
        elements?.forEach((el, index) => {
            el.classList.add('hidden');
            if (thoughtContent) {
                thoughtContent.classList.remove('hidden');
            }
            setTimeout(() => {
                el.classList.remove('hidden');
                el.classList.add('fade-in');
            }, index * 100);
        });
    }, []);

    return (
        <div className="flex flex-col items-center p-10">
            <h1 className="text-4xl text-center mt-4 text-slate-400 mb-6">{thought.title}</h1>
            <h2 className="text-2xl text-gray-500">{thought.subhed}</h2>
            <div className="flex flex-col items-left text-left justify-left h-auto mt-2 sm:w-1/2 sm:mt-0 p-2 sm:p-10" ref={contentRef}>
                <div 
                    id="thought-content" 
                    className="hidden animate-fade-in text-medium text-slate-500 paragraph-padding thought-content" 
                    style={{ textIndent: '0' }} 
                    dangerouslySetInnerHTML={{ __html: thought.text }}
                ></div>
            </div>
        </div>
    );
}