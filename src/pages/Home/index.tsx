import { useEffect, useState } from 'react'
import ChatsContainer from '@/containers/ChatsContainer'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import './Home.css'
import Chat from '@/containers/Chat'

const Home = () => {
  const [currentId, setCurrentId] = useState('')
  const { isOpen, id } = useSelector((state: RootState) => state.currentChat)

  useEffect(() => {
    setCurrentId(id)
  }, [id])

  return (
    <main className='home'>
      <ChatsContainer />
      {
        isOpen
          ? <Chat />
          : <h2 style={{width: "100%", textAlign: "center"}}>Comienza a chatar</h2>
      }
    </main>
  )
}

export default Home