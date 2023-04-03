import "./style.css";
import {useState} from 'react';
import {BsFillPersonFill, BsFillLockFill} from 'react-icons/bs';
import {ToastContainer, ToastOptions, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login : React.FC = () =>{
    const [userFormInfo, setUserFormInfo] = useState({
        username: "",
        password: "",
    })

    const toastProps: ToastOptions<{}> = {
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
            console.log('successful login attempt');
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