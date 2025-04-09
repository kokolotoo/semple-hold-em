import React from 'react';
import { message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './navBar.css';
import { useEffect, useState, useContext } from "react";
import DataContext from '../../Context/DataContext';
import { CgProfile } from "react-icons/cg";
import { auth, db } from '../../Hooks/firebase-config';
import { signOut, getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'
import useLoadGame from '../../Hooks/useLoadGame';

// Импортира аудиото
import audioFile from '../public/about-sound.mp3';
import audioFile2 from '../public/button-sound.mp3';

export default function Navbar() {
    const navigate = useNavigate()
    const { money, setMoney, isLogin, setIsLogin,
        user, setUser } = useContext(DataContext)
    const [menuOpen, setMenuOpen] = useState(false);
    const audio = new Audio(audioFile);
    const audio2 = new Audio(audioFile2);
    const [messageApi, contextHolder] = message.useMessage();
    const { loadedMoney } = useLoadGame();
   

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

    const load = () => {
        setMoney(loadedMoney)
        messageApi.open({
            type: 'success',
            content: 'Game is loaded',
        });
    }

    const saveGame = async () => {
        try {
            audio2.play();
            setMenuOpen(false);
            const usersMoneyRef = doc(db, 'Users-Money', user.id)
            const storedData = {
                id: user.id,
                name: user.name,
                money: money
            }
            await setDoc(usersMoneyRef, storedData)
            messageApi.open({
                type: 'success',
                content: 'Game saved',
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleExit = async () => {
        try {
            await signOut(auth);
            setUser('')
            navigate('/')
            setMoney(100)
            setMenuOpen(false);
            setIsLogin(false)
        } catch (err) {
            const errorMatch = err.message.match(/\(auth\/(.*?)\)/);
            setError(errorMatch ? errorMatch[1].replace(/-/g, " ") : "Unknown error");
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
                {isLogin &&
                    <div className='user-info-container'>
                        <li className='header__item' onClick={saveGame}>Save Game</li>
                        <CgProfile title={user.name} />
                        <li className='header__item' onClick={handleExit}>Exit</li>
                        <li className='header__item' onClick={load}>Load game</li>
                    </div>
                }
            </ul>

            <button className="header__burger" onClick={toggleMenu}>
                ☰
            </button>
        </nav>
    );
}
