import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Checkout from './pages/Checkout/Checkout'
import { useEffect } from 'react';
import {isAuth} from './features/authSlice';
import { useAppDispatch } from './hooks';
import { useDispatch } from 'react-redux';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("ran app");
    dispatch(isAuth());
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path='*' element={<Navigate to='/' replace />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
