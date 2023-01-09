import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const Home = () => {
  const [id, setId] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value)
  }

  return (
    <main className='home'>
      <h1 className='homeTitle'>ChatCF</h1>
      <form className='goToChatForm' action="">
        <input type="text" placeholder='Escribe un ID' onChange={e => handleChange(e)} />
        <Link to={`/chat/${id}`}>
          Go to chat
        </Link>
      </form>
    </main>
  )
}

export default Home