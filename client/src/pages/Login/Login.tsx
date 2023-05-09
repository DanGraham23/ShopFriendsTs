import "./style.css";
import {useEffect, useState} from 'react';
import {BsFillPersonFill, BsFillLockFill} from 'react-icons/bs';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { login, selectAuth } from "../../features/authSlice";
import { toastProps } from "../../common/toasts";
import { validateLoginInput } from "../../common/formValidation";
import loginImg from '../../assets/images/login-img.jpg';
import { clearError, selectError } from "../../features/errorSlice";

const Login : React.FC = () =>{
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {isLoggedIn} = useAppSelector(selectAuth);
    const {message} = useAppSelector(selectError);

    const [userFormInfo, setUserFormInfo] = useState({
        username: "",
        password: "",
    })

    useEffect(() => {
        if (isLoggedIn){
            navigate('/');
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (message !== ""){
            toast.warn(message, toastProps);
            dispatch(clearError());
        }
    }, [message]);

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        if (validateLoginInput(userFormInfo.username, userFormInfo.password)){
            const values = {
                username: userFormInfo.username,
                password: userFormInfo.password,
            }
            dispatch(login(values));
        }else{
            toast.warn("Invalid login attempt, check your credentials", toastProps);
        }
    }
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setUserFormInfo({...userFormInfo, [e.target.name]: e.target.value});
    }
    
    return (
        <div className="login-container"> 
            <img src={loginImg} alt="woman holding her sunglasses on her face in cool outfit" className="login-img"/>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="input-row">
                    <BsFillPersonFill className="form-icon"/>
                    <input type="text" 
                    placeholder="Username"
                    name="username"
                    minLength={3}
                    value={userFormInfo.username}
                    onChange={handleChange}
                    className="form-input"/>
                </div>
                <div className="input-row">
                    <BsFillLockFill className="form-icon"/>
                    <input type="password" 
                    placeholder="Password"
                    name="password"
                    minLength={8}
                    value={userFormInfo.password}
                    onChange={handleChange}
                    className="form-input"/>
                </div>
                <button type="submit" className="form-btn">Login</button>
                <a href="/register" className="form-footer">New member? Click here to register!</a>
            </form>
        </div>
    )
}

export default Login;