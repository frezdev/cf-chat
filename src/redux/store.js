import { configureStore } from '@reduxjs/toolkit'
import userLogedReducer from './slices/userLoggedSlice'
import openCurrentChat from './slices/openCurrentChat'
import chatsSlice from './slices/chatsSlice'

export const store = configureStore({
  reducer: {
    user: userLogedReducer,
    currentChat: openCurrentChat,
    chatsState: chatsSlice,
  }
})