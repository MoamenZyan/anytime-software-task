
import styles from "./tasksListButton.module.css";
import Image from "next/image";
import { RootState } from "@/redux/store";
import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { TaskFromDB } from "@/backend/interfaces/taskInterface";
import { setCurrentTasks, setLastTasks } from "@/redux/tasksSlice";



type propsTypes = {
    name: string,
    icon: string,
    active: boolean,
    setActive: Dispatch<SetStateAction<string>>,
    setActiveIcon: Dispatch<SetStateAction<string>>
    count: number
    tasks: TaskFromDB[]
}

export default function TasksListButton(props: propsTypes) {
    const dispatch = useDispatch();

    return (
        <>
            <div onClick={() => {
                props.setActive(props.name);
                props.setActiveIcon(props.icon);
                dispatch(setCurrentTasks(props.tasks));
                dispatch(setLastTasks(props.tasks));
                }} className={styles.parent} style={{backgroundColor: props.active == true ? "#7376d6" : "#454ad5"}}>
                <div>
                    <Image src={props.icon} width={30} height={30} alt=""/>
                    <button>{props.name}</button>
                </div>
                <p>{props.count}</p>
            </div>
        </>
    )
}
