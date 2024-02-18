import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const TerraTalk = (props) => {
    const preface = 'Generate an Overpass-QL Query that displays the following prompt: "I am looking for ';
    const postface = '" Only generate the Query Language Code. Do not add any comments.';
    const [userIn, setUserIn] = useState('');
    const [overpassQuery, setOverpassQuery] = useState('');
    const getOverpassResponse = async (req, res) => {
        const options = {
            method: "POST",
            query: overpassQuery
        }
        try {
            console.log("(CS) Attempting to retrieve response from Overpass");
            const overpassResponse = await fetch("http://localhost:8000/interpreter", options);
            console.log("(CS) Ocerpass Response: " + overpassResponse);
            const overpassData = await overpassResponse.json();
            console.log("(CS) Overpass Data: " + overpassData + postface);
        }
        catch (error) {
            console.error(error)
        }
    }

    const getOpenAIResponse = async () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: `${preface + userIn}`
            })
        }
        try {
            console.log("Attempting to retrieve response from GPT-3");
            const openAIResponse = await fetch("http://localhost:8000/completions", options);
            const openAIData = await openAIResponse.json();
            console.log(openAIData);
            setOverpassQuery(openAIData.choices[0].message.content);
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        console.log("Query Updated:\n" + overpassQuery);
        getOverpassResponse();
    }, [overpassQuery]);


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
                <button className="btn btn-primary" onClick={() => { getOpenAIResponse() }}>Search</button>
            </div>
            <div className='map--box'>
                <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "400px", width: "100%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                </MapContainer>
            </div>
        </section>
    )
}
export default TerraTalk;

