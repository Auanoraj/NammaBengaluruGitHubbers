import React from 'react';

const LoadSpinner = () => {
    return (
        <div className="loader-container">
            <p>Namma githuber's on the way</p>
            <div>
            <div className="spinner-grow text-primary m-3" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary m-3" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-success m-3" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-danger m-3" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-warning m-3" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-info m-3" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-dark m-3" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            </div>
        </div>
    )
}

export default LoadSpinner;