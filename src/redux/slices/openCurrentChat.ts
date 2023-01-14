import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Chat {
  id: string,
  isOpen: boolean
}

const initialState: Chat = {
  id: '',
  isOpen: false
}

export const openCurrentChat = createSlice({
  name: 'openChat',
  initialState,
  reducers: {
    openChat: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        ...action.payload
      }
    },
  }
})

export const { openChat } = openCurrentChat.actions
export default openCurrentChat.reducer