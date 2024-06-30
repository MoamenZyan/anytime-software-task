import styles from "./taskUploading.module.css";
import Image from "next/image";

export default function TaskUploading() {
    return (
    <>
        <div className={styles.parent}>
            <div className={styles.center}>
                <h3>UPL<div className={styles.animation}>
                    <Image src={"circle.svg"} width={35} height={35} alt="" />
                    <Image className={styles.arrow} src={"arrow_up.svg"} width={20} height={20} alt=""/>
                    </div>ADING</h3>
            </div>
            <span className={styles.bottom}></span>
        </div>
    </>
    )
}