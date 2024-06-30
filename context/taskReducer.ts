import { TaskState, ActionType } from "./taskState";

export const intitalTaskState: TaskState = {
    allTasks: [],
    finishedTasks: [],
    unfinishedTasks: [],
    deadlineDueTasks: [],

    sportTasks: [],
    shoppingTasks: [],
    workTasks: [],
    personalTasks: []
}

export function taskReducer(state: TaskState, action: ActionType): TaskState {
    switch(action.type) {
        case 'SET_ALL_TASKS':
            return {...state, allTasks: action.payload};
        case 'SET_FINISHED_TASKS':
            return {...state, finishedTasks: action.payload};
        case 'SET_UNFINISHED_TASKS':
            return {...state, unfinishedTasks: action.payload};
        case 'SET_DEADLINEDUE_TASKS':
            return {...state, deadlineDueTasks: action.payload};
        case 'SET_SPORT_TASKS':
            return {...state, sportTasks: action.payload};
        case 'SET_SHOPPING_TASKS':
            return {...state, shoppingTasks: action.payload};
        case 'SET_WORK_TASKS':
            return {...state, workTasks: action.payload};
        case 'SET_PERSONAL_TASKS':
            return {...state, personalTasks: action.payload};
        default:
            return state;
    }
}
