import React from 'react';
import './IndividualResult.css';
const IndividualResult = ({ result }) => {
    return (
        <div className="result-div">
            <p className="resultnumber"> {result[0]} </p>
            <ul className="result-list">
                <li className="titleelement"><strong>Title:</strong> {result[1]}</li>
                <li className="authorelement"><strong>Author(s):</strong> {result[2]}</li>
                <li><a className="download" href={result[3]}>Download</a></li>
            </ul>
        </div>
    );
}

export default IndividualResult;