import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

const getChats = async (config) => {
  const res = await axios.get(`${BASE_URL}/api/chats`, config)

  return res.data
}

const getMessages = async (chatId, config) => {
  const res = await axios.get(`${BASE_URL}/api/messages/${chatId}`, config)

  return res.data
}

export { getChats, getMessages }