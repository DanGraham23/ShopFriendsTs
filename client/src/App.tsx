import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Checkout from './pages/Checkout/Checkout'
import {useEffect } from 'react';
import {isAuth, selectAuth} from './features/authSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchCartItems } from './features/cartSlice';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {id, isLoggedIn} = useAppSelector(selectAuth);
  
  useEffect(() => {
    dispatch(isAuth());
    console.log("this ran");
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn){
      dispatch(fetchCartItems(id));
    }    
  }, [isLoggedIn]);

  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />}  />
          <Route path="/profile/:user" element={<Profile />}  />
          <Route path="/checkout" element={<Checkout />}  />
          <Route path="/" element={<Main />}  />
          <Route path='*' element={<Navigate to='/' replace />}/>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
