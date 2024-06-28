"use client";
import styles from "./navbarList.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function NavbarList() {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('linkedin');
        router.push("/");
    }
    return (
    <>
        <div className={styles.parent}>
            <div onClick={handleLogout} className={styles.button}>
                <Image src={"logout.svg"} width={35} height={35} alt=""/>
                <p>Logout</p>
            </div>
        </div>
    </>
    )
}