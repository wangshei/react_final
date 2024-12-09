import './index.css';
import { Link } from "react-router-dom";

export default function Button(props) {

    const text = props.text 
    const bgcolor = props.bgcolor || "bg-tomato"
    const tcolor = props.tcolor || "bg-paper_white"
    const size = props.size || "text-nav"
    const link = props.link
    const paddingy = props.paddingy || "py-2"
    const paddingx = props.paddingx || "px-8"
    const type = props.type
    const onClick = props.onClick

    return link ? (
        <Link
            to={link}
            className={`${tcolor} ${bgcolor} ${size} ${paddingy} ${paddingx} rounded-[40px]`}
        >
            {text}
        </Link>
    ) : (
        <button
            type={type} // Allows "submit" for form submission
            className={`${tcolor} ${bgcolor} ${size} ${paddingy} ${paddingx} rounded-[40px] w-[160px]`}
            onClick={onClick}
        >
            {text}
        </button>
    );
    
}