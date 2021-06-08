import { FaAngleLeft } from "react-icons/fa"
import { useState } from "react"

function SidebarPageHeader({ title, closeSetting }) {
    return (
        <div className="sidebar-page-header" onClick={closeSetting}>
            <div className="sidebar-page-header-box title">{title}</div>
            <div className="sidebar-page-header-box back">
                <FaAngleLeft style={{width: 25, height: 25}}/>
            </div> 
        </div>
    )
}

function SidebarOption({ option }) {
    return (
        <div className="sidebar-page-option">
            <span className="sidebar-page-option-text">{option.title}</span>
            {option.modal}
        </div>
    )
}

export default function SidebarPage({ setting, closeSetting }) {
    
    let style = {}

    if (setting.close) {
        if (setting.first) {
            style = {
                left: "-1000px"
            }
        } else {
            style = {
                animationName: "sidebar-page-fade-out",
                animationDuration: "500ms",
                left: "-1000px"
            }
        }
        
    } else {
        style = {
            animationName: "sidebar-page-fade-in",
            animationDuration: "200ms",
        }
    }

    return (
        <div className="sidebar-page" style={style}>
            <SidebarPageHeader title={setting.title} closeSetting={closeSetting}/>
            <div className="sidebar-page-content">
                {!setting.close && setting.options.map((option) => (
                    <SidebarOption key={option.title} option={option}/>
                ))}
            </div>
        </div>
    )
}