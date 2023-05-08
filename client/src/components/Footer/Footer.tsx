import './style.css';
import {AiOutlineInstagram, AiFillFacebook, AiOutlineTwitter, AiFillYoutube, AiFillLinkedin, AiOutlineCopyrightCircle} from 'react-icons/ai';

const Footer:React.FC = () => {
    return (
        <footer className='footer-container'>
            <ul className='footer-pages'>
                <li>ABOUT</li>
                <li>HELP & FAQ</li>
                <li>TERMS</li>
                <li>ACCESSIBILITY</li>
                <li>CONTACT</li>
                <li>JOBS</li>
            </ul>
            <ul className='footer-socials'>
                <li><AiOutlineInstagram /></li>
                <li><AiFillFacebook /></li>
                <li><AiOutlineTwitter /></li>
                <li><AiFillYoutube /></li>
                <li><AiFillLinkedin /></li>
                <h3 className='footer-copywrite'>
                    ShopFriends
                    <AiOutlineCopyrightCircle />
                    2023
                </h3>
            </ul>
        </footer>
    )
}

export default Footer;