import {useState, useEffect, useCallback} from 'react';

import ghoststyle from './Squad_ghost.module.css';

export default function Squad_ghost() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [showBubble, setShowBubble] = useState(false);
    const [isFollowing, setIsFollowing] = useState(true);
    const [isDragging, setIsDragging] = useState(false);

    // Wrap handleMove with useCallback
    const handleMove = useCallback((clientX: number, clientY: number) => {
        if (!isDragging) return;
        setPosition({ x: clientX, y: clientY });
    }, [isDragging]); // Include isDragging in the dependency array

    // Mouse move event handler adjusted for native events
    const handleMouseMove = useCallback((event: MouseEvent) => {
        handleMove(event.clientX, event.clientY);
    }, [handleMove]); // Add handleMove to the dependency array

    // Wrap handleTouchMove with useCallback
    const handleTouchMove = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
        event.preventDefault(); // Prevents scrolling during touch
        handleMove(event.touches[0].clientX, event.touches[0].clientY);
    }, [handleMove]); // Add handleMove to the dependency array

    // Setup event listeners for mouse and touch
    useEffect(() => {
        const handleMouseUp = () => setIsDragging(false);
        const handleTouchEnd = () => setIsDragging(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchmove', handleTouchMove as unknown as EventListener, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove as unknown as EventListener );
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging, handleMouseMove, handleTouchMove]); // Include the handlers in the dependency array

    // Start dragging
    const startDrag = () => {
        setIsDragging(true);
        setIsFollowing(false);
    };

    // Separate handlers for mouse and touch events
    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        handleStart(event as unknown as MouseEvent);
    };

    const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        handleStart(event as unknown as TouchEvent);
    };

    const handleStart = (event: MouseEvent | TouchEvent) => {
        if (event.type === 'mousedown' || event.type === 'touchstart') {
            startDrag();
        }
    };

    const handleClick = () => {
        setShowBubble(!showBubble);
    };

    return (
        <div onMouseDown={handleMouseDown} onTouchStart={handleTouchStart} style={{ position: 'absolute', left: position.x, top: position.y }}>
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