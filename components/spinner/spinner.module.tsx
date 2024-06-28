import styles from "./spinner.module.css";

type propsTypes = {
    width: number,
    height: number,
    border: number,
    color: string
}

export default function Spinner({width, height, border, color}: propsTypes) {
    return (
        <>
            <div className={styles.spinner} style={{width: `${width}px`, height: `${height}px`, borderWidth: `${border}px`, borderTopColor: color}}></div>
        </>
    )
}