import { DataProvider } from './Context/DataContext';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/NavBar';
import Cards from './Components/Cards/Cards';
import './App.css'
//  <Route path='/' element={<Home />} />



function App() {


  return (
    <>
      <Navbar />
      <DataProvider>

        <div className='game-board'>

          <div className="play-board">

            <div className='info-board'>
              <button>haa</button>
              <aside>kiuh</aside>
              <span>Credit:</span>

            </div>

            <div className="card-board">
              <Cards />
            </div>

          </div>


          <div className="button-board">

          </div>

        </div>


        {
          /*
            <Routes>
              <Route path='/' element={<Cards />} />
            </Routes>
            */
        }
      </DataProvider>

    </>
  )
}

export default App
