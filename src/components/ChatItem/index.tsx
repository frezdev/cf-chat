import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import useChat from '@/hooks/useChat'
import { openChat } from '@/redux/slices/openCurrentChat'
import notPhoto from '@/assets/not-profile-photo.jpg'
import './ChatItem.css'
import { getMessagesSocket } from '@/services/chatsSevices'

interface Member {
  firstname: string
  lastname: string
  username: string
  profilePicture: string
  id: string
}

interface Message {
  text: string
  createdAt: string
}

interface ChatProps {
  members: Array<Member>
  messages: Array<Message>
  id: string
}

const initialState: Member = {
  firstname: '',
  lastname: '',
  username: '',
  profilePicture: '',
  id: ''
}

const ChatItem: React.FC<ChatProps> = ({ members, messages, id}) => {
  const [chatMember, setChatMember] = useState<Member>(initialState)
  const [lastMessage, setLastMessage] = useState<any>()
  const { user, currentChat: { id: chatId }} = useSelector((state: RootState) => state)
  const { messages: newMessages } = useChat(chatId)
  const dispatch = useDispatch()

  const { firstname, lastname, username, profilePicture } = chatMember

  useEffect(() => {
    const currentMember = members.find(member => member.id !== user?.userId)

    if (currentMember !== undefined) {
      if (newMessages.length > 0 && chatId === id) {
        setLastMessage(newMessages.at(-1))
      } else if (newMessages.length === 0 && (chatId === id || chatId === '')) {
        setLastMessage(messages.at(-1))
      }
      setChatMember(currentMember)
    }
    getMessagesSocket(chatId)
  }, [newMessages])

  let dateCreated = ''
  if (lastMessage?.createdAt) {
    dateCreated = new Date(lastMessage?.createdAt).toLocaleDateString()
  }

  const handleChat = () => {
    dispatch(openChat({id, isOpen: true}))
  }


  return (
    <article className='ChatItem' onClick={handleChat}>
      <div className='ChatItemContainer'>
        <picture className='ChatItemProfilePhoto'>
          <img
            src={profilePicture === '' ? notPhoto : profilePicture}
            alt={`Foto de perfin de ${firstname} ${lastname}`}
          />
        </picture>

        <section className='ChatItemPreview'>
          <div className='ChatItemPreview-left'>
            <div className='ChatItem-username'>
              <p>{username}</p>
            </div>
            <div className='ChatItem-lastMessage'>
              <span>{lastMessage?.text}</span>
            </div>
          </div>
          <div className='ChatItemPreview-rigth'>
            <span>
              {dateCreated}
            </span>
          </div>
        </section>
      </div>
    </article>
  )
}

export default ChatItem