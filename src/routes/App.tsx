import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Chat from '../pages/Chat'
import '../Global.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat/:id' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
