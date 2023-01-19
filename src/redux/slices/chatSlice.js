import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  chats: [],
  messages: [],
  userId: '',
  chatId: '',
}

export const chatSlice = createSlice({
  name: 'chatReducer',
  initialState,
  reducers: {
    chatReducer: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    }
  }
})

export const { chatReducer } = chatSlice.actions
export default chatSlice.reducer