import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { getChats } from '@/services/chatsSevices'

const ChatsContainer = () => {
  const { user } = useSelector((state: RootState) => state)
  const [chats, setChats] = useState<Array<any>>([])

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `bearer ${user.token}`
      }
    }
    async () => {
      const data = await getChats('/api/chats', config)
      setChats(data)
      console.log(chats)
    }
  }, [])

  return (
    <aside className='ChatsContainer'>
      {}
    </aside>
  )
}

export default ChatsContainer