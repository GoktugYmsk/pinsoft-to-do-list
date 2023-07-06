import { configureStore } from '@reduxjs/toolkit'
import configure from '../compoents/configure'

export const store = configureStore({
    reducer: {
        addTodo: configure,
        modal: configure,
        doing:configure,
        darkActive: configure,
    },
})