"use client"
import styles from "./notification.module.css";
import Image from "next/image";

type propsTypes = {
    type: boolean,
    msg: string,
    trigger: boolean
}

export default function Notification(props: propsTypes) {
    return (
    <>
        <div className={`${styles.parent} ${props.trigger == true && styles.animation}`}>
            <Image  src={props.type == false ? "error.svg" : "check.svg"} width={30} height={30} alt=""/>
            <p>{props.msg}</p>
            <div className={styles.bottom_border}></div>
        </div>
    </>
    )
}