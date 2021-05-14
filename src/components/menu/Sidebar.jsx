import "../index.css"

function SidebarButton({ setting, clickEvent, isSelected }) {
    let className = "sidebar-button"
    if (isSelected) {
        className += " selected"
    } 

    return (
        <button className={className} onClick={() => clickEvent(setting)}>
            {<setting.icon className="sidebar-button-icon"/>}
        </button>
    )
}


export default function Sidebar({ showSetting, settings, isSettingSelected }) {
    const buttonClick = (setting) => {
        showSetting(setting)
    } 
    

    return (
        <div className="sidebar">
            {settings.map((setting) => (
                <SidebarButton
                    key={setting.title}
                    setting={setting}
                    clickEvent={buttonClick}
                    isSelected={isSettingSelected(setting)}
                />
            ))}
        </div>
    )
}
