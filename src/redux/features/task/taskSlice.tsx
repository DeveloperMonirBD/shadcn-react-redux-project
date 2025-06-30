import type { RootState } from '@/redux/store';
import type { ITask } from '@/types';
import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import { removeUser } from '../user/userSlice';
// import { v4 as uuidv4 } from 'uuid';

export interface InitialState {
    tasks: ITask[];
    filter: 'all' | 'high' | 'medium' | 'low';
}

const initialState: InitialState = {
    tasks: [
        {
            id: 'nQ52eySkltw2FCjKif6y2',
            isCompleted: false,
            title: 'dfafa gagag',
            description: 'fgaga gatgaer atgaga gagtagag gagaga g',
            priority: 'medium',
            dueDate: '2025-06-29T18:00:00.000Z',
            assignTo: null
        }
    ],
    filter: 'all'
};

type DraftTask = Pick<ITask, 'title' | 'description' | 'priority' | 'dueDate' | 'assignTo'>;
const createTask = (taskData: DraftTask): ITask => {
    return {
        ...taskData,
        id: nanoid(),
        isCompleted: false,
        assignTo: taskData.assignTo ? taskData.assignTo : null,
    };
};

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<DraftTask>) => {
            // const id = uuidv4();
            // const taskData = {
            //     ...action.payload,
            //     id,
            //     isCompleted : false
            // }

            const taskData = createTask(action.payload);
            state.tasks.push(taskData);
        },

        toggleCompleteState: (state, action: PayloadAction<string>) => {
            console.log(action);
            state.tasks.forEach(task => (task.id === action.payload ? (task.isCompleted = !task.isCompleted) : task));
        },

        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },

        updateFilter: (state, action: PayloadAction<'high' | 'medium' | 'low' | 'all'>) => {
            state.filter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(removeUser, (state, action) => { 
            state.tasks.forEach(task => task.assignTo === action.payload ? task.assignTo = null : task);
        })
    }
});

export const selectTasks = (state: RootState) => {

    // filter by priority
    const filter = state.todo.filter;

    if (filter === "low") {
        return state.todo.tasks.filter((task) => task.priority === "low");
    } else if (filter === "medium") {
        return state.todo.tasks.filter((task) => task.priority === "medium");
    } else if (filter === "high") {
        return state.todo.tasks.filter((task) => task.priority === "high");
    } else {
        return state.todo.tasks;
    }
};



export const selectFilter = (state: RootState) => {
    return state.todo.filter;
};

export const { addTask, toggleCompleteState, deleteTask, updateFilter } = taskSlice.actions;

export default taskSlice.reducer;
