import { setUserLogout } from '../../features/authSlice';
import { useAppDispatch } from '../../hooks';
import './style.css';
import { useNavigate } from "react-router-dom";

const Logout:React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    function logout(){
        dispatch(setUserLogout({id:-1, username:""}));
        localStorage.clear();
        navigate("/login");
    }

    return (
        <button 
        onClick={logout} 
        className="logout-btn">Logout</button>
    )
}

export default Logout;