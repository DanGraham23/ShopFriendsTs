import "./style.css";
import {useState} from 'react';
import {BsFillPersonFill, BsFillLockFill} from 'react-icons/bs';
import {AiOutlineMail} from 'react-icons/ai'
import {ToastContainer, ToastOptions, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register: React.FC = () => {
    const [userFormInfo, setUserFormInfo] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const toastProps : ToastOptions<{}> = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        }

    function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        if (validateInput()){
            console.log('successful register attempt');
        }
    }
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setUserFormInfo({...userFormInfo, [e.target.name]: e.target.value});
    }

    function validateInput() : boolean{
        const {username, email, password, confirmPassword} = userFormInfo;
        if (username.length < 4){
            toast.warn("Username needs to be atleast 4 characters", toastProps);
            return false;
        }else if (email.length < 8){
            toast.warn("Email needs to be atleast 8 characters", toastProps);
            return false;
        }else if (password.length < 8){
            toast.warn("Password needs to be atleast 8 characters", toastProps);
            return false;
        }else if (password !== confirmPassword){
            toast.warn("Passwords do not match", toastProps);
            return false;
        }
        return true;
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