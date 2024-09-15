import React, { useState, useRef, useEffect } from 'react';
import "./Search.css";
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { useHistory } from 'react-router';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Search({ hideButtons = false }) {
    const [, dispatch] = useStateValue();
    const [input, setInput] = useState("");
    const [showCamera, setShowCamera] = useState(false); // State to control camera visibility
    const history = useHistory();
    
    const videoRef = useRef(null); // Reference for the video element
    const svgRef = useRef(null); // Reference for the SVG element
    const containerRef = useRef(null); // Reference for the container to check clicks inside it

    const search = e => {
        e.preventDefault();
        dispatch({
            type: actionTypes.SET_SEARCH_TERM,
            term: input
        });

        history.push('/search');
    };

    // Function to open the camera when SVG is clicked
    const openCamera = async () => {
        setShowCamera(true); // Show the camera feed
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream; // Assign the stream to the video element
            }
        } catch (err) {
            console.error('Error accessing camera:', err);
        }
    };

    // Function to handle clicks outside of the SVG and camera feed
    const handleClickOutside = (event) => {
        if (
            svgRef.current && !svgRef.current.contains(event.target) &&
            videoRef.current && !videoRef.current.contains(event.target) &&
            containerRef.current && !containerRef.current.contains(event.target)
        ) {
            setShowCamera(false); // Hide the camera feed
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop()); // Stop the camera feed
                videoRef.current.srcObject = null;
            }
        }
    };

    useEffect(() => {
        // Add event listener for clicks outside of SVG and camera feed
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            // Clean up event listener on component unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <form className="search">
            <div className="container" ref={containerRef}>
                <div className="search_input">
                    <SearchIcon className="search_inputIcon" />
                    <input value={input} onChange={e => setInput(e.target.value)} />

                    {/* SVG for opening the camera */}
                    <svg
                        onClick={openCamera} /* Call openCamera when clicked */
                        width="45px"
                        height="45px"
                        viewBox="0 0 48 48"
                        style={{ cursor: 'pointer' }} /* Make SVG clickable */
                        ref={svgRef} /* Add ref to SVG */
                    >
                        <defs>
                            <style>
                                {`.cls-1 { fill:#08023f; stroke:#000000; stroke-linecap:round; stroke-linejoin:round; }`}
                            </style>
                        </defs>
                        <path className="cls-1" d="M19.83,8.77l-2.77,2.84H6.29A1.79,1.79,0,0,0,4.5,13.4V36.62a1.8,1.8,0,0,0,1.79,1.8H41.71a1.8,1.8,0,0,0,1.79-1.8V13.4a1.79,1.79,0,0,0-1.79-1.79H30.94L28.17,8.77Zm18.93,5.74a1.84,1.84,0,1,1,0,3.68A1.84,1.84,0,0,1,38.76,14.51ZM24,17.71a8.51,8.51,0,1,1-8.51,8.51A8.51,8.51,0,0,1,24,17.71Z" />
                    </svg>
                </div>
            </div>

            {/* Conditionally render the video element */}
            {showCamera && (
                <div className="camera_feed">
                    <video
                        ref={videoRef}
                        style={{ width: '100%', maxWidth: '400px', marginTop: '20px', border: '1px solid #ccc', borderRadius: '10px' }}
                        autoPlay
                        playsInline
                    ></video>
                </div>
            )}

            {/* Buttons */}
            {!hideButtons ? (
                <div className="search_buttons">
                    <Button type="submit" onClick={search} variant="outlined">Global Search</Button>
                    <Button variant="outlined">Instant Search</Button>
                </div>
            ) : (
                <div className="search_buttons">
                    <Button className="search_buttonsHidden" type="submit" onClick={search} variant="outlined">Google Search</Button>
                    <Button className="search_buttonsHidden" variant="outlined">I'm feeling lucky</Button>
                </div>
            )}
        </form>
    );
}

export default Search;
