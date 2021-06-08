import { useEffect } from "react"
import { useMapEvents, useMap } from "react-leaflet"

import config from "../config/config.json"

const getWithBound = async (endpoint, map) => {
    const bounds = map.getBounds()
    
    const swPoint = bounds.getSouthWest()
    const nePoint = bounds.getNorthEast()
    const swLat = swPoint.lat
    const swLon = swPoint.lng
    const neLat = nePoint.lat
    const neLon = nePoint.lng
    const res = await fetch(
        (config.madmin.url + endpoint +
            "?swLat=" + swLat.toString() +
            "&swLon=" + swLon.toString() +
            "&neLat=" + neLat.toString() +
            "&neLon=" + neLon.toString()
        ),
        {
            headers: new Headers({
                "Authorization": "Basic "+btoa(
                    config.madmin.user + ":" + config.madmin.password
                    )
            })
        }
    )

    const data = await res.json()
    return data
}

export function GetMadmin({ setArray, endpoint, settingsChange }) {
    
    const fetchMad = async (map) => {
        const fetchedSpawns = await getWithBound(endpoint, map)
        setArray(fetchedSpawns)
    }
    const map = useMap()

    useMapEvents({
        moveend() {
            fetchMad(map)
        }
    })

    useEffect (() => {
        fetchMad(map)
    }, [settingsChange])
    
    return null
}
