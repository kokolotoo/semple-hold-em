import { DataProvider } from './Context/DataContext';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/NavBar';
import Cards from './Components/Cards';
import './App.css'
//  <Route path='/' element={<Home />} />



function App() {


  return (
    <>
      <Navbar />

      <DataProvider>
        <Cards />
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
