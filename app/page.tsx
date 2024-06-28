"use client";
/* eslint-disable */
import Image from "next/image";
import styles from "./page.module.css";
import Input from "@/components/Input/input.module";
import UserLoginAPI from "@/apiHelper/userApi/userLoginAPI";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Notification from "@/components/notification/notification.module";
import { Dispatch, SetStateAction } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Spinner from "@/components/spinner/spinner.module";

// function to handle notification appearence
function PopupNotificaton(
    setTriggerNotification: Dispatch<SetStateAction<boolean>>,
    type: boolean,
    router: AppRouterInstance) {

    setTriggerNotification(true);
    setTimeout(() => {
        setTriggerNotification(false);
    }, 2500);
    setTimeout(() => {
        if (type) {
            router.push("/dashboard");
        }
    }, 3000)
}


// Login Page Component
export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState<string | undefined>("");
    const [password, setPassword] = useState<string | undefined>("");
    const [resultMsg, setResultMsg] = useState<string>("");
    const [triggerNotification, setTriggerNotification] = useState<boolean>(false);
    const [notificationType, setNotificationType] = useState<boolean>(true);
    const [checking, setChecking] = useState(false);


    // Handling login mechanism
    const handleUserLogin = async () => {
        setChecking(true);
        if (!email || !password) {
            setResultMsg('incorrect email or password');
            setNotificationType(false);
            PopupNotificaton(setTriggerNotification, false, router);
            setChecking(false);
        } else {
            const result = await UserLoginAPI({email, password});
            setChecking(false);
            if (result.status == true) {
                // Saving token
                localStorage.setItem('token', result.token);
                localStorage.setItem('username', result.user.username);
                localStorage.setItem('linkedin', result.user.linkedin);
                setResultMsg(`welcome ${result.user.username}`);
                setNotificationType(true);
                PopupNotificaton(setTriggerNotification, true, router);
            } else {
                setResultMsg('incorrect email or password');
                setNotificationType(false);
                PopupNotificaton(setTriggerNotification, false, router);
                setChecking(false);
            }
        }
    }

    return (
      <div className={styles.parent}>
          <h1>To-Do List App!</h1>
          <div className={styles.login_box}>
            <h2>Login</h2>
              <div className={styles.inputs}>
                  <Input
                      type="text"
                      placeHolder="Enter your email"
                      icon="email.svg"
                      isPassword={false}
                      setValue={setEmail}
                      />
                  <Input
                      type="password"
                      placeHolder="Enter your password"
                      icon="unlock.svg"
                      isPassword={true}
                      setValue={setPassword}
                      />
              </div>
              <div style={{cursor: checking ? "default" : "pointer"}} onClick={handleUserLogin} className={styles.login_button}>
                  {checking == false ?<button disabled={checking}>Login</button> : <Spinner width={30} height={30} border={5} color="white" />}
                  <Image className={styles.login_icon} src={"login.svg"} width={25} height={25} alt=""/>
              </div>
              <p>Doesn't have an account? <span onClick={() => {router.push("/signup")}}>Signup</span></p>
          </div>
          <Notification type={notificationType} msg={resultMsg} trigger={triggerNotification} />
      </div>
    )
}
