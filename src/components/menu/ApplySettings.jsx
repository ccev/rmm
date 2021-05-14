import { FaSyncAlt } from "react-icons/fa"

export default function ApplySettings() {
    const buttonClick = () => {
        console.log("apllied")
    } 
    

    return (
        <button className="sidebar-button apply">
            <FaSyncAlt className="sidebar-button-icon"/>
        </button>
    )
}