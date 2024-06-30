"use client";
/* eslint-disable */
import Image from "next/image";
import Notification from "@/components/notification/notification.module";
import styles from "./page.module.css";
import Input from "@/components/Input/input.module";
import CreateUserAPI from "@/apiHelper/userApi/createUserAPI";
import { IUser } from "@/server/src/users/interface/userInterface";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner/spinner.module";
import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// function to handle notification appearence
function PopupNotificaton(
    setTriggerNotification: Dispatch<SetStateAction<boolean>>,
    type: boolean,
    router: AppRouterInstance) {

    setTriggerNotification(true);
    setTimeout(() => {
        setTriggerNotification(false);
    }, 4000);
    setTimeout(() => {
        if (type) {
            router.push("/");
        }
    }, 5000)
}


// Signup Page Component
export default function SignupPage() {
    const router = useRouter();
    const [username, setUsername] = useState<string | undefined>("");
    const [email, setEmail] = useState<string | undefined>("");
    const [linkedin, setLinkedin] = useState<string | undefined>("");
    const [password, setPassword] = useState<string | undefined>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string | undefined>("");
    const [resultMsg, setResultMsg] = useState<string>("");
    const [triggerNotification, setTriggerNotification] = useState<boolean>(false);
    const [notificationType, setNotificationType] = useState<boolean>(true);
    const [checking, setChecking] = useState<boolean>(false);


    const handleCreationOfUser = async () => {
        if (password != passwordConfirmation) {
            setResultMsg("password doesn't match");
            setNotificationType(false);
            PopupNotificaton(setTriggerNotification, false, router);
            return;
        }
        if (username && password && linkedin && email) {
            const newUser: IUser = {username, password, linkedin, email};
            setChecking(true);
            const result = await CreateUserAPI(newUser);
            setChecking(false);
            if (result.status) {
                setResultMsg("horay! you are one of us :)");
                setNotificationType(true);
                PopupNotificaton(setTriggerNotification, true, router);
            } else {
                setResultMsg("oops, there is an error");
                setNotificationType(false);
                PopupNotificaton(setTriggerNotification, false, router);
            }
        } else {
            setResultMsg("oops, there is an error");
            setNotificationType(false);
            PopupNotificaton(setTriggerNotification, false, router);
        }
    }

    return (
      <div className={styles.parent}>
          <h1>To-Do List App!</h1>
          <div className={styles.login_box}>
            <h2>Signup</h2>
              <div className={styles.inputs}>
                  <Input
                      type="text"
                      placeHolder="Enter your username"
                      icon="user.svg"
                      isPassword={false}
                      setValue={setUsername}
                      />

                  <Input
                      type="text"
                      placeHolder="Enter your email"
                      icon="email.svg"
                      isPassword={false}
                      setValue={setEmail}
                      />
                  <Input
                      type="text"
                      placeHolder="Paste your linkedin url"
                      icon="linkedin.svg"
                      isPassword={false}
                      setValue={setLinkedin}
                      />

                  <Input
                      type="password"
                      placeHolder="Enter your password"
                      icon="unlock.svg"
                      isPassword={true}
                      setValue={setPassword}
                      />

                  <Input
                      type="password"
                      placeHolder="Confirm your password"
                      icon="unlock.svg"
                      isPassword={true}
                      setValue={setPasswordConfirmation}
                      />
              </div>
              <div onClick={handleCreationOfUser} className={styles.login_button}>
                    {checking == false ?<button disabled={checking}>Signup</button> : <Spinner width={30} height={30} border={5} color="white" />}
                    <Image className={styles.login_icon} src={"login.svg"} width={30} height={30} alt=""/>
              </div>
              <p>Have an account already? <span onClick={() => {router.push("/")}}>Login</span></p>
          </div>
          <Notification msg={resultMsg} type={notificationType} trigger={triggerNotification} />
      </div>
    )
}
