import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const chatsSlice = createSlice({
  name: 'chatsReducer',
  initialState,
  reducers: {
    chatsReducer: (state, action) => {
      console.log({state});
      console.log(action.payload);
      return [
        ...state,
        ...action.payload
      ]
    }
  }
})

export const { chatsReducer } = chatsSlice.actions
export default chatsSlice.reducer