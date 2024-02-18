import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [navActive, setNavActive] = useState(false);

    const toggleNav = () => {
        setNavActive(!navActive);
    }

    const closeMenu = () => {
        setNavActive(false);
    }

    const goHome = () => {
        navigate('/home');
    }

    const handleLoginClick = () => {
        navigate('/');
    }

    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 500) {
                closeMenu;
            }
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, []);

    useEffect(() => {
        if (window.innerWidth <= 1200) {
            closeMenu;
        }
    }, []);

    return (
        <nav className={`navbar ${navActive? "active": ""}`}>
            <div className="navbar--logo--container">
                <img className="navbar--logo" src="./img/logo.svg" alt="Logo" onClick={goHome}></img>
            </div>
            <a className={`nav__hamburger ${navActive ? "active" : ""}`} onclick={toggleNav}>
            
            <span className="nav__hamburger__line"></span>
            <span className="nav__hamburger__line"></span>
            <span className="nav__hamburger__line"></span>
            </a>

            <Link onClick={handleLoginClick} activeClass="navbar--active-content" spy={true} smooth={true} offset={-70} duration={500} to="Contact" className="btn btn-outline-primary">Log in</Link>
        </nav>
    );

}

export default Navbar;
