import { useState, useEffect } from "react";
// import { Link } from "react-scroll";
import { useRouter } from "next/router";


// const useSetRouter = (setRouter) => { 
//     const newRouter = useRouter();
//     useEffect(() => {
//         setRouter(() => setRouter(useRouter()));
//     }, [newRouter, setRouter])}

function Navbar() {
    const [navActive, setNavActive] = useState(false);
    const [router, setRouter] = useState(null);
    
    // useSetRouter(setRouter);

    const toggleNav = () => {
        setNavActive(!navActive);
    }

    const closeMenu = () => {
        setNavActive(false);
    }

    const goHome = () => {
        router.push('/home');
    }

    const handleLoginClick = () => {
        router.push('/');
    }


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

            {/* <Link onClick={handleLoginClick} activeClass="navbar--active-content" spy={true} smooth={true} offset={-70} duration={500} to="Contact" className="btn btn-outline-primary">Log in</Link> */}
        </nav>
    );

}

export default Navbar;
