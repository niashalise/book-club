import { useState, useEffect } from 'react'
import './App.css'
import Header from './shared/Header';
import { useLocation } from 'react-router';
import { Route, Routes } from 'react-router';
import Home from './pages/Home'
import MyBooks from './pages/MyBooks'
import NotFound from './pages/NotFound'

function App() {
  const [title, setTitle] = useState('Book Club')
  const [myBooks, setMyBooks] = useState([]);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setTitle('Book Club')
    } else if (location.pathname === '/mybooks') {
      setTitle('My Books')
    }
  })

  return (
    <div>
      <Header title={title} />
      <Routes>
        <Route path="/" element={<Home myBooks={myBooks} setMyBooks={setMyBooks} />} />
        <Route path="/mybooks" element={<MyBooks myBooks={myBooks} />} />
        <Route path="/\/*" element={<NotFound />}></Route>
      </Routes>
    </div>
  )
}

export default App
