import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    addTask: [],
    popupModal: false,
    doingTask: [],
}

export const configure = createSlice({
    name: 'control',
    initialState,
    reducers: {
        setAddTasks: (state, action) => {
            state.addTask = action.payload;
        },
        setPopupModal: (state, action) => {
            state.popupModal = action.payload;
        },
        setDoingTask: (state, action) => {
            state.doingTask = action.payload;
        },
    }
})

export const {setAddTasks,setPopupModal,setDoingTask} = configure.actions

export default configure.reducer
