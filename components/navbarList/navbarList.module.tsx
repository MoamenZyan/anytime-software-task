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
            <div onClick={() => {router.push("/profile")}} className={styles.button}>
                <Image src={"user.svg"} width={35} height={35} alt=""/>
                <p>Profile</p>
            </div>
            <div onClick={() => {router.push("/dashboard")}} className={styles.button}>
                <Image src={"dashboard.svg"} width={35} height={35} alt=""/>
                <p>Dashboard</p>
            </div>
            <div onClick={handleLogout} className={styles.button}>
                <Image src={"logout.svg"} width={35} height={35} alt=""/>
                <p>Logout</p>
            </div>
        </div>
    </>
    )
}