import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openChat } from '@/redux/slices/openCurrentChat'
import notPhoto from '@/assets/not-profile-photo.jpg'
import './ChatItem.css'


const initialState = {
  firstname: '',
  lastname: '',
  username: '',
  profilePicture: '',
  id: ''
}

const ChatItem = ({ members, id, socket}) => {
  const [currentMember, setCurrentMember] = useState(initialState)
  const userId = useSelector((state) => state.user.userId)
  const { chats } = useSelector(state => state.chatsState)
  const [lastMessage, setLastMessage] = useState({})
  const dispatch = useDispatch()

  useState(() => {
    const thisChat = chats.find(chat => chat.id === id)
    const oldLastMessage = thisChat.messages.at(-1)

    setLastMessage(oldLastMessage)
  }, [])

  useEffect(() => {
    const current = members.find(member => member.id !== userId)
    setCurrentMember(prev => ({...prev, ...current}))

    socket.on('lastMessage', message => {
      if (message.chatId === id) setLastMessage(message)
    })
  }, [socket])

  const handleOpenChat = () => {
    dispatch(openChat({
      isOpen: true,
      id: id,
      receiverId: currentMember.id
    }))
  }

  return (
    <article className='ChatItem' onClick={handleOpenChat}>
      <div className='ChatItemContainer'>
        <picture className='ChatItemProfilePhoto'>
          <img
            src={currentMember.profilePicture || notPhoto}
            alt={`Foto de perfil de ${currentMember.username}`}
          />
        </picture>

        <section className='ChatItemPreview'>
          <div className='ChatItemPreview-left'>
            <div className='ChatItem-username'>
              <p>{currentMember.username}</p>
            </div>
            <div className='ChatItem-lastMessage'>
              <span>{lastMessage?.text}</span>
            </div>
          </div>
          <div className='ChatItemPreview-rigth'>
            <span>
              Hoy
            </span>
          </div>
        </section>
      </div>
    </article>
  )
}

export default ChatItem