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
  const [user, setUser] = useState(null);
  const handleLogin = () => {
    setUser({ email: "", password: "" })
    localStorage.setItem("user", JSON.stringify(user));
  };
  const handleLogout = () => setUser(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setTitle('Book Club')
    } else if (location.pathname === '/mybooks') {
      setTitle('My Books')
    }
  })

  const isAuthenticated = user !== null;
  return (
    <div>
      <Header title={title} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mybooks" element={<MyBooks />} />
        <Route path="/\/*" element={<NotFound />}></Route>
      </Routes>
    </div>
  )
}

export default App
