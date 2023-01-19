import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import socketIoClient, { Socket }  from 'socket.io-client'
import Message, { MessageProps } from '@/components/Message'
import formatTime from '@/utils/formatTime'


const BASE_URL = import.meta.env.VITE_BASE_URL
const NEW_MESSAGE = 'newMessage'

type Message = Array<MessageProps>

const useChat = (chatId: string, userId: string, destinationUser: string = '') => {
  const { user } = useSelector((state: RootState) => state)
  const [messages, setMessages] = useState<Message>([])
  const socketRef = useRef<Socket>()

  useEffect(() => {
    socketRef.current = socketIoClient(BASE_URL, {
      query: { chatId, userId, destinationUser }
    })

    socketRef.current.on('connection', () => {
      console.log(socketRef.current)
    })

    //console.log(socketRef.current.id)

    socketRef.current.on(NEW_MESSAGE, (message) => {
      const incomingMessage: MessageProps = {
        ...message,
      }
      console.log(message)
      setMessages(prevState => [...prevState, incomingMessage])
    })

    socketRef.current.on('getMessages', (data) => {
      console.log(data)
    })
    socketRef.current?.emit('getMessages', chatId)


    return () => {
      socketRef.current?.disconnect()
    }

  }, [chatId])


  const sendMessage = (text: string) => {
    socketRef.current?.emit(NEW_MESSAGE, {
      sender: user?.userId,
      chatId,
      hour: formatTime(),
      text: text
    })
  }

  const getChats = (id: string) => {
    socketRef.current?.emit('getChats', )
  }

  return {
    messages,
    setMessages,
    sendMessage
  }
}

export default useChat