'use client'

import Squad_ghost from '../components/Squad_ghost';

export default function Deepcuts() {
    return (
        <div className='flex flex-col items-center justify-center h-auto p-10'>
            <h1 className='text-4xl text-center mt-4 text-slate-400'>Squad</h1>

            <Squad_ghost/>

            <svg width="600" height="300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300">
                {/* First Flower */}
                <g transform="translate(0, 0)">
                    {/* Stem */}
                    <line x1="100" y1="150" x2="100" y2="250" stroke="green" strokeWidth="5" />

                    {/* Leaves */}
                    <ellipse cx="85" cy="200" rx="20" ry="10" fill="green" />
                    <ellipse cx="115" cy="220" rx="20" ry="10" fill="green" />

                    {/* Flower Petals */}
                    <circle cx="100" cy="100" r="30" fill="pink" />
                    <circle cx="130" cy="130" r="30" fill="pink" />
                    <circle cx="70" cy="130" r="30" fill="pink" />
                    <circle cx="100" cy="160" r="30" fill="pink" />

                    {/* Flower Center */}
                    <circle cx="100" cy="130" r="20" fill="yellow" />
                </g>

                {/* Second Flower */}
                <g transform="translate(200, 0)">
                    {/* Stem */}
                    <line x1="100" y1="140" x2="100" y2="260" stroke="darkgreen" strokeWidth="6" />

                    {/* Leaves */}
                    <ellipse cx="85" cy="190" rx="18" ry="9" fill="darkgreen" />
                    <ellipse cx="115" cy="230" rx="18" ry="9" fill="darkgreen" />

                    {/* Flower Petals */}
                    <circle cx="100" cy="90" r="25" fill="purple" />
                    <circle cx="135" cy="125" r="25" fill="purple" />
                    <circle cx="65" cy="125" r="25" fill="purple" />
                    <circle cx="100" cy="160" r="25" fill="purple" />

                    {/* Flower Center */}
                    <circle cx="100" cy="125" r="18" fill="yellow" />
                </g>

            </svg>
        </div>
    )
}