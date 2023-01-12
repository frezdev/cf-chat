import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import useGetDataStorage from '@/hooks/useGetDataStorage'

const loggedUser = useGetDataStorage('loggedCfChat')
const initialState: any = loggedUser

export const userLoggedSlice = createSlice({
  name: 'loged',
  initialState,
  reducers: {
    setUserLogged: (state, action: PayloadAction<any>) => {
      state = {...action.payload}
      return state
    }
  }
})

export const { setUserLogged } = userLoggedSlice.actions
export default userLoggedSlice.reducer