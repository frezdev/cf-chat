import { useState, useEffect } from 'react'
import { getChats } from '@/services/chatsSevices'
import { useCongigAutorization } from '@/utils/configAuthorization'
import ChatItem from '@/components/ChatItem'
import './ChatsContainer.css'

const ChatsContainer = () => {
  const [chats, setChats] = useState<Array<any>>([])
  const { configRequest } = useCongigAutorization()

  useEffect(() => {
    const get = async () => {
      const data = await getChats('/api/chats', configRequest)
      setChats(data)
      console.log(chats)
    }
    get()
  }, [])

  return (
    <aside className='ChatsItemsContainer'>
      {chats.map(chat => (
        <ChatItem key={chat.id} {...chat} />
      ))}
    </aside>
  )
}

export default ChatsContainer