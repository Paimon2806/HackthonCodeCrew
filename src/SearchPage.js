import React from 'react';
import { useStateValue } from './StateProvider';
import useGoogleSearch from './useGoogleSearch';
import './SearchPage.css';


function SearchPage() {
    const [{ term }] = useStateValue();  // Get the search term from global state
    const { data, loading, error } = useGoogleSearch(term);  // Fetch dynamic data using the search term

    // If still loading
    if (loading) {
        return <div>Loading...</div>;
    }

    // Handle errors
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // If API data contains results
    if (data && data.res && data.res.reply) {
        return (
            <div className="searchPage">
                <div className="searchPage__header">
                    <h1>Water Footprint Search Results for "{term}"</h1>
                </div>
                <div className="searchPage__results">
                    {/*{data.res.reply.map((item, index) => (*/}
                    {/*    <div key={index} className="searchPage__result">*/}
                    {/*        <h2>{item.item}</h2>*/}
                    {/*        <p><strong>Water Footprint:</strong> {item.waterFootprint}</p>*/}
                    {/*        <p>{item.description}</p>*/}
                    {/*    </div>*/}
                    {/*))}*/}
                    {data.res.reply}
                </div>
            </div>
        );
    }

    // If no results found
    return (
        <div className="searchPage__noResults">
            <h2>No water footprint data found for "{term}".</h2>
        </div>
    );
}

export default SearchPage;
