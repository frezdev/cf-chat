import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  isOpen: false
}

export const openCurrentChat = createSlice({
  name: 'openChat',
  initialState,
  reducers: {
    openChat: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
  }
})

export const { openChat } = openCurrentChat.actions
export default openCurrentChat.reducer