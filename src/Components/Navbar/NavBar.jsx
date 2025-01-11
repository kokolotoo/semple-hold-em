import { Link } from 'react-router-dom';
import './navBar.css';
import { useEffect, useState } from "react";

// Импортира аудиото
import audioFile from '../../assets/about-sound.mp3';

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const audio = new Audio(audioFile);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const closeMenu = () => {
        setMenuOpen(false);
    }

    const playAudio = () => {
        audio.play();
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

            <ul className={`header__menu ${menuOpen ? 'header__menu-open' : ''}`}>

                <Link to='/' className='header__logo' onClick={closeMenu}>
                    💒 Home
                </Link>

                <Link to='/about' className='header__logo' onClick={playAudio}>
                    About
                </Link>
                <li className='header__item'>Save Game</li>
                <li className='header__item'>Load Game</li>
                <li className='header__item' onClick={closeMenu}><Link to='/game'>Play Game</Link></li>
            </ul>

            <button className="header__burger" onClick={toggleMenu}>
                ☰
            </button>
        </nav>
    );
}
