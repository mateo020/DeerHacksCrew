import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function WelcomeSection() {

    const router = useRouter();

    const handleTryNow = () => {
        router.push('/signup');
    }

    return (
        <section id="welcomeSection" className="welcome--section">
            <div className="welcome--section--content-box">
                <div className="welcome--section--content">
                    <p className="section--title">Meet Terra</p>
                    <h1 className="welcome--section--title">
                        <span className="welcome--section--title--color">Your AI</span>
                        <br />
                        Urban Assistant
                    </h1>
                    <p className="welcome--section--description">
                        Effortlessly find georeferenced information anywhere.
                        <br />
                        Ask a question in natural language, and let Terra do the rest.
                    </p>
                </div>
                <button className="btn btn-primary" onClick={handleTryNow}>Try now</button>
            </div>

            <div className="welcome--section--img">
                {/* <Image width={500} height={500} src="./img/hero_img.png" alt="Welcome" /> */}
            </div>
        </section>
    )
}