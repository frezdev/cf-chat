import { configureStore } from '@reduxjs/toolkit'
import userLogedReducer from './slices/userLoggedSlice'
import openCurrentChat from './slices/openCurrentChat'

export const store = configureStore({
  reducer: {
    user: userLogedReducer,
    currentChat: openCurrentChat
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch