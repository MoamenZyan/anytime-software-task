"use client";
import { useState } from "react";
import styles from "./input.module.css";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type propsTypes = {
    type: string,
    placeHolder: string
    icon: string,
    isPassword: boolean
    setValue: Dispatch<SetStateAction<string | undefined>>
    value?: any
}

// Global input component
export default function Input(props: propsTypes) {
    const [icon, setIcon] = useState(props.icon);
    const [type, setType] = useState(props.type);


    const handleChangingIcon = () => {
        if (!props.isPassword)
            return;
        if (icon == "lock.svg") {
            setIcon("unlock.svg");
            setType("password")
        } else {
            setIcon("lock.svg");
            setType("text")
        }
    }

    return (
        <>
            <div className={styles.input_div}>
                <input value={props.value} onChange={(e) => {props.setValue(e.target.value)}} type={type} placeholder={props.placeHolder} />
                <Image
                    onClick={handleChangingIcon}
                    style={{cursor: props.isPassword ? "pointer" : "default"}}
                    src={icon}
                    width={20}
                    height={20}
                    alt=""
                />
            </div>
        </>
    )
}
