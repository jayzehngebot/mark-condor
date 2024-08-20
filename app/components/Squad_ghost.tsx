import {useState, useEffect} from 'react';

import ghoststyle from './Squad_ghost.module.css';

export default function Squad_ghost() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [showBubble, setShowBubble] = useState(false);
    const [isFollowing, setIsFollowing] = useState(true); // New state to track if the ghost should follow the cursor
    const [isDragging, setIsDragging] = useState(false); // New state to track if the ghost is being dragged

    useEffect(() => {
        if (!isFollowing) return; // If not following, do nothing

        const handleMouseMove = (event: MouseEvent) => {
            if (isDragging) return; // If dragging, do nothing

            const ghostElement = document.querySelector(`.${ghoststyle.ghostContainer}`);
            const offsetX = ghostElement ? ghostElement.clientWidth / 2 : 0;
            const offsetY = ghostElement ? ghostElement.clientHeight / 2 : 0;
            setPosition({ x: event.clientX - offsetX, y: event.clientY - offsetY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isFollowing, isDragging]); // Add isDragging to the dependency array

    const handleMouseDown = () => {
        setIsDragging(true);
        setIsFollowing(false); // Stop following the cursor when dragging starts
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isDragging) return;

        setPosition({ x: event.clientX, y: event.clientY });
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const handleClick = () => {
        setShowBubble(!showBubble);
    };

    return (
        <div onMouseDown={handleMouseDown} style={{ position: 'absolute', left: position.x, top: position.y }}>
            <div className={`${ghoststyle.ghostContainer} w-full h-auto`}>
                <div className={ghoststyle.ghost}>
                <div className={ghoststyle.ghost__eyes}></div>
                <div className={ghoststyle.ghost__mouth}></div>

                <div className={ghoststyle.bottom}>
                    <div className={ghoststyle.circle}></div>
                    <div className={ghoststyle.circle}></div>
                    <div className={ghoststyle.circle}></div>
                    <div className={ghoststyle.circle}></div>
                    <div className={ghoststyle.wave}>
                        <div className={ghoststyle.wave1}></div>
                        <div className={ghoststyle.wave2}></div>
                    </div>
                </div>
            </div>
            {showBubble && <div className="speech-bubble">Boo!</div>}
            </div>
        </div>
    );
}