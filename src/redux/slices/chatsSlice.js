import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  chats: [],
}

export const chatsSlice = createSlice({
  name: 'chatsReducer',
  initialState,
  reducers: {
    chatsReducer: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    }
  }
})

export const { chatsReducer, updateOneChat } = chatsSlice.actions
export default chatsSlice.reducer