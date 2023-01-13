import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

interface Credentials {
  username: string
  password: string
}
const login = async (credentials: Credentials) => {

  try {
    const { data } = await axios.post(`${BASE_URL}/api/login`, credentials)
    window.location.reload()
    return data
  } catch (error) {
    console.error('ERROOOORRRR',error)
    return null
  }

}

export default { login }