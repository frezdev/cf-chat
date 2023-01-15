import socketClient from 'socket.io-client'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

const getChats = async (config: object) => {
  const res = await axios.get(`${BASE_URL}/api/chats`, config)

  return res.data
}

const getMessages = async (chatId: string, config: object) => {
  const res = await axios.get(`${BASE_URL}/api/messages/${chatId}`, config)

  return res.data
}

const getMessagesSocket = (chatId: string) => {
  const io = socketClient(BASE_URL, { query: { chatId }})

  io.on('connection', () => {
    io.emit('getMessages', chatId)

    io.on('getMessages', data => {
      console.log('MENSAJESSS', data)
    })
  })
}
export { getChats, getMessages, getMessagesSocket }