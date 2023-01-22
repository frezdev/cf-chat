import { useState, useEffect } from 'react'
import { getChats } from '@/services/chatsSevices'
import { useCongigAutorization } from '@/utils/configAuthorization'
import ChatItem from '@/components/ChatItem'
import { useDispatch, useSelector } from 'react-redux'
import { chatsReducer } from '@/redux/slices/chatsSlice'
import './ChatsContainer.css'

const ChatsContainer = ({ socket }) => {
  const { configRequest } = useCongigAutorization()
  const { chats } = useSelector(state => state.chatsState)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const data = await getChats(configRequest)
      dispatch(chatsReducer({chats: data}))
    })()

  }, [])

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