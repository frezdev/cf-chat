import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import socketIoClient, { Socket }  from 'socket.io-client'
import Message, { MessageProps } from '@/components/Message'
import formatTime from '@/utils/formatTime'


const BASE_URL = import.meta.env.VITE_BASE_URL
const NEW_MESSAGE = 'newMessage'

type Message = Array<MessageProps>

const useChat = (chatId: string | undefined) => {
  const { user } = useSelector((state: RootState) => state)
  const [messages, setMessages] = useState<Message>([])
  const socketRef = useRef<Socket>()

  useEffect(() => {
    socketRef.current = socketIoClient(BASE_URL, {
      query: { chatId }
    })

    socketRef.current.on(NEW_MESSAGE, (message) => {

      const incomingMessage: MessageProps = {
        ...message,
        hour: formatTime(),
      }

      setMessages(prevState => [...prevState, incomingMessage])
    })

    return () => {
      socketRef.current?.disconnect()
    }
  }, [chatId, messages])


  const sendMessage = (text: string) => {
    socketRef.current?.emit(NEW_MESSAGE, {
      sender: user?.userId,
      chatId,
      hour: formatTime(),
      text: text
    })
  }

  const getChats = () => {
    socketRef.current?.emit('getChats', )
  }

  return {
    messages,
    setMessages,
    sendMessage
  }
}

export default useChat