import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

interface Member {
  firstname: string
  lastname: string
  username: string
  profilePicture: string
  id: string
}

interface Message {
  text: string
  hour: string
}

interface ChatProps {
  members: Array<Member>
  messages: Array<Message>
}

const initialState: Member = {
  firstname: '',
  lastname: '',
  username: '',
  profilePicture: '',
  id: ''
}

const ChatItem: React.FC<ChatProps> = ({ members, messages }) => {
  const [chatMember, setChatMember] = useState<Member>(initialState)
  const [lastMessage, setLastMessage] = useState<Message>()
  const { user } = useSelector((state: RootState) => state)


  useEffect(() => {
    const currentMember = members.find(member => member.id !== user?.userId)
    if (currentMember !== undefined) {
      setChatMember(currentMember)
      setLastMessage(messages.at(-1))
    }
  }, [])

  const { firstname, lastname, username, profilePicture } = chatMember


  return (
    <article>
      <div>
        <picture>
          <img
            src={profilePicture}
            alt={`Foto de perfin de ${firstname} ${lastname}`}
          />
        </picture>

        <section>
          <div>
            <div>
              <p>{username}</p>
            </div>
            <div>
              <span>{lastMessage?.text}</span>
            </div>
          </div>
          <div>
            <span>
              {lastMessage?.hour}
            </span>
          </div>
        </section>
      </div>
    </article>
  )
}

export default ChatItem