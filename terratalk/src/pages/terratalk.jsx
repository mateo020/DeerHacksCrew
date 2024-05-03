import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
// import { MapContainer, TileLayer } from 'react-leaflet';
//import 'leaflet/dist/leaflet.css';
import axios from 'axios';

export default function TerraTalk() {
    const preface = 'Generate an Overpass-QL Query that displays the following prompt: "I am looking for "';
    const postface = ' Only generate the Query Language Code. Do not add any comments.';
    const [userIn, setUserIn] = useState('');
    const [overpassQuery, setOverpassQuery] = useState('');

    async function getOverpassResponse() {
        const response = (await axios.get("/api/openai", {
            params: {
                userIn: userIn,
            }
        })).data;
        console.log(response.message.content);
        setOverpassQuery(response.message.content);
    };

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
                <button className="btn btn-primary" onClick={getOverpassResponse}>Search</button>
                <h4>{overpassQuery}</h4>
            </div>
        </section>
    )
}
