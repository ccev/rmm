import "./index.css"

import { useState } from "react"
import { FaCog, FaDrawPolygon, FaMapMarkerAlt, FaRoute,
    FaLeaf } from "react-icons/fa"

import MapCont from "./components/Map"
import Sidebar from "./components/menu/Sidebar"
import ApplySettings from "./components/menu/ApplySettings"
import SidebarPage from "./components/menu/SidebarPage"
import { SelectModal, SwitchModal } from "./components/Modals.jsx"

export default function App() {
    const availableTiles = [
        {
            key: "Carto Positron",
            attr: "Map tiles by Carto, under CC BY 3.0. Data by  <a href='https://www.openstreetmap.org/'>OpenStreetMap</a>, under ODbL.",
            url: "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png"
        },
        {
            key: "Carto Positron NoLabel",
            attr: "Map tiles by Carto, under CC BY 3.0. Data by  <a href='https://www.openstreetmap.org/'>OpenStreetMap</a>, under ODbL.",
            url: "https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png"
        },
        {
            key: "Carto Voyager",
            attr: "Map tiles by Carto, under CC BY 3.0. Data by  <a href='https://www.openstreetmap.org/'>OpenStreetMap</a>, under ODbL.",
            url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
        },
        {
            key: "Carto Voyager NoLabel",
            attr: "Map tiles by Carto, under CC BY 3.0. Data by  <a href='https://www.openstreetmap.org/'>OpenStreetMap</a>, under ODbL.",
            url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png"
        },
        {
            key: "OSM",
            attr: "Map data &copy; <a href='https://www.openstreetmap.org'>OpenStreetMap</a> contributors",
            url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        },
        {
            key: "Satellite",
            attr: "&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        },
        {
            key: "Nothing",
            attr: "",
            url: ""
        }
    ]


    // Point Settings

    const [pointSettings, setPointSettings] = useState({
        showWorkers: false,
        showGyms: false,
        showStops: false,
        showMons: false,
        showCells: false
    })

    const setPointSettingsShowWorkers = (v) => {
        setPointSettings((oldSettings) => ({...oldSettings, showWorkers: v}))
    }

    const setPointSettingsShowGyms = (v) => {
        setPointSettings((oldSettings) => ({...oldSettings, showGyms: v}))
    }

    const setPointSettingsShowStops = (v) => {
        setPointSettings((oldSettings) => ({...oldSettings, showStops: v}))
    }

    const setPointSettingsShowMons = (v) => {
        setPointSettings((oldSettings) => ({...oldSettings, showMons: v}))
    }

    const setPointSettingsShowCells = (v) => {
        setPointSettings((oldSettings) => ({...oldSettings, showCells: v}))
    }

    // Spawnpoint Settings

    const [spawnpointSettings, setSpawnpointSetting] = useState({
        showEvents: [],
        markActive: false,
        markUnknown: true,
        markEvent: true,
        markOutdated: true
    })

    const selectSpawnpointEventsModal = (r) => {
        const showEvents = r.map(o => o.value)
        setSpawnpointSetting((oldSettings) => ({...oldSettings, showEvents}))
    }

    const setSpawnpointSettingsMarkActive = (v) => {
        setSpawnpointSetting((oldSettings) => ({...oldSettings, markActive: v}))

    }

    const setSpawnpointSettingsMarkUnknown = (v) => {
        setSpawnpointSetting((oldSettings) => ({...oldSettings, markUnknown: v}))

    }

    const setSpawnpointSettingsMarkEvent = (v) => {
        setSpawnpointSetting((oldSettings) => ({...oldSettings, markEvent: v}))

    }

    const setSpawnpointSettingsMarkOutdated = (v) => {
        setSpawnpointSetting((oldSettings) => ({...oldSettings, markOutdated: v}))

    }

    // General Settings

    const [generalSettings, setGeneralSettings] = useState({
        tiles: availableTiles[0],
        s2Levels: []
    })

    const selectTileModal = (r) => {
        setGeneralSettings((oldSettings) => ({...oldSettings, tiles: r.value}))
    }

    const selectS2LevelModal = (r) => {
        setGeneralSettings((oldSettings) => ({...oldSettings, s2Levels: r.map(o => o.value)}))
    }

    const [availableSettings, setAvailableSettings] = useState([
        {
            title: "Points",
            icon: FaMapMarkerAlt,
            options: [
                {
                    title: "Devices",
                    modal: <SwitchModal
                        onToggle={setPointSettingsShowWorkers}
                        defaultPosition={pointSettings.showWorkers}/> 
                },
                {
                    title: "Gyms",
                    modal: <SwitchModal
                        onToggle={setPointSettingsShowGyms}
                        defaultPosition={pointSettings.showGyms}/> 
                },
                {
                    title: "Pokéstops",
                    modal: <SwitchModal
                        onToggle={setPointSettingsShowStops}
                        defaultPosition={pointSettings.showStops}/> 
                },
                {
                    title: "Pokémon",
                    modal: <SwitchModal
                        onToggle={setPointSettingsShowMons}
                        defaultPosition={pointSettings.showMons}/> 
                },
                {
                    title: "Cellupdates",
                    modal: <SwitchModal
                        onToggle={setPointSettingsShowCells}
                        defaultPosition={pointSettings.showCells}/> 
                }
            ]
        },
        {
            title: "Routes",
            icon: FaRoute,
            options: [
                
                
            ]
        },
        {
            title: "Spawnpoints",
            icon: FaLeaf,
            options: [
                {
                    title: "Events",
                    modal: SelectModal(
                        [{value: "DEFAULT", label: "DEFAULT"},{value: "Spotlight Hours", label: "Spotlight Hours"}],
                        selectSpawnpointEventsModal,
                        spawnpointSettings.showEvents.map(event => ({value: event, label: event})),
                        true
                    )
                },
                {
                    title: "Distinguish active/inactive Spawns",
                    modal: <SwitchModal
                        onToggle={setSpawnpointSettingsMarkActive}
                        defaultPosition={spawnpointSettings.markActive}/> 
                },
                {
                    title: "Color unknown Spawns red",
                    modal: <SwitchModal
                        onToggle={setSpawnpointSettingsMarkUnknown}
                        defaultPosition={spawnpointSettings.markUnknown}/> 
                },
                {
                    title: "Color Event Spawns brown",
                    modal: <SwitchModal
                        onToggle={setSpawnpointSettingsMarkEvent}
                        defaultPosition={spawnpointSettings.markEvent}/> 
                },
                {
                    title: "Color outdated Spawns black",
                    modal: <SwitchModal
                        onToggle={setSpawnpointSettingsMarkOutdated}
                        defaultPosition={spawnpointSettings.markOutdated}/> 
                }
            ]
        },
        {
            title: "Geofences",
            icon: FaDrawPolygon,
            options: [
    
            ]
        },
        {
            title: "Settings",
            icon: FaCog,
            options: [
                {
                    title: "Show S2 Cells",
                    modal: SelectModal(
                        [...Array(20).keys()].reverse().map((num) => ({value: num+1, label: "Level " + (num+1).toString()})),
                        selectS2LevelModal,
                        generalSettings.s2Levels.map(level => ({value: level, label: "Level "+level.toString()})),
                        true
                    )
                },
                {
                    title: "Map Tiles",
                    modal: SelectModal(
                        availableTiles.map((tile) => ({value: tile, label: tile.key})),
                        selectTileModal,
                        {value: generalSettings.tiles, label: generalSettings.tiles.key}
                    )
                },
                {
                    title: "First Radius",
                    modal: ""
                },
                {
                    title: "Second Radius",
                    modal: ""
                },
                {
                    title: "Third Radius",
                    modal: ""
                },
            ]
        }
    ])


    //SidebarPage states

    const [selectedSetting, selectSetting] = useState({close: true, first: true})
    const showSetting = (setting) => {
        if (isSettingSelected(setting)) {
            closeSetting()
        } else {
            selectSetting({...setting, close: false, first: false})
        }
    }
    const closeSetting = () => {
        selectSetting({close: true, first: false})
    }
    const isSettingSelected = (setting) => {
        return (setting.title === selectedSetting.title)
    }


    return (
        <>
            <MapCont
                generalSettings={generalSettings}
                spawnpointSettings={spawnpointSettings}

            />
            <SidebarPage
                setting={selectedSetting}
                closeSetting={closeSetting}
            />
            <Sidebar
                showSetting={showSetting}
                settings={availableSettings}
                isSettingSelected={isSettingSelected}
            />
            <ApplySettings />
        </>
    );
}
