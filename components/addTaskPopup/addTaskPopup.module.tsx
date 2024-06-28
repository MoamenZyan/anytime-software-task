"use client";
import styles from "./addTaskPopup.module.css";
import Input from "../Input/input.module";
import EmojiPicker from "emoji-picker-react";
import Image from "next/image";
import { Task } from "@/backend/interfaces/taskInterface";
import CreateTaskAPI from "@/apiHelper/taskApi/createTaskAPI";
import { Dispatch, SetStateAction } from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskUploading from "../taskUploading/taskUploading.module";
import { setTasksTrigger } from "@/redux/tasksSlice";

type propsType = {
    setCreateTask: Dispatch<SetStateAction<boolean>>
    popupNotification: VoidFunction
    setResultMsg: Dispatch<SetStateAction<string>>
    setType: Dispatch<SetStateAction<boolean>>
    setTrigger: Dispatch<SetStateAction<boolean>>
    trigger: boolean
}

export default function AddTaskPopup(props: propsType) {
    const dispatch = useDispatch();
    const parentRef = useRef<HTMLDivElement>(null);
    const [emojiPicker, setEmojiPicker] = useState<boolean>(false);
    const [title, setTitle] = useState<string | undefined>("");
    const [description, setDescription] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [uploading, setUploading] = useState<boolean>(false);

    const handleTaskCreation = async () => {
        const token = localStorage.getItem('token');
        if (title && description && date && category && token) {
            const newTask: Task = {title, description, deadline: new Date(date), status: "pending", category: category};
            setUploading(true);
            const result = await CreateTaskAPI(newTask, token);
            if (result != null) {
                props.setResultMsg("task created !");
                props.setType(true);
                props.setTrigger(!props.trigger);
            } else {
                props.setType(false);
                props.setResultMsg("error when creating task");
            }
            props.popupNotification();
            setUploading(false);
            props.setCreateTask(false);
        } else {
            props.setResultMsg("task info isn't correct");
            props.popupNotification();
            props.setType(false);
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (parentRef.current && !parentRef.current.contains(event.target as Node)) {
                setEmojiPicker(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
    <>
        <div ref={parentRef} className={styles.parent}>
            <h2>Create Task</h2>
            <div className={styles.title}>
                <Input
                    icon="title.svg"
                    placeHolder="enter title here..."
                    type="text"
                    isPassword={false}
                    setValue={setTitle}
                />
            </div>
            <div className={styles.description}>
                <textarea 
                    onChange={(e) => {setDescription(e.target.value)}}
                    className={styles.textarea}
                    value={description}
                    placeholder="enter task description..."
                />
                <Image onClick={() => {setEmojiPicker(!emojiPicker)}} className={styles.icon} src={"smile.svg"} width={40} height={40} alt=""/>
                {emojiPicker && <EmojiPicker
                    height={400}
                    style={{position: "absolute", top: "100px", zIndex: "100"}}
                    onEmojiClick={(emoji) => {setDescription(text => text + emoji.emoji)}}
                />}
            </div>
            <div className={styles.date_category}>
                <div className={styles.button}>
                    <input onChange={(e) => {setDate(e.target.value)}} className={styles.date} type="date" />
                </div>
                <div className={styles.button}>
                    <select name="category" onChange={(e) => {setCategory(e.target.value)}}>
                        <option value={""}>-- select category --</option>
                        <option value={"sport"}>Sport</option>
                        <option value={"shopping"}>Shopping</option>
                        <option value={"personal"}>Personal</option>
                        <option value={"work"}>Work</option>
                    </select>
                </div>
            </div>
            <div className={styles.cancel_save}>
                <button onClick={() => {props.setCreateTask(false)}} className={styles.cancel}>Cancel</button>
                <button onClick={handleTaskCreation} className={styles.save}>Save</button>
            </div>
            {uploading && <>
                <div className={styles.overlay}></div>
                <TaskUploading />
            </>}
        </div>
    </>
    )
}