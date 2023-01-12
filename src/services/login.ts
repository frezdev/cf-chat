import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

interface Credentials {
  username: string
  password: string
}
const login =async (credentials: Credentials) => {
  const { data } = await axios.post(`${BASE_URL}/api/login`, credentials)
  return data
}

export default { login }