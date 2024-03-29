import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function WelcomeSection() {

    const navigate = useNavigate();

    const handleTryNow = () => {
        navigate('/terratalk');
    }

    return (
        <section id="welcomeSection" className="welcome--section">
            <div className="welcome--section--content-box">
                <div className="welcome--section--content">
                    <p className="section--title">Meet Terra</p>
                    <h1 className="welcome--section--title">
                        <span className="welcome--section--title--color">Your AI</span>
                        <br/>
                        Urban Assistant
                    </h1>
                    <p className="welcome--section--description">
                        Effortlessly find georeferenced information anywhere.
                        <br/>
                        Ask a question in natural language, and let Terra do the rest.
                    </p>
                </div>
                <button className="btn btn-primary" onClick={handleTryNow}>Try now</button>
            </div>

            <div className="welcome--section--img">
                <img src="./img/hero_img.png" alt="Welcome"></img>
            </div>
        </section>
    )
}