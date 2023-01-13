import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const [id, setId] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value)
  }


  return (
    <main className='home'>
      <h1 className='homeTitle'>ChatCF</h1>
      <form className='goToChatForm'>
        <input
          type="text"
          placeholder='Escribe un ID'
          onChange={handleChange}
        />
        <Link to={`/chat/${id}`}>
          Go to chat
        </Link>
      </form>
    </main>
  )
}

export default Home