import "./style.css";
import {useEffect, useState} from 'react';
import {BsFillPersonFill, BsFillLockFill} from 'react-icons/bs';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastProps } from "../../common/toasts";
import { loginRoute } from "../../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { login, selectAuth } from "../../features/authSlice";

const Login : React.FC = () =>{
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {isLoggedIn} = useAppSelector(selectAuth);

    const [userFormInfo, setUserFormInfo] = useState({
        username: "",
        password: "",
    })

    //On load or submit, check if a user is logged in
    useEffect(() => {
        console.log("login ran");
        if (isLoggedIn){
            navigate('/');
        }
    }, [isLoggedIn]);

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        if (validateInput()){
            const values = {
                username: userFormInfo.username,
                password: userFormInfo.password,
            }
            dispatch(login(values));
        }
    }
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setUserFormInfo({...userFormInfo, [e.target.name]: e.target.value});
    }

    function validateInput() : boolean{
        const {username, password} = userFormInfo;
        if (username.length < 4){
            toast.warn("Username needs to be atleast 4 characters", toastProps);
            return false;
        }else if (password.length < 8){
            toast.warn("Password needs to be atleast 8 characters", toastProps);
            return false;
        }
        return true;
    }
    
    return (
        <div className="register--container">
            <form onSubmit={handleSubmit} className="login-form">
                <div className="input-row">
                    <BsFillPersonFill className="form-icon"/>
                    <input type="text" 
                    placeholder="Username"
                    name="username"
                    value={userFormInfo.username}
                    onChange={handleChange}
                    className="login-input"/>
                </div>
                <div className="input-row">
                    <BsFillLockFill className="form-icon"/>
                    <input type="password" 
                    placeholder="Password"
                    name="password"
                    value={userFormInfo.password}
                    onChange={handleChange}
                    className="login-input"/>
                </div>
                <button type="submit" className="login-btn">Login</button>
                <a href="/register" className="form-footer">New member? Click here to register!</a>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login;