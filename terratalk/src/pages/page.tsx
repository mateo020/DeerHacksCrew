import React, { useState, useEffect } from 'react'

function Page() {
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            const data = await (await fetch("/api/openai")).json();
            setMessage(data.name)
        }
        getData();
    }, [])

    return (
        <>
            <h2>Hello {message}</h2>
        </>
    )
}

export default Page