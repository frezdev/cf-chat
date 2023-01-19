import { createSlice } from '@reduxjs/toolkit'
import useGetDataStorage from '@/hooks/useGetDataStorage'

const loggedUser = useGetDataStorage('loggedCfChat')

const initialState = loggedUser

export const userLoggedSlice = createSlice({
  name: 'loged',
  initialState,
  reducers: {
    setUserLogged: (state, action) => {
      state = {...action.payload}
    },
  }
})

export const { setUserLogged } = userLoggedSlice.actions
export default userLoggedSlice.reducer