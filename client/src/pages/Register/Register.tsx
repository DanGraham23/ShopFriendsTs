import "./style.css";
import {useEffect, useState} from 'react';
import {BsFillPersonFill, BsFillLockFill} from 'react-icons/bs';
import {AiOutlineMail} from 'react-icons/ai'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastProps } from "../../common/toasts";
import { useNavigate } from "react-router-dom";
import {register, selectAuth} from "../../features/authSlice";
import {useAppDispatch, useAppSelector} from '../../hooks';
import { validateRegisterInput } from "../../common/formValidation";

const Register: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {isLoggedIn} = useAppSelector(selectAuth);

    const [userFormInfo, setUserFormInfo] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    useEffect(() => {
        if (isLoggedIn){
            navigate('/');
        }
    }, [isLoggedIn]);

    function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        if (validateRegisterInput(userFormInfo.username,userFormInfo.email,userFormInfo.password,userFormInfo.confirmPassword)){
            const values = {
                username: userFormInfo.username,
                email: userFormInfo.email,
                password: userFormInfo.password,
            }
            dispatch(register(values));
        }else{
            toast.warn("Passwords needs to be atleast 8 characters, and must match", toastProps);
        }
    }
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setUserFormInfo({...userFormInfo, [e.target.name]: e.target.value});
    }

    

    return (
        <div className="register--container">
            <form onSubmit={handleSubmit} className="register-form">
                <div className="input-row">
                    <BsFillPersonFill className="form-icon"/>
                    <input type="text" 
                    placeholder="Username"
                    name="username"
                    value={userFormInfo.username}
                    onChange={handleChange}
                    className="register-input"/>
                </div>
                <div className="input-row">
                    <AiOutlineMail className="form-icon"/>
                    <input type="text" 
                    placeholder="Email"
                    name="email"
                    value={userFormInfo.email}
                    onChange={handleChange}
                    className="register-input"/>
                </div>
                <div className="input-row">
                    <BsFillLockFill className="form-icon"/>
                    <input type="password" 
                    placeholder="Password"
                    name="password"
                    value={userFormInfo.password}
                    onChange={handleChange}
                    className="register-input"/>
                </div>
                <div className="input-row">
                    <BsFillLockFill className="form-icon"/>
                    <input type="password" 
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={userFormInfo.confirmPassword}
                    onChange={handleChange}
                    className="register-input"/>
                </div>
                <button type="submit" className="register-btn">Register</button>
                <a href="/login" className="form-footer">Already a member? Click here to login!</a>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Register;