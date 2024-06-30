"use client";
/* eslint-disable */
import { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styles from "./page.module.css";
import Image from "next/image";
import { ITaskFromDB } from "@/server/src/tasks/interface/taskInterface";
import GetAllTasksAPI from "@/apiHelper/taskApi/getAllTasksAPI";
import TasksListButton from "@/components/tasksListButtons/tasksListButton.module";
import TasksWrapper from "@/components/tasksWrapper/tasksWrapper.module";
import AddTaskPopup from "@/components/addTaskPopup/addTaskPopup.module";
import UpdateTaskPopup from "@/components/updateTaskPopup/updateTaskPopup.module";
import { Dispatch, SetStateAction } from "react";
import Notification from "@/components/notification/notification.module";
import { RootState } from "@/redux/store";
import NavbarList from "@/components/navbarList/navbarList.module";
import Header from "@/components/header/header.module";
import { useRouter } from "next/navigation";
import { setLastTasks,
        setCurrentTasks,
        setAllTasks,
        setDeadlineDueTasks,
        setPersonalTasks,
        setShoppingTasks,
        setSportTasks,
        setUnfinishedTasks,
        setWorkTasks,
        setfinishedTasks } from "@/redux/tasksSlice";

// function to handle notification appearence
function PopupNotificaton(
    setTriggerNotification: Dispatch<SetStateAction<boolean>>) {

    setTriggerNotification(true);
    setTimeout(() => {
        setTriggerNotification(false);
    }, 4000);
}

// Dashboard page (homepage)
export default function DashboardPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks);
    const { updatedTask, update, tasksTrigger } = tasks;
    const [username, setUsername] = useState<string>("");
    const [active, setActive] = useState<string>("All Tasks");
    const [activeIcon, setActiveIcon] = useState<string>("task.svg");
    const [createTask, setCreateTask] = useState<boolean>(false);
    const [resultMsg, setResultMsg] = useState<string>("");
    const [triggerNotification, setTriggerNotification] = useState<boolean>(false);
    const [notificationType, setNotificationType] = useState<boolean>(true);
    const [fullInfo, setFullInfo] = useState<boolean>(false);
    const [searchedTasks, setSearchedTasks] = useState<ITaskFromDB[]>([]);
    const [search, setSearch] = useState<string>("");
    const [trigger, setTrigger] = useState<boolean>(false);
    const [navbar, setNavbar] = useState<boolean>(false);


    // function to calculate tasks count for every category
    const categorization = (tasks: ITaskFromDB[]) => {
        let finished: ITaskFromDB[] = [];
        let unfinished: ITaskFromDB[] = [];
        let deadline: ITaskFromDB[] = [];

        let sport: ITaskFromDB[] = [];
        let shopping: ITaskFromDB[] = [];
        let work: ITaskFromDB[] = [];
        let personal: ITaskFromDB[] = [];

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].status === "pending") {
                unfinished.push(tasks[i]);
            } else if (tasks[i].status === "finished") {
                finished.push(tasks[i]);
            } 

            switch(tasks[i].category) {
                case 'sport':
                    sport.push(tasks[i]);
                    break;
                case 'shopping':
                    shopping.push(tasks[i]);
                    break;
                case 'work':
                    work.push(tasks[i]);
                    break;
                case 'personal':
                    personal.push(tasks[i]);
                    break;
            }
        }

        dispatch(setfinishedTasks(finished));
        dispatch(setUnfinishedTasks(unfinished));
        dispatch(setDeadlineDueTasks(deadline));

        dispatch(setSportTasks(sport));
        dispatch(setShoppingTasks(shopping));
        dispatch(setWorkTasks(work));
        dispatch(setPersonalTasks(personal));
    }

    // function to handle search Mechanism
    const handleSearchMechanism = (search: string) => {
        if (search.length > 0) {
            const current = tasks.currentTasks;
            let arr: ITaskFromDB[] = current.filter((task) => task.title.toLowerCase().includes(search.toLowerCase()));
            setSearchedTasks(arr);
        } else {
            dispatch(setCurrentTasks(tasks.lastTasks));
        }
    }

    useEffect(() => {
        const userName = localStorage.getItem('username');
        if (userName) {
            setUsername(userName + " !");
        } else {
            router.push("/");
        }
        const getTasks = async () => {
            const token = localStorage.getItem('token');
            if (token != null) {
                const result = await GetAllTasksAPI(token);
                console.log(result);
                if (result.tasks != null) {
                    dispatch(setAllTasks(result.tasks));
                    dispatch(setCurrentTasks(result.tasks));
                    dispatch(setLastTasks(result.tasks));
                    categorization(result.tasks);
                    setFullInfo(true);
                } else {
                    router.push("/");
                }
            } else {
                router.push("/");
            }
        }
        getTasks();
    }, [trigger]);

    if (!fullInfo) {
        return(<></>);
    }

    return (
    <>
        <div className={styles.parent}>
            <Header setNavbar={setNavbar} navbar={navbar} username={username}/>
            <div className={styles.container}>
                <div className={styles.center}>
                    <div className={styles.tasks_div}>
                        <div className={styles.left}>
                            <h3>Tasks</h3>
                            <TasksListButton tasks={tasks.allTasks} count={tasks.allTasks.length} setActiveIcon={setActiveIcon} setActive={setActive} active={active == "All Tasks"} name="All Tasks" icon="task.svg" />
                            <TasksListButton tasks={tasks.finishedTasks} count={tasks.finishedTasks.length} setActiveIcon={setActiveIcon} setActive={setActive} active={active == "Finished Tasks"} name="Finished Tasks" icon="done.svg" />
                            <TasksListButton tasks={tasks.unfinishedTasks} count={tasks.unfinishedTasks.length} setActiveIcon={setActiveIcon} setActive={setActive} active={active == "Unfinished Tasks"} name="Unfinished Tasks" icon="unfinished.svg" />
                            <TasksListButton tasks={tasks.deadlineDueTasks} count={tasks.deadlineDueTasks.length} setActiveIcon={setActiveIcon} setActive={setActive} active={active == "Deadline Overdue"} name="Deadline Overdue" icon="missed.svg" />
                            <h3>Categories</h3>
                            <TasksListButton tasks={tasks.sportTasks} count={tasks.sportTasks.length} setActiveIcon={setActiveIcon} setActive={setActive} active={active == "Sport"} name="Sport" icon="sport.svg" />
                            <TasksListButton tasks={tasks.shoppingTasks} count={tasks.shoppingTasks.length} setActiveIcon={setActiveIcon} setActive={setActive} active={active == "Shopping"} name="Shopping" icon="shopping.svg" />
                            <TasksListButton tasks={tasks.workTasks} count={tasks.workTasks.length} setActiveIcon={setActiveIcon} setActive={setActive} active={active == "Work"} name="Work" icon="work.svg" />
                            <TasksListButton tasks={tasks.personalTasks} count={tasks.personalTasks.length} setActiveIcon={setActiveIcon} setActive={setActive} active={active == "Personal"} name="Personal" icon="user_white.svg" />
                        </div>
                        <div className={styles.right}>
                            <div className={styles.right_header}>
                                <div className={styles.title}>
                                    <Image className={styles.icon} src={activeIcon} width={50} height={50} alt="" />
                                    <h3>{active}</h3>
                                </div>
                                <div className={styles.search}>
                                    <input onChange={(e) => {
                                        setSearch(e.target.value);
                                        handleSearchMechanism(e.target.value);
                                        }} placeholder="search for tasks" />
                                    <Image className={styles.icon} src={"search.svg"} width={45} height={45} alt="" />
                                </div>
                            </div>
                            <TasksWrapper setTrigger={setTrigger} trigger={trigger} tasks={search.length > 0 ? searchedTasks : tasks.currentTasks} />
                            <div onClick={() => {setCreateTask(true)}} className={styles.add}>
                                <Image src={"add.svg"} width={30} height={30} alt=""/>
                                <button>Add Task</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {createTask && <>
                <div className={styles.overlay}></div>
                <AddTaskPopup
                    setTrigger={setTrigger}
                    trigger={trigger}
                    setType={setNotificationType}
                    setResultMsg={setResultMsg}
                    popupNotification={() => {PopupNotificaton(setTriggerNotification)}}
                    setCreateTask={setCreateTask} />
            </>}

            {update && <>
                <div className={styles.overlay}></div>
                <UpdateTaskPopup
                    setTrigger={setTrigger}
                    trigger={trigger}
                    task={updatedTask}
                    setType={setNotificationType}
                    setResultMsg={setResultMsg}
                    popupNotification={() => {PopupNotificaton(setTriggerNotification)}}
                    />
                    
            </>}
            <Notification type={notificationType} msg={resultMsg} trigger={triggerNotification} />
            {navbar && <NavbarList />}
        </div>
    </>
    );
}
