import { configureStore } from '@reduxjs/toolkit'
import userLogedReducer from './slices/userLoggedSlice'
import openCurrentChat from './slices/openCurrentChat'
import chatSlice from './slices/chatSlice'

export const store = configureStore({
  reducer: {
    user: userLogedReducer,
    currentChat: openCurrentChat,
    chatState: chatSlice,
  }
})