import type { RootState } from '@/redux/store';
import type { IUser } from '@/types';
import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
    users: IUser[];
}

const initialState: InitialState = {
    users: [
        {
            id: 'nQ52eySkltw2FCjKif6y2',
            name: 'John Doe'
        }
    ]
};

type DraftUser = Pick<IUser, 'name'>;

const createUser = (userData: DraftUser): IUser => {
    return {
        id: nanoid(),
        ...userData
    };
};

export const userSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<IUser>) => {
            const userData = createUser(action.payload);
            state.users.push(userData);
        },
        removeUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        }
    }
});

export const selectUsers = (state: RootState) => state.user.users;
export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
