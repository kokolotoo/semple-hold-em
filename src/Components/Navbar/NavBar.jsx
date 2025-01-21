import React from 'react';
import { message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './navBar.css';
import { useEffect, useState, useContext } from "react";
import DataContext from '../../Context/DataContext';
import { CgProfile } from "react-icons/cg";

// Импортира аудиото
import audioFile from '../public/about-sound.mp3';
import audioFile2 from '../public/button-sound.mp3';

export default function Navbar() {
    const navigate = useNavigate()
    const { money, setMoney, isLogin, setIsLogin, setBet,
        bet, user, setUser, profiles, setProfiles } = useContext(DataContext)
    const [menuOpen, setMenuOpen] = useState(false);
    const audio = new Audio(audioFile);
    const audio2 = new Audio(audioFile2);
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
        audio2.play();
        const newProfiles = profiles.map(profile => {
            if (profile.username === user.username) {
                return { ...profile, money: money }
            }
            return profile
        })
        setProfiles(newProfiles)
        localStorage.setItem("texas-hold'em-profiles", JSON.stringify(newProfiles))
        messageApi.open({
            type: 'success',
            content: 'Game Saved',
        });
        setMenuOpen(false);
    }

    const handleExit = () => {
        setIsLogin(false)
        setUser('')
        navigate('/')
        setMoney(100)
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
            {contextHolder}
            <ul className={`header__menu ${menuOpen ? 'header__menu-open' : ''}`}>

                <Link to='/' className='header__logo' onClick={closeMenu}>
                    💒 Home
                </Link>

                <Link to='/about' className='header__logo' onClick={playAudio}>
                    About
                </Link>
                {isLogin &&
                    <div className='user-info-container'>
                        <li className='header__item' onClick={saveGame}>Save Game</li>
                        <CgProfile title={user.username} />
                        <li className='header__item' onClick={handleExit}>Exit</li>
                    </div>
                }
            </ul>

            <button className="header__burger" onClick={toggleMenu}>
                ☰
            </button>
        </nav>
    );
}
