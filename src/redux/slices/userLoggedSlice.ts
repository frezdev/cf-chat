import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import useGetDataStorage from '@/hooks/useGetDataStorage'

interface User {
  firstname: string
  lastname: string
  username: string
  userId: string
  token: string
}

const loggedUser = useGetDataStorage('loggedCfChat')

const initialState: User | null = loggedUser

export const userLoggedSlice = createSlice({
  name: 'loged',
  initialState,
  reducers: {
    setUserLogged: (state, action: PayloadAction<any>) => {
      state = {...action.payload}
    },
  }
})

export const { setUserLogged } = userLoggedSlice.actions
export default userLoggedSlice.reducer