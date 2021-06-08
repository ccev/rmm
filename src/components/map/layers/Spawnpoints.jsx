import { useEffect, useState } from "react";
import { Circle, useMapEvents, useMap, Popup } from "react-leaflet";
import L, { latLng } from "leaflet"
import moment from "moment"

export default function Spawnpoints({ settings, spawnMarkers }) {
    const map = useMap()

    const [circles, setCircles] = useState([]);
    const [spawns, setSpawns] = useState([])

    const resetSpawns = () => {
        setCircles([])
        for (var i = 0; i < spawns.length; i++) {
            const spawn = spawns[i]
            spawn.remove()
        }
    }
    const addSpawn = (spawn) => {
        setSpawns(spawns => ([...spawns, spawn]))
    }

    const drawSpawns = (ignoreCircles) => {
        const colorOptions = {
            default: "#19bdb7",
            active: "#16b50b",
            inactive: "#265dc9",
            unknown: "#f0451a",
            event: "#a67a14",
            outdated: "#31353b"
        }
        

        for (var i = 0; i < spawnMarkers.length; i++) {
            const event = spawnMarkers[i].EVENT
            if (!settings.showEvents.includes(event)) continue;
            const coords = spawnMarkers[i].Coords

            for (var j = 0; j < coords.length; j++) {
                const point = coords[j]

                const latLon = L.latLng(point.lat, point.lon)
                if (!map.getBounds().contains(latLon)) continue;

                if (!ignoreCircles) {
                    if (circles.includes(point.id)) continue;
                    setCircles((circle) => ([...circle, point.id]))
                }

                let color = colorOptions.default
                const now = moment();

                if (point.endtime !== null) {
                    const endsplit = point.endtime.split(":");
                    const endMinute = parseInt(endsplit[0]);
                    const endSecond = parseInt(endsplit[1]);
                    const despawntime = moment();

                    const timeshift = point.spawndef === 15 ? 60 : 30;

                    // setting despawn and spawn time
                    despawntime.minute(endMinute);
                    despawntime.second(endSecond);
                    const spawntime = moment(despawntime);
                    spawntime.subtract(timeshift, "m");

                    if (despawntime.isBefore(now)) {
                        // already despawned. shifting hours
                        spawntime.add(1, "h");
                        despawntime.add(1, "h");
                    }

                    if (settings.markActive && now.isBetween(spawntime, despawntime)) {
                        color = colorOptions.active;
                    }
                    else if (settings.markActive && spawntime.isAfter(now)) {
                        color = colorOptions.inactive;
                    }
                }
                else if (settings.markUnknown){
                    color = colorOptions.unknown;
                }

                const lastMon = moment(point.lastnonscan, "YYYY-MM-DD HH:mm:ss");
                if (settings.markOutdated && lastMon.isBefore(now.subtract(10, "days"))) {
                    color = colorOptions.outdated
                }

                if ( settings.markEvent && point.event != "DEFAULT" ) {
                    color = colorOptions.event
                }

                var popup = L.popup("HALLO :)")


                const spawn = L.circle(
                    latLon,
                    {
                        radius: 3,
                        stroke: false,
                        fillOpacity: 1,
                        fillColor: color
                    }).bindPopup(popup)
                addSpawn(spawn)
                spawn.addTo(map)

            }
        }
    }
    
    useEffect (() => {
        drawSpawns(false)
        
    }, [spawnMarkers])

    useEffect (() => {
        resetSpawns()
        drawSpawns(true)
        console.log(settings)
        
    }, [settings])

    return null
}
