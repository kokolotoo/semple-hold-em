import { Link } from 'react-router'
import './navBar.css'


export default function Navbar() {


    return (
        <div className='nav-container'>
            <Link to='/game'>Play</Link>
            <Link to='/'>Home</Link>
            <p className='game-name'>Texas Hold'em</p>
            <button className='reset-button'>Reset</button>
            
            <button className='save-game-button'>Save Game</button>
        </div>
    )
}