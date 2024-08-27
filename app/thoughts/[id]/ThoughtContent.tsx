'use client'

import { useEffect, useRef } from 'react';
import { Thought } from './types';

export default function ThoughtContent({ thought }: { thought: Thought }) {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const contentDiv = contentRef.current;
        const elements = contentDiv?.querySelectorAll('.animate-fade-in');
        elements?.forEach((el, index) => {
            el.classList.add('hidden');
            setTimeout(() => {
                el.classList.remove('hidden');
                el.classList.add('fade-in');
            }, index * 100);
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-auto mt-40">
            <h1 className="text-4xl">{thought.title}</h1>
            <p className="text-2xl text-gray-500">{thought.subhed}</p>
            
            <div className="flex flex-col items-left text-left justify-left h-auto mt-2 sm:w-1/2 sm:mt-0 p-2 sm:p-10" ref={contentRef}>
                <div 
                    className="animate-fade-in text-medium text-slate-500 paragraph-padding" 
                    style={{ textIndent: '0' }} 
                    dangerouslySetInnerHTML={{ __html: thought.text }}
                ></div>
            </div>
        </div>
    );
}