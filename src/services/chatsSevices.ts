import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

const getChats = async (rout: string, config: object) => {
  const res = await axios.get(`${BASE_URL}${rout}`, config)

  return res.data
}

export { getChats }