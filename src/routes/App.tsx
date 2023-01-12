import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '@/pages/Home'
import Chat from '@/pages/Chat'
import Login from '@/pages/Login/'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import '../Global.css'

function App() {
  const { user } = useSelector((state: RootState) => state)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path='/chat/:id' element={user ? <Chat /> : <Navigate to='/login' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
