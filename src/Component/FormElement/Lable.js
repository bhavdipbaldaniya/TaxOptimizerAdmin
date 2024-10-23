import Style from "./form.module.css"

export const Label = (props) => {
    return <label className={`${Style.label} ${props.className}`} htmlFor={props.for} onDrop={props.onDrop} onDragOver={props.onDragOver}>{props.children}</label>;
}