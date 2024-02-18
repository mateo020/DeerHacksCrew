import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const TerraTalk = (props) => {
    const [prompt, setPrompt] = useState('')
    

    return (
        <section id="terraTalk" className="terra">
        <div className="terra--content-box">
            <div className="terra--content">
   
                <label className='prompt--box'>
                <input
                    value={prompt}
                    placeholder="Enter a prompt"
                    onChange={(ev) => setPrompt(ev.target.value)}
                    className={'prompt--box'}
                />
                </label>

            </div>
            <button className="btn btn-primary">Search</button>
        </div>

        <div>MAP PLACEHOLDER</div>
    </section>
    )
}


export default TerraTalk;

