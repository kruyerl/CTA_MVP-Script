import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const CTAcontainer = styled.div`
    background-color: red;
    height: 100%;
    width: 100%;
    max-width: 100%;
    max-height: 300px;
    box-sizing: border-box;
    overflow: hidden;
`
const CTAimg = styled.img`
    background-color: red;
    object-fit: cover;
    width: 100%;
`

export default function Injector() {
    const [clientID, setClientID] = useState(null)
    const [host, setHost] = useState('')
    const [path, setPath] = useState('')
    const [cta, setCTA] = useState({ url: '', alt: '', inject: false })

    const initGTAG = () => {
        try {
            const id = document.cookie
                .match(/_ga=(.+?);/)[1]
                .split('.')
                .slice(-2)
                .join('.')

            setClientID(id)
        } catch (error) {
            return setClientID('notfound')
        }
    }
    const initURL = () => {
        const { hostname } = window.location
        const { pathname } = window.location
        setHost(hostname)
        setPath(pathname)
    }
    const fetchCTA = async () => {
        try {
            await fetch('http://localhost:5000/cta-experiment-manual/us-central1/on_http_requests/api/v1/script', {
                method: 'POST',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ host, path, clientID }),
            })
                .then((data) => data.json())
                .then((data) => {
                    // todo handle received cta
                    const { url, alt, inject } = data
                    setCTA({
                        url,
                        alt,
                        inject,
                    })
                })
        } catch (error) {
            // todo handle error
        }
    }

    useEffect(() => {
        initURL()
        initGTAG()
    }, [])

    useEffect(() => {
        if (clientID != null) fetchCTA()
    }, [clientID])

    return cta.inject ? (
        <>
            <CTAcontainer>
                <CTAimg src={cta.url} alt={cta.alt} />
            </CTAcontainer>
        </>
    ) : (
        <>loading</>
    )
}
