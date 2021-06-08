import { useState } from "react"
import Select from 'react-select'


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

function SwitchModal({onToggle, defaultPosition}) {
    const [isToggled, setToggled] = useState(defaultPosition)

    const switchClick = () => {
        setToggled(!isToggled)
        onToggle(!isToggled)
    }

    const dotClassName = "sidebar-page-option-switch-dot"
    let style = {}
    if (!isToggled) {
        style = {
            animationName: "switch-off",
            animationDuration: "200ms"
        }
    } else {
        style = {
            animationName: "switch-on",
            animationDuration: "200ms"
        }
    }

    return (
        <div className="sidebar-page-option-switch" onClick={switchClick}>
            <div
                className={isToggled ? dotClassName + " active" : dotClassName}
                style={style}>
            </div>
        </div>
    )
}

export {SelectModal, SwitchModal}