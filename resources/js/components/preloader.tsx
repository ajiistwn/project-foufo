// resources/js/Components/Preloader.jsx
import React, { useState } from 'react';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(false);

    React.useEffect(() => {
        // Listen to Inertia events
        window.addEventListener('inertia:start', () => setIsLoading(true));
        window.addEventListener('inertia:finish', () => setIsLoading(false));

        // Cleanup listeners on component unmount
        return () => {
            window.removeEventListener('inertia:start', () => setIsLoading(true));
            window.removeEventListener('inertia:finish', () => setIsLoading(false));
        };
    }, []);

    return isLoading ? (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '3px',
            backgroundColor: '#6366f1',
            zIndex: 9999,
            transform: 'scaleX(1)',
            transformOrigin: 'left',
            transition: 'transform 0.3s ease',
        }} />
    ) : null;
};

export default Preloader;
