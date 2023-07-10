import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    addTask: [],
    popupModal: false,
    doingTask: [],
    active: [true],
    isLoggedIn: false
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
        setActive: (state, action) => {
            state.active = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
    }
})

export const {setAddTasks,setPopupModal,setDoingTask,setActive,setIsLoggedIn} = configure.actions

export default configure.reducer
