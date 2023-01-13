import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

const useCongigAutorization = () => {
  const { user } = useSelector((state: RootState) => state)

  const configRequest = {
    headers: {
      Authorization: `bearer ${user?.token}`
    }
  }

  return {
    configRequest
  }

}

export { useCongigAutorization }