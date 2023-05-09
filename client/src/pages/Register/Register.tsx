import "./style.css";
import {useEffect, useState} from 'react';
import {BsFillPersonFill, BsFillLockFill} from 'react-icons/bs';
import {AiOutlineMail} from 'react-icons/ai'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastProps } from "../../common/toasts";
import { useNavigate } from "react-router-dom";
import {register, selectAuth} from "../../features/authSlice";
import {useAppDispatch, useAppSelector} from '../../hooks';
import { validateRegisterInput } from "../../common/formValidation";
import registerImg from '../../assets/images/register-img.jpg';
import { clearError, selectError } from "../../features/errorSlice";

const Register: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {isLoggedIn} = useAppSelector(selectAuth);
    const {message} = useAppSelector(selectError);
    
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

    useEffect(() => {
        if (message !== ""){
            toast.warn(message, toastProps);
            dispatch(clearError());
        }
    }, [message]);

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
            toast.warn("Invalid register attempt, check your credentials", toastProps);
        }
    }
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setUserFormInfo({...userFormInfo, [e.target.name]: e.target.value});
    }

    

    return (
        <div className="register-container">
            <img src={registerImg} alt="woman holding her sunglasses on her face in cool outfit" className="register-img"/>
            <form onSubmit={handleSubmit} className="register-form">
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
                    <AiOutlineMail className="form-icon"/>
                    <input type="text" 
                    placeholder="Email"
                    name="email"
                    minLength={4}
                    value={userFormInfo.email}
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
                <div className="input-row">
                    <BsFillLockFill className="form-icon"/>
                    <input type="password" 
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    minLength={8}
                    value={userFormInfo.confirmPassword}
                    onChange={handleChange}
                    className="form-input"/>
                </div>
                <button type="submit" className="form-btn">Register</button>
                <a href="/login" className="form-footer">Already a member? Click here to login!</a>
            </form>
        </div>
    )
}

export default Register;