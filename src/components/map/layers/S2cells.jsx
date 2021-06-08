import { useMapEvents, useMap, Polyline } from 'react-leaflet'
import { useEffect, useState } from 'react'

function getCells(map, levels) {
    if (levels.length === 0) {
        return []
    }
    const S2 = require('s2-geometry').S2;
    let processedCells = {}
    let stack = []
    let s2polylines = []

    const bounds = map.getBounds()
    
    const swPoint = bounds.getSouthWest()
    const nePoint = bounds.getNorthEast()
    const swLat = swPoint.lat
    const swLng = swPoint.lng
    const neLat = nePoint.lat
    const neLng = nePoint.lng

    function addPoly(cell){
        const corner = cell.getCornerLatLngs()
        s2polylines.indexOf(corner) === -1 && s2polylines.push(corner)
    }

    for (var i = 0; i < levels.length; i++) {
        const level = levels[i]
        const centerCell = S2.S2Cell.FromLatLng(map.getCenter(), level)
        processedCells[centerCell.toString()] = true
        stack.push(centerCell)
        addPoly(centerCell)

        // Find all cells within view with a slighty modified version of the BFS algorithm.
        while (stack.length > 0) {
            const cell = stack.pop()
            const neighbors = cell.getNeighbors()
            neighbors.forEach(function (ncell, index) {
                if (processedCells[ncell.toString()] !== true) {
                    const cornerLatLngs = ncell.getCornerLatLngs()
                    for (let i = 0; i < 4; i++) {
                        const item = cornerLatLngs[i]
                        if (item.lat >= swLat && item.lng >= swLng &&
                                item.lat <= neLat && item.lng <= neLng) {
                            processedCells[ncell.toString()] = true
                            stack.push(ncell)
                            addPoly(ncell)
                            break
                        }
                    }
                }
            })
        }
    }
        

    return s2polylines
}


export function GetS2CellsMove({levels}) {
    const [s2Lines, setS2Lines] = useState([])
    let map = useMapEvents({
        moveend() {
            setS2Lines(getCells(map, levels))
        }
    })

    map = useMap()
    useEffect (() => {
        setS2Lines(getCells(map, levels))
    }, [levels]) // eslint-disable-line react-hooks/exhaustive-deps
    // Aus den Augen aus dem Sinn

    if (s2Lines.length > 0) {
        return (
            <Polyline
                className="leaflet-polyline"
                pathOptions={{color:"teal", cursor:"grab", weight:0.5}}
                positions={s2Lines}
            />
        )
    } else {
        return null
    }
}
