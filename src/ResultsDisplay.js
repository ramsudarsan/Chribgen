import React from 'react';
import './ResultsDisplay.css'
import IndividualResult from './IndividualResult'

const ResultsDisplay = ({ results, fetchInProgress, hasMore, nextResults, hasPrevious, previousResults }) => {
    if (fetchInProgress === true) {
        return (
            <div className="center-results">
                <p> Results: </p>
                <img className="loading" src={require('./images/Loading.gif')}></img>
            </div>
        )

    } else if (hasMore === false) {
        if (hasPrevious === true) {
            return (
                <div className="center-results">
                    <p> Results: </p>
                    {
                        results.map((result, i) => {
                            return (
                                <IndividualResult key={i} result={result} />
                            )
                        })
                    }
                    <div className="buttonContainer">
                        <button className="previousButton" onClick={previousResults}>Previous</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="center-results">
                    <p> Results: </p>
                    {
                        results.map((result, i) => {
                            return (
                                <IndividualResult key={i} result={result} />
                            )
                        })
                    }
                </div>
            );
        }
    } else if (hasMore === true) {
        if (hasPrevious === true) {
            return (
                <div className="center-results">
                    <p> Results: </p>
                    {
                        results.map((result, i) => {
                            return (
                                <IndividualResult key={i} result={result} />
                            )
                        })
                    }
                    <div className="buttonContainer">
                        <button className="previousButton" onClick={previousResults}>Previous</button>
                        <button className="nextButton" onClick={nextResults}>Next</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="center-results">
                    <p> Results: </p>
                    {
                        results.map((result, i) => {
                            return (
                                <IndividualResult key={i} result={result} />
                            )
                        })
                    }
                    <div className="buttonContainer">
                        <button className="nextButton" onClick={nextResults}>Next</button>
                    </div>
                </div>
            );
        }
    }
}
export default ResultsDisplay;