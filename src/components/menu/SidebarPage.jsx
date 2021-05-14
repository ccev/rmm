import { FaCaretLeft } from "react-icons/fa"

function SidebarPageHeader({ title, closeSetting }) {
    return (
        <div className="sidebar-page-header">
            <div className="sidebar-page-header-box title">{title}</div>
            <div className="sidebar-page-header-box back" onClick={closeSetting}>
                <FaCaretLeft style={{width: 25, height: 25}}/>
            </div> 
        </div>
    )
}

function SidebarOption({ option }) {
    return (
        <div className="sidebar-page-option">
            {option.title}
            {option.modal}
        </div>
    )
}

export default function SidebarPage({ setting, closeSetting }) {
    let style = {}

    if (setting) {
        style = {
            animationName: "sidebar-page-fade-in",
            animationDuration: "200ms",
        }
    } else {
        style = {
            animationName: "sidebar-page-fade-out",
            animationDuration: "500ms",
            left: "-1000px"
        }
    }

    return (
        <div className="sidebar-page" style={style}>
            <SidebarPageHeader title={setting.title} closeSetting={closeSetting}/>
            <div className="sidebar-page-content">
                {setting && setting.options.map((option) => (
                    <SidebarOption key={option.title} option={option}/>
                ))}
            </div>
        </div>
    )
}