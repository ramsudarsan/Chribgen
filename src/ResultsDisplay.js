import React from 'react';
import './ResultsDisplay.css'
import IndividualResult from './IndividualResult'

const ResultsDisplay = ({ results, fetchInProgress }) => {
    if (fetchInProgress !== true) {
        return (
            <div>
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
    } else {
        return (
            <div className="center">
                <p> Results: </p>
                <img className="loading" src={require('./images/Loading.gif')}></img>
            </div>
        )

    }
}
export default ResultsDisplay;