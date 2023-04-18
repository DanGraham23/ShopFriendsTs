import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import {useEffect } from 'react';
import {isAuth, selectAuth} from './features/authSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchCartItems } from './features/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import { toastProps } from './common/toasts';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {id, isLoggedIn} = useAppSelector(selectAuth);
  
  useEffect(() => {
    dispatch(isAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn){
      dispatch(fetchCartItems(id));
    }    
  }, [isLoggedIn]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      toast.success("Order placed! You will receive an email confirmation.", toastProps);
    }

    if (query.get("canceled")) {
      toast.warn("Order canceled -- continue to shop around and checkout when you're ready.", toastProps);
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className='pages-container'>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />}  />
          <Route path="/profile/:user" element={<Profile />}  />
          <Route path="/" element={<Main />}  />
          <Route path='*' element={<Navigate to='/' replace />}/>  
        </Routes>
        <ToastContainer />
      </BrowserRouter>
      </div>
      <Footer />
    </div>
  )
}

export default App
