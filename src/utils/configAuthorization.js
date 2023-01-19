import { useSelector } from 'react-redux'

const useCongigAutorization = () => {
  const { user } = useSelector((state) => state)

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