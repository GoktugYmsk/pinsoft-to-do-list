import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    addTask: [],
}

export const configure = createSlice({
    name: 'control',
    initialState,
    reducers: {
        setAddTasks: (state, action) => {
            state.addTask = action.payload;
        },
    }
})

export const {setAddTasks} = configure.actions

export default configure.reducer
