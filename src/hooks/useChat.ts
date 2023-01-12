import { useEffect, useRef, useState } from 'react'
import socketIoClient, { Socket }  from 'socket.io-client'
import Message, { MessageProps } from '@/components/Message'
import formatTime from '@/utils/formatTime'


const BASE_URL = import.meta.env.VITE_BASE_URL
const NEW_MESSAGE = 'newMessage'

type Message = Array<MessageProps>

const useChat = (chatId: string | undefined) => {
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
        sender: message.senderId === socketRef.current?.id
      }

      setMessages(prevState => [...prevState, incomingMessage])
    })

    return () => {
      socketRef.current?.disconnect()
    }
  }, [chatId])

  const sendMessage = (messageBody: any) => {
    socketRef.current?.emit(NEW_MESSAGE, {
      body: messageBody,
      senderId: socketRef.current.id,
      hour: formatTime(),
      text: messageBody
    })
  }

  return {
    messages,
    sendMessage
  }
}

export default useChat