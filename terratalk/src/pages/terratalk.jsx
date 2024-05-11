import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import dynamic from 'next/dynamic'

const DynamicMap = dynamic(() => import('@/components/Map.tsx'), {
    ssr: false,
});


export default function TerraTalk() {
    const preface = 'Generate an Overpass-QL Query that displays the following prompt: "I am looking for "';
    const postface = ' Only generate the Query Language Code. Do not add any comments.';
    const [userIn, setUserIn] = useState('');
    const [overpassQuery, setOverpassQuery] = useState('');
    const [overpassResponse, setOverpassResponse] = useState(null);

    async function getOverpassResponse() {
        const response = (await axios.get("/api/openai", {
            params: {
                userIn: userIn,
            }
        })).data;
        setOverpassQuery(response.message.content);
        //console.log(response.message.content)
    };

    useEffect(() => {
        if (overpassQuery) {
            fetchOverpassData();
        }
    }, [overpassQuery]);

    async function fetchOverpassData() {
        try {
            const response = await fetch("https://overpass-api.de/api/interpreter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `data=${encodeURIComponent(overpassQuery)}`
            });
            const data = await response.json();
            setOverpassResponse(JSON.stringify(data, null, 2));
            //console.log(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error fetching Overpass data:', error);
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
                <button className="btn btn-primary" onClick={getOverpassResponse}>Search</button>
                <h4>{overpassQuery}</h4>
            </div>
            <DynamicMap locations = {overpassResponse}/>
        </section>
    )
}
