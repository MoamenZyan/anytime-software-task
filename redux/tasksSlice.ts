"use client";
import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { TaskFromDB } from "@/backend/interfaces/taskInterface";


// tasks states
interface TaskState {
    tasksTrigger: boolean
    update: boolean
    updatedTask: TaskFromDB | null,
    lastTasks: TaskFromDB[],
    currentTasks: TaskFromDB[];
    allTasks: TaskFromDB[];
    finishedTasks: TaskFromDB[];
    unfinishedTasks: TaskFromDB[];
    deadlineDueTasks: TaskFromDB[];

    sportTasks: TaskFromDB[];
    shoppingTasks: TaskFromDB[];
    workTasks: TaskFromDB[];
    personalTasks: TaskFromDB[];
}

// tasks initial values
const initialState: TaskState = {
    tasksTrigger: false,
    update: false,
    updatedTask: null,
    lastTasks: [],
    currentTasks: [],
    allTasks: [],
    finishedTasks: [],
    unfinishedTasks: [],
    deadlineDueTasks: [],

    sportTasks: [],
    shoppingTasks: [],
    workTasks: [],
    personalTasks: [],
}


// tasks slices
const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasksTrigger(state, action: PayloadAction<boolean>) {
            state.update = action.payload;
        },
        setUpdate(state, action: PayloadAction<boolean>) {
            state.update = action.payload as Draft<boolean>;
        },
        setUpdatedTasks(state, action: PayloadAction<TaskFromDB>) {
            state.updatedTask = action.payload as Draft<TaskFromDB | null>;
        },
        setLastTasks(state, action: PayloadAction<TaskFromDB[]>) {
            state.lastTasks = action.payload as Draft<TaskFromDB[]>;
        },
        setCurrentTasks(state, action: PayloadAction<TaskFromDB[]>) {
            state.currentTasks = action.payload as Draft<TaskFromDB[]>;
        },
        setAllTasks(state, action: PayloadAction<TaskFromDB[]>) {
            state.allTasks = action.payload as Draft<TaskFromDB[]>;
        },
        setfinishedTasks(state, action: PayloadAction<TaskFromDB[]>) {
            state.finishedTasks = action.payload as Draft<TaskFromDB[]>;
        },
        setUnfinishedTasks(state, action: PayloadAction<TaskFromDB[]>) {
            state.unfinishedTasks = action.payload as Draft<TaskFromDB[]>;
        },
        setDeadlineDueTasks(state, action: PayloadAction<TaskFromDB[]>) {
            state.deadlineDueTasks = action.payload as Draft<TaskFromDB[]>;
        },


        setSportTasks(state, action: PayloadAction<TaskFromDB[]>) {
            state.sportTasks = action.payload as Draft<TaskFromDB[]>;
        },
        setShoppingTasks(state, action: PayloadAction<TaskFromDB[]>) {
            state.shoppingTasks = action.payload as Draft<TaskFromDB[]>;
        },
        setWorkTasks(state, action: PayloadAction<TaskFromDB[]>) {
            state.workTasks = action.payload as Draft<TaskFromDB[]>;
        },
        setPersonalTasks(state, action: PayloadAction<TaskFromDB[]>) {
            state.personalTasks = action.payload as Draft<TaskFromDB[]>;
        },
    }
})

export const {
    setTasksTrigger,
    setUpdate,
    setUpdatedTasks,
    setLastTasks,
    setCurrentTasks,
    setAllTasks,
    setfinishedTasks,
    setUnfinishedTasks,
    setDeadlineDueTasks,
    setSportTasks,
    setWorkTasks,
    setShoppingTasks,
    setPersonalTasks
} = tasksSlice.actions;

export default tasksSlice.reducer;
