import { useState, useEffect } from 'react'
import { getChats } from '@/services/chatsSevices'
import { useCongigAutorization } from '@/utils/configAuthorization'
import ChatItem from '@/components/ChatItem'
import { useDispatch, useSelector } from 'react-redux'
import { chatsReducer } from '@/redux/slices/chatsSlice'
import './ChatsContainer.css'

const ChatsContainer = ({ messages, socket }) => {
  const [chats, setChats] = useState([])
  const { configRequest } = useCongigAutorization()
  const chatsState = useSelector(state => state.chatsState)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const data = await getChats(configRequest)
      setChats(data)
      dispatch(chatsReducer(data))
      console.log(chatsState)
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