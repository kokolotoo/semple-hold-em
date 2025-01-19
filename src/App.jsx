import { DataProvider } from './Context/DataContext';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/NavBar';
import HomePage from './Components/Home/HomePage';
import Game from './Components/PlayGame/Game';
import About from './Components/Home/About';
import PlayButtons from './Components/PlayGame/PlayButtons';
import LoginPage from './Components/Home/LoginPage';
import Registration from './Components/Home/Registration';
import ForgotPage from './Components/Home/ForgotPage';
import './App.css'
//  <Route path='/' element={<Home />} />




function App() {


  return (
    <>
     
      <DataProvider>
        <Navbar />
        <div className='game-board'>

          <div className="play-board">

            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/game' element={<Game />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<Registration />} />
              <Route path='/forgot-page' element={<ForgotPage />} />
            </Routes>

          </div>

          <PlayButtons />

        </div>

      </DataProvider>

    </>
  )
}

export default App
