import { TileLayer, MapContainer } from 'react-leaflet'
import { useState } from "react"
import Sidebar from "./menu/Sidebar"
import SidebarPage from "./menu/SidebarPage"
import { FaCog, FaDrawPolygon, FaMapMarker, FaRoute,
    FaSortAmountUpAlt, FaGlobe, FaBullseye,
    FaBorderAll } from "react-icons/fa"
import "./index.css"
import Select from 'react-select'
import { GetS2CellsMove } from "./map/S2cells"
import ApplySettings from "./menu/ApplySettings"

function SelectModal(options, onChange, defaultOption, isMulti=false) {
    return (
        <Select
            className="sidebar-page-option-select"
            isMulti={isMulti}
            defaultValue={defaultOption}
            options={options}
            isSearchable={false}
            onChange={onChange}
        />
    )
}

export default function MapCont() {
    const [s2Levels, setS2Levels] = useState([])
    const [s2Lines, setS2Lines] = useState([])

    const tiles = [
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
            attribution: "&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        },
        {
            key: "Nothing",
            attribution: "",
            url: ""
        }
    ]

    const [selectedTiles, selectTile] = useState(tiles[0])

    const selectTileModal = (r) => {
        selectTile(r.value)
    }

    const selectS2LevelModal = (r) => {
        setS2Levels(r.map(o => o.value))
    }


    const Settings = [
        {
            title: "Points",
            icon: FaMapMarker,
            options: [

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
            icon: FaBullseye,
            options: [
    
            ]
        },
        {
            title: "Prio Routes",
            icon: FaSortAmountUpAlt,
            options: [

            ]
        },
        {
            title: "Geofences",
            icon: FaDrawPolygon,
            options: [
    
            ]
        },
        {
            title: "Areas",
            icon: FaGlobe,
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
                        s2Levels.map(level => ({value: level, label: "Level "+level.toString()})),
                        true
                    )
                },
                {
                    title: "Map Tiles",
                    modal: SelectModal(
                        tiles.map((tile) => ({value: tile, label: tile.key})),
                        selectTileModal,
                        {value: selectedTiles, label: selectedTiles.key}
                    )
                }
            ]
        }
    ]


    const [selectedSetting, selectSetting] = useState(false)
    const showSetting = (setting) => {
        if (isSettingSelected(setting)) {
            closeSetting()
        } else {
            selectSetting(setting)
        }
    }
    const closeSetting = () => {
        selectSetting(false)
    }
    const isSettingSelected = (setting) => {
        return (setting.title === selectedSetting.title)
    }

    



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
                    key={selectedTiles.key}
                    attribution={selectedTiles.attr}
                    url={selectedTiles.url}
                />
                <GetS2CellsMove levels={s2Levels} setS2Lines={setS2Lines} s2Lines={s2Lines}/>
            </MapContainer>
            <SidebarPage setting={selectedSetting} closeSetting={closeSetting} />
            <Sidebar showSetting={showSetting} settings={Settings} isSettingSelected={isSettingSelected}/>
            <ApplySettings />
        </>
    )
}