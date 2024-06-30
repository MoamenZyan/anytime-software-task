"use client";
import styles from "./page.module.css";
import Header from "@/components/header/header.module";
import NavbarList from "@/components/navbarList/navbarList.module";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const [navbar, setNavbar] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [linkedin, setLinkedin] = useState<string>("");
    const [photo, setPhoto] = useState<string>("");
    const [headline, setHeadline] = useState<string>("");
    const [location, setLocation] = useState<string>("");

    useEffect(() => {
        setEmail(localStorage.getItem('email'));
        setPhoto(localStorage.getItem('linkedinPhoto'));
        setUsername(localStorage.getItem('linkedinName'));
        setLinkedin(localStorage.getItem('linkedin'));
        setHeadline(localStorage.getItem('linkedinHeadline'));
        setLocation(localStorage.getItem('linkedinLocation'));
    }, []);
    return(
    <>
        <div className={styles.parent}>
            <Header setNavbar={setNavbar} navbar={navbar} username={username} />
            <h3>User Information</h3>
            <div className={styles.center}>
                <div className={styles.left}>
                    {photo == null ? <Image className={styles.profile_photo} src={"user_profile.svg"} width={200} height={200} alt=""/> :
                    <img className={styles.profile_photo} src={photo}/>
                    }
                    <h3>Profile Photo</h3>
                </div>
                <div className={styles.right}>
                    <div className={styles.info}>
                        <Image src={"user.svg"} width={40} height={40} alt=""/>
                        <p>{username}</p>
                    </div>
                    <div className={styles.info}>
                        <Image src={"title.svg"} width={40} height={40} alt=""/>
                        <p>{headline}</p>
                    </div>
                    <div className={styles.info}>
                        <Image src={"location.svg"} width={40} height={40} alt=""/>
                        <p>{location}</p>
                    </div>
                    <div className={styles.info}>
                        <Image src={"linkedin.svg"} width={40} height={40} alt=""/>
                        <p>{linkedin}</p>
                    </div>
                </div>
            </div>
            {navbar && <NavbarList />}
        </div>
    </>)
}