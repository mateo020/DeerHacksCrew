import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const TerraTalk = (props) => {
    const preface = 'Generate an Overpass-QL Query that displays node(s) for the following prompt: "I am looking for ';
    const postface = '" Only generate the Query Language Code. Do not add any comments.';

    const [userIn, setUserIn] = useState('');
    const [overpassQuery, setOverpassQuery] = useState('');
    const getOverpassQuery = async () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: `${preface + userIn + postface}`
            })
        }
        try {
            console.log("Attempting to retrieve response from GPT-3");
            const serverResponse = await fetch("http://localhost:8000/completions", options);
            const data = await serverResponse.json();
            console.log(data);
            setOverpassQuery(data.choices[0].message.content);
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <section id="terraTalk" className="terra">
            <div className="terra--content-box">
                <div className="terra--content">

                    <label className='prompt--box'>
                        <input
                            value={userIn}
                            placeholder="What are you looking for?"
                            onChange={(event) => setUserIn(event.target.value)}
                            className={'prompt--box'}
                        />
                    </label>

                </div>
                <button className="btn btn-primary" onClick={() => { getOverpassQuery() }}>Search</button>
            </div>
            <div>MAP PLACEHOLDER</div>
        </section>
    )
}
export default TerraTalk;

