import React from 'react';
import { message } from 'antd';
import { Link } from 'react-router-dom';
import './navBar.css';
import { useEffect, useState, useContext } from "react";
import DataContext from '../../Context/DataContext';

// Импортира аудиото
import audioFile from '../../assets/about-sound.mp3';

export default function Navbar() {

    const { money, setMoney } = useContext(DataContext)
    const [menuOpen, setMenuOpen] = useState(false);
    const audio = new Audio(audioFile);
    const [messageApi, contextHolder] = message.useMessage();


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

    const saveGame = () => {
        const data = {
            data: money
        }
        localStorage.setItem("texas-hold'em", JSON.stringify(data))
        messageApi.info('Game is Saved !');
    }

    const loadGame = () => {
        if (money > 10) {
            messageApi.info('You still have money');
            return
        }
        if (localStorage.getItem("texas-hold'em")) {
            const savedData = JSON.parse(localStorage.getItem("texas-hold'em"))
            setMoney(savedData.data)
            messageApi.info('Game is Loaded');
        }
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
            {contextHolder}
            <ul className={`header__menu ${menuOpen ? 'header__menu-open' : ''}`}>

                <Link to='/' className='header__logo' onClick={closeMenu}>
                    💒 Home
                </Link>

                <Link to='/about' className='header__logo' onClick={playAudio}>
                    About
                </Link>
                <li className='header__item' onClick={saveGame}>Save Game</li>
                <li className='header__item' onClick={loadGame}>Load Game</li>

            </ul>

            <button className="header__burger" onClick={toggleMenu}>
                ☰
            </button>
        </nav>
    );
}
