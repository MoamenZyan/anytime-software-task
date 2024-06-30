import styles from "./header.module.css";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type PropsTypes = {
    username: string
    setNavbar: Dispatch<SetStateAction<boolean>>
    navbar: boolean
}

export default function Header(props: PropsTypes) {
    return (
    <>
        <div className={styles.header}>
            <div
                style={{display: "flex",
                justifyContent:"space-between",
                alignItems: "center",
                width: "90%",
                margin: "0 auto"
                }}>
                <div className={styles.welcome}>
                    <h1>Welcome {props.username}</h1>
                </div>
                <div onClick={() => {props.setNavbar(!props.navbar)}} className={styles.navbar}>
                    <Image src={"3-lines.svg"} width={40} height={40} alt=""/>
                </div>
            </div>
        </div>
    </>
    )
}