import { configureStore } from '@reduxjs/toolkit'
import userLogedReducer from './slices/userLoggedSlice'

export const store = configureStore({
  reducer: {
    user: userLogedReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch