import { DataProvider } from './Context/DataContext';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/NavBar';
import Cards from './Components/Cards/Cards';
import HomePage from './Components/Home/HomePage';
import Game from './Components/PlayGame/Game';
import About from './Components/Home/About';
import './App.css'
//  <Route path='/' element={<Home />} />



function App() {


  return (
    <>
      <Navbar />
      <DataProvider>

        <div className='game-board'>

          <div className="play-board">

            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/game' element={<Game />} />
              <Route path='/about' element={<About />} />
            </Routes>

          </div>


          <div className="button-board">
            <button>Red</button>
            <button>Black</button>
            <button>Row</button>
          </div>

        </div>

      </DataProvider>

    </>
  )
}

export default App
