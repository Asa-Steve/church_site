import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
    return (
        <div className='Footer'>
            <div className="wrapper">
                <div className="col-1">
                    <div className="logo"><h1>LOGO</h1></div>
                    <p>Lorem ipsum dolor sit amet,explicabo velit quod quibusdam rem tempore minus! consectetur adipisicing elit. Officia, explicabo velit quod quibusdam rem tempore minus! Architecto debitis.</p>
                    <div className="socials">
                        <span>twiter</span>
                        <span>facebook</span>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="col-2">
                    <div className="diff">Quick Links</div>
                    <div className="links">
                        <Link to=''>Home</Link>
                        <Link to=''>About Us</Link>
                        <Link to=''>Contact</Link>
                        <Link to=''>Donate</Link>
                    </div>
                </div>
            </div>
            <div className="copy">All rights reserved &copy; Designed By Steve with 💖</div>
        </div>
    );
}

export default Footer;
