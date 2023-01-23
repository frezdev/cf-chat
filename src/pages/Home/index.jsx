import { useEffect, useState } from 'react'
import ChatsContainer from '@/containers/ChatsContainer'
import { io } from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'
import Chat from '@/containers/Chat'
import './Home.css'

const BASE_URL = import.meta.env.VITE_BASE_URL

const Home = () => {
  const [socket, setSocket] = useState()
  const { userId } = useSelector((state) => state.user)
  const { isOpen } = useSelector((state) => state.currentChat)
  const { id } = useSelector((state) => state.currentChat)

  useEffect(() => {
    setSocket(io(BASE_URL))
  }, [])

  useEffect(() => {
    socket?.emit('newUser', userId)
  }, [socket, userId])

  return (
    <main className='home'>
      <ChatsContainer socket={socket} messages={[]} />
      {
        isOpen
          ? <Chat socket={socket} chatId={id} sendMessage={''} />
          : <h2 style={{width: "100%", textAlign: "center"}}>Comienza a chatar</h2>
      }
    </main>
  )
}

export default Home