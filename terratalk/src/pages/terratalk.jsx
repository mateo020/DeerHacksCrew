import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
// import { MapContainer, TileLayer } from 'react-leaflet';
//import 'leaflet/dist/leaflet.css';
import axios from 'axios';

// export default function TerraTalk() {
//     const preface = 'Generate an Overpass-QL Query that displays the following prompt: "I am looking for "';
//     const postface = ' Only generate the Query Language Code. Do not add any comments.';
//     const [userIn, setUserIn] = useState('');
//     const [overpassQuery, setOverpassQuery] = useState('');

//     async function getOverpassResponse() {
//         const response = (await axios.get("/api/openai", {
//             params: {
//                 userIn: userIn,
//             }
//         })).data;
//         // console.log(response.message.content);
//         // setOverpassQuery(response.message.content);
//     };

//     return (
//         <section id="terraTalk" className="terra">
//             <div className="terra--content-box">
//                 <div className="terra--content">
//                     <label className='prompt--box'>
//                         <input
//                             value={userIn}
//                             placeholder="What are you looking for?"
//                             onChange={(event) => setUserIn(event.target.value)}
//                             className={'prompt--box'}
//                         />
//                     </label>
//                 </div>
//                 <button className="btn btn-primary" onClick={getOverpassResponse}>Search</button>
//                 <h4>{overpassQuery}</h4>
//             </div>
//         </section>
//     )
// }

export default function TerraTalk() {
    const [userInput, setUserInput] = useState('');
    const [overpassQuery, setOverpassQuery] = useState('');

    // Function to handle the API request
    async function getOverpassResponse() {
        try {
            const response = await axios.post("/api/overpassQuery", {
                userInput: userInput  // Sending userInput as part of the request body
            });
            if (response.data && response.data.choices) {
                setOverpassQuery(response.data.choices[0].message.content);  // Assuming the API returns the choice structure
            } else {
                setOverpassQuery("No valid response received.");
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
            setOverpassQuery("Error fetching data. Please try again.");
        }
    };

    return (
        <section id="terraTalk" className="terra">
            <div className="terra--content-box">
                <div className="terra--content">
                    <label className='prompt--box'>
                        <input
                            value={userInput}
                            placeholder="What are you looking for?"
                            onChange={(event) => setUserInput(event.target.value)}
                            className={'prompt--box'}
                        />
                    </label>
                    <button className="btn btn-primary" onClick={getOverpassResponse}>Search</button>
                    <h4>{overpassQuery}</h4>  {/* Display the query or response here */}
                </div>
            </div>
        </section>
    )
}