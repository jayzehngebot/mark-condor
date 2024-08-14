import React, { useState, useEffect } from 'react';

const BUG_SIZE = 50; // Size of the bug in pixels
const BODY_SIZE = 40; // Size of the body in pixels

const getInitialPosition = () => ({
  top: Math.random() < 0.5 ? -BUG_SIZE : window.innerHeight, // Start from top or bottom
  left: Math.random() * window.innerWidth, // Random horizontal position
});

interface BugProps {
  isSquashed: boolean;
  setIsSquashed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Bug: React.FC<BugProps> = ({ isSquashed, setIsSquashed }) => {
  const [headPosition, setHeadPosition] = useState<{ top: number; left: number }>(getInitialPosition());
  const [bodyPosition, setBodyPosition] = useState<{ top: number; left: number }>(headPosition);
  const [angle, setAngle] = useState(Math.random() * 360); // Initial random angle for direction
  const [isVisible, setIsVisible] = useState(false); // Control visibility after delay

  useEffect(() => {
    const enterScreen = () => {
      setIsVisible(true);
    };

    const timeoutId = setTimeout(enterScreen, 5000); // Wait 5 seconds before the bug enters the screen

    return () => clearTimeout(timeoutId); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (!isVisible || isSquashed) return;

    const moveBug = () => {
      setHeadPosition((prevPosition) => {
        const speed = 2; // Speed of the bug
        const deltaAngle = (Math.random() - 0.5) * 30; // Small random change in direction

        const newAngle = angle + deltaAngle;
        setAngle(newAngle);

        const rad = (newAngle * Math.PI) / 180;

        let newTop = prevPosition.top + speed * Math.sin(rad);
        let newLeft = prevPosition.left + speed * Math.cos(rad);

        // Ensure the bug stays within the window bounds
        newTop = Math.max(-BUG_SIZE, Math.min(newTop, window.innerHeight));
        newLeft = Math.max(-BUG_SIZE, Math.min(newLeft, window.innerWidth));

        return { top: newTop, left: newLeft };
      });

      setBodyPosition((prevPosition) => {
        const followSpeed = 1.8; // Speed of the body following the head
        const deltaX = headPosition.left - prevPosition.left;
        const deltaY = headPosition.top - prevPosition.top;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < followSpeed) {
          return headPosition;
        }

        const ratio = followSpeed / distance;
        const newTop = prevPosition.top + deltaY * ratio;
        const newLeft = prevPosition.left + deltaX * ratio;

        return { top: newTop, left: newLeft };
      });
    };

    const intervalId = setInterval(moveBug, 50); // Move every 50ms

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [isVisible, angle, isSquashed, headPosition]);

  const handleSquash = () => {
    setIsSquashed(true);
  };

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: `${headPosition.top}px`,
          left: `${headPosition.left}px`,
          width: `${BUG_SIZE}px`,
          height: `${BUG_SIZE}px`,
          backgroundColor: 'transparent',
          zIndex: 1000,
          display: isVisible ? 'block' : 'none', // Hide initially, then show
          transform: `rotate(${angle}deg)`, // Rotate the head
        }}
        onClick={handleSquash} // Handle mouse clicks
        onTouchStart={handleSquash} // Handle touch events
      >
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            width: '20%',
            height: '20%',
            backgroundColor: isSquashed ? 'red' : 'white', // Change color when squashed
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)', // Center the head
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          top: `${bodyPosition.top}px`,
          left: `${bodyPosition.left}px`,
          width: `${BODY_SIZE}px`,
          height: `${BODY_SIZE}px`,
          backgroundColor: isSquashed ? 'red' : 'brown', // Change color when squashed
          borderRadius: '50%',
          zIndex: 999,
          display: isVisible ? 'block' : 'none', // Hide initially, then show
          transform: `rotate(${angle}deg)`, // Rotate the body
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            width: '60%',
            height: '60%',
            backgroundColor: isSquashed ? 'red' : 'black', // Change color when squashed
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)', // Center the body
          }}
        />
      </div>
    </>
  );
};

export default Bug;