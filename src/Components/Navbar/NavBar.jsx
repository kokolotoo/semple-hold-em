import { Link } from 'react-router'
import './navBar.css'

import { useEffect, useState } from "react";

export default function Navbar() {

    
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const closeMenu = () => {
        setMenuOpen(false);
    }

    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add('scroll-lock');
        } else {
            document.body.classList.remove('scroll-lock');
        }
    }, [menuOpen]);

    return (
        <nav className='header__nav'>
            <Link to='/' className='header__logo'>
               💒 Home
            </Link>
            <p>Texas Hold'em</p>
            <Link to='/about' className='header__logo'>About</Link>
            <ul className={`header__menu ${menuOpen ? 'header__menu-open' : ''}`}>
                <li className='header__item' onClick={closeMenu}><Link to='/game'>Play Game</Link></li>
            </ul>
           
            <button className="header__burger" onClick={toggleMenu}>
                ☰
            </button>
        </nav>
    )
}