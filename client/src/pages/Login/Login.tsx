import "./style.css";
import {useEffect, useState} from 'react';
import {BsFillPersonFill, BsFillLockFill} from 'react-icons/bs';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { login, selectAuth } from "../../features/authSlice";
import { toastProps } from "../../common/toasts";
import { validateLoginInput } from "../../common/formValidation";

const Login : React.FC = () =>{
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {isLoggedIn} = useAppSelector(selectAuth);

    const [userFormInfo, setUserFormInfo] = useState({
        username: "",
        password: "",
    })

    useEffect(() => {
        if (isLoggedIn){
            navigate('/');
        }
    }, [isLoggedIn]);

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        if (validateLoginInput(userFormInfo.username, userFormInfo.password)){
            const values = {
                username: userFormInfo.username,
                password: userFormInfo.password,
            }
            dispatch(login(values));
        }else{
            toast.warn("Username or password is too short", toastProps);
        }
    }
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setUserFormInfo({...userFormInfo, [e.target.name]: e.target.value});
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