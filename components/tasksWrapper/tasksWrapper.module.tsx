import styles from "./tasksWrapper.module.css";
import Task from "../task/task.module";
import { TaskFromDB } from "@/backend/interfaces/taskInterface";
import { Dispatch, SetStateAction } from "react";

type propsTypes = {
    tasks: TaskFromDB[]
    setTrigger: Dispatch<SetStateAction<boolean>>
    trigger: boolean
}

export default function TasksWrapper({ tasks, setTrigger, trigger }: propsTypes) {
    return (
    <>
        <div className={styles.parent}>
            {tasks.length > 0 && <div className={styles.wrapper}>
                {tasks.map((task) => (
                    <Task setTrigger={setTrigger} trigger={trigger} task={task} key={""} />
                ))}
            </div>}
            {tasks.length == 0 && <p className={styles.no_tasks}>There is no tasks yet.</p>}
        </div>
    </>
    )
}