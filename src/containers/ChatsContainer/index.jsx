import { useState, useEffect } from 'react'
import { getChats } from '@/services/chatsSevices'
import { useCongigAutorization } from '@/utils/configAuthorization'
import ChatItem from '@/components/ChatItem'
import './ChatsContainer.css'

const ChatsContainer = ({ messages, socket }) => {
  const [chats, setChats] = useState([])
  const { configRequest } = useCongigAutorization()

  useEffect(() => {
    (async () => {
      const data = await getChats(configRequest)
      setChats(data)
    })()

  }, [messages])

  return (
    <aside className='ChatsItems'>
      <header className='ChatsItemsContainer-header'>Header</header>
      <div className='ChatsItemsContainer'>
        {chats.map(chat => (
          <ChatItem socket={socket} key={chat.id} {...chat} />
        ))}
      </div>
    </aside>
  )
}

export default ChatsContainer