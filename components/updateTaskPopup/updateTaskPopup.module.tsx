"use client";
import styles from "./updateTaskPopup.module.css";
import Input from "../Input/input.module";
import EmojiPicker from "emoji-picker-react";
import Image from "next/image";
import { TaskFromDB } from "@/backend/interfaces/taskInterface";
import UpdateTask from "@/apiHelper/taskApi/updateTaskAPI";
import { Dispatch, SetStateAction } from "react";
import { useState, useEffect, useRef } from "react";
import TaskUploading from "../taskUploading/taskUploading.module";
import { setTasksTrigger, setUpdate } from "@/redux/tasksSlice";
import { useDispatch, useSelector } from 'react-redux';

type propsType = {
    popupNotification: VoidFunction
    setResultMsg: Dispatch<SetStateAction<string>>
    setType: Dispatch<SetStateAction<boolean>>
    task: TaskFromDB | null
    setTrigger: Dispatch<SetStateAction<boolean>>
    trigger: boolean
}

export default function UpdateTaskPopup(props: propsType) {
    const dispatch = useDispatch();
    const initialDate = props.task?.deadline ? new Date(props.task.deadline).toISOString().split('T')[0] : '';
    const parentRef = useRef<HTMLDivElement>(null);
    const [emojiPicker, setEmojiPicker] = useState<boolean>(false);
    const [title, setTitle] = useState<string | undefined>(props.task?.title);
    const [description, setDescription] = useState<string | undefined>(props.task?.description);
    const [category, setCategory] = useState<string | undefined>(props.task?.category);
    const [date, setDate] = useState<string | undefined>(initialDate);
    const [uploading, setUploading] = useState<boolean>(false);

    const handleTaskUpdate = async () => {
        const token = localStorage.getItem('token');
        if (title && description && date && category && token) {
            if (!props.task || !props.task._id) {
                return;
            }
            const newTask: TaskFromDB = {_id: props.task._id, title, description, deadline: new Date(date), status: "pending", category: category};
            setUploading(true);
            const result = await UpdateTask(props.task._id, newTask, token);
            if (result != null) {
                props.setResultMsg("task updated !");
                props.setType(true);
                props.setTrigger(!props.trigger);
            } else {
                props.setType(false);
                props.setResultMsg("error when updating task");
            }
            props.popupNotification();
            setUploading(false);
            dispatch(setUpdate(false));
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
            <h2>Update Task</h2>
            <div className={styles.title}>
                <Input
                    icon="title.svg"
                    placeHolder="enter title here..."
                    type="text"
                    isPassword={false}
                    setValue={setTitle}
                    value={title}
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
                    <input value={date} onChange={(e) => {setDate(e.target.value)}} className={styles.date} type="date" />
                </div>
                <div className={styles.button}>
                    <select value={category} name="category" onChange={(e) => {setCategory(e.target.value)}}>
                        <option value={""}>-- select category --</option>
                        <option value={"sport"}>Sport</option>
                        <option value={"shopping"}>Shopping</option>
                        <option value={"personal"}>Personal</option>
                        <option value={"work"}>Work</option>
                    </select>
                </div>
            </div>
            <div className={styles.cancel_save}>
                <button onClick={() => {dispatch(setUpdate(false));}} className={styles.cancel}>Cancel</button>
                <button onClick={handleTaskUpdate} className={styles.save}>Save</button>
            </div>
            {uploading && <>
                <div className={styles.overlay}></div>
                <TaskUploading />
            </>}
        </div>
    </>
    )
}