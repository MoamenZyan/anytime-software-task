import styles from "./task.module.css";
import { TaskFromDB } from "@/backend/interfaces/taskInterface";
import { setUpdate, setUpdatedTasks } from "@/redux/tasksSlice";
import DeleteTaskAPI from "@/apiHelper/taskApi/deleteTaskAPI";
import UpdateTask from "@/apiHelper/taskApi/updateTaskAPI";
import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from 'react-redux';

type propsTypes = {
    task: TaskFromDB
    setTrigger: Dispatch<SetStateAction<boolean>>
    trigger: boolean
}

export default function Task({ task, setTrigger, trigger }: propsTypes) {
    const dispatch = useDispatch();


    const handleTaskCompletion = async () => {
        const newTask: TaskFromDB = {
            _id: task._id,
            title: task.title,
            description: task.description,
            deadline: task.deadline,
            status: "finished",
            category: task.category
         }
        const token = localStorage.getItem('token');
        if (!token) return null;
        await UpdateTask(task._id, newTask, token);
        setTrigger(!trigger);
    }

    const handleTaskDeletion = async () => {
        const token = localStorage.getItem('token');
        if (!token) return null;
        await DeleteTaskAPI(task._id, token);
        setTrigger(!trigger);
    }

    return (
    <>
        <div className={styles.parent}>
            <div className={styles.header}>
                <h3>{task.title}</h3>
                <p>{format(task.deadline, 'dd/MM/yyyy')}</p>
            </div>
            <div className={styles.content}>
                <div className={styles.description}>
                    <p>{task.description}</p>
                </div>
                <div className={styles.edit}>
                    {task.status != "finished" && <button onClick={handleTaskCompletion} className={`${styles.complete} ${styles.button}`}>Complete</button>}
                    <button onClick={() => {
                        dispatch(setUpdate(true));
                        dispatch(setUpdatedTasks(task))
                        }} className={styles.button}>Edit</button>
                    <button onClick={handleTaskDeletion} className={`${styles.delete} ${styles.button}`}>Delete</button>
                </div>
            </div>
        </div>
    </>
    )
}