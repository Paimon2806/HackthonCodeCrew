import React, { useState, useEffect } from 'react';
import './Loading.css'; // Import your CSS file for styling

function Loading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Set loading duration to 3 seconds

    return () => clearTimeout(timeoutId); // Clear timeout on component unmount
  }, []);

  return (
    <div className={isLoading ? 'loading active' : 'loading'}>
      {/* Add your loading animation or content here */}
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
    </div>
  );
}

export default Loading;