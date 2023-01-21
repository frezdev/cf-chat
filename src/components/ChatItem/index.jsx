import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openChat } from '@/redux/slices/openCurrentChat'
import { chatsReducer } from '@/redux/slices/chatsSlice'
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
  const dispatch = useDispatch()

  useEffect(() => {
    const current = members.find(member => member.id !== userId)
    setCurrentMember(prev => ({...prev, ...current}))

    socket.on('lastMessage', message => {
      console.log(message)
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
              <span>Hola bb</span>
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