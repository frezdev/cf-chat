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
    }
    get()
  }, [])

  return (
    <aside className='ChatsItems'>
      <header className='ChatsItemsContainer-header'>Header</header>
      <div className='ChatsItemsContainer'>
        {chats.map(chat => (
          <ChatItem key={chat.id} {...chat} />
        ))}
      </div>
    </aside>
  )
}

export default ChatsContainer