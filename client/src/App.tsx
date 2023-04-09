import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Checkout from './pages/Checkout/Checkout'
import {useEffect } from 'react';
import {isAuth} from './features/authSlice';
import { useAppDispatch } from './hooks';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(isAuth());
    console.log("ran app");
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />}  />
          <Route path="/profile/:user" element={<Profile />}  />
          <Route path="/checkout" element={<Checkout />}  />
          <Route path="/" element={<Home />}  />
          <Route path='*' element={<Navigate to='/' replace />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
