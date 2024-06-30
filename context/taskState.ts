import { TaskFromDB } from "@/backend/interfaces/taskInterface";

export interface TaskState {
    allTasks: TaskFromDB[];
    finishedTasks: TaskFromDB[];
    unfinishedTasks: TaskFromDB[];
    deadlineDueTasks: TaskFromDB[];

    sportTasks: TaskFromDB[];
    shoppingTasks: TaskFromDB[];
    workTasks: TaskFromDB[];
    personalTasks: TaskFromDB[];
}


export type ActionType =
    | {type: 'SET_ALL_TASKS', payload: TaskFromDB[]}
    | {type: 'SET_FINISHED_TASKS', payload: TaskFromDB[]}
    | {type: 'SET_UNFINISHED_TASKS', payload: TaskFromDB[]}
    | {type: 'SET_DEADLINEDUE_TASKS', payload: TaskFromDB[]}
    | {type: 'SET_SPORT_TASKS', payload: TaskFromDB[]}
    | {type: 'SET_SHOPPING_TASKS', payload: TaskFromDB[]}
    | {type: 'SET_WORK_TASKS', payload: TaskFromDB[]}
    | {type: 'SET_PERSONAL_TASKS', payload: TaskFromDB[]}
