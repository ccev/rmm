import { useState } from "react"
import { TileLayer, MapContainer, useMapEvents } from 'react-leaflet'

import { GetS2CellsMove } from "./map/layers/S2cells"
import Spawnpoints from "./map/layers/Spawnpoints"
import { GetMadmin } from "./Fetcher"


export default function MapCont(props) {
    const [spawnMarkers, setSpawnMarkers] = useState([])

    const startLocation = [54.0939078, 13.4066888]
    const zoom = 13
    return (
        <>
            <MapContainer
                tap={false}
                center={startLocation}
                zoom={zoom}
                zoomControl={false}
            >
                <TileLayer
                    key={props.generalSettings.tiles.key}
                    attribution={props.generalSettings.tiles.attr}
                    url={props.generalSettings.tiles.url}
                />
                <GetS2CellsMove levels={props.generalSettings.s2Levels}/>

                {props.spawnpointSettings.showEvents.length > 0 &&
                    <GetMadmin
                        setArray={setSpawnMarkers}
                        endpoint="get_spawns"
                        settingsChange={props.spawnpointSettings}
                    /> 
                }

                <Spawnpoints
                        settings={props.spawnpointSettings}
                        spawnMarkers={spawnMarkers}
                    />

            </MapContainer>
        </>
    )
}