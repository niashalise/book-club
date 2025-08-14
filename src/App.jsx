import { useState, useEffect } from 'react'
import './App.css'
import Header from './shared/Header';
import { useLocation } from 'react-router';
import { Route, Routes } from 'react-router';
import Home from './pages/Home'
import MyBooks from './pages/MyBooks'
import NotFound from './pages/NotFound'
import PathBasedRoute from './shared/PathBasedRoute';

function App() {
  const [title, setTitle] = useState('Book Club')
  const [myBooks, setMyBooks] = useState([]);

  return (
    <div>
      <Header title={title} />
      <Routes>
        <Route element={<PathBasedRoute setTitle={setTitle} />}>
          <Route path="/" element={<Home myBooks={myBooks} setMyBooks={setMyBooks} />} />
        <Route path="/mybooks" element={<MyBooks myBooks={myBooks} />} />
        </Route>
        <Route path="/\/*" element={<NotFound />}></Route>
      </Routes>
    </div>
  )
}

export default App
