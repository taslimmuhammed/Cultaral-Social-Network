import './App.css';
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import React, {useState, useContext, useEffect} from "react"
import Ethers, { EthersContext } from './Context/EthersContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import LandingPage from './Pages/LandingPage';
import GeneralPage from './Pages/GeneralPage';
import PremiumPage from './Pages/PremiumPage';
import Admin from './Comonents/Admin/Admin';
import Modal from 'react-modal'
import { Messages } from './Utils/Messages';
import { English } from './Comonents/Languages/English';
import Ranking from './Comonents/Ranking/Ranking';
function App() {

  return (
    <div className="main-screen">
      <Router>
        <Ethers>
        <Routes>
          <Route path='/' exact element={<HomePage/>}></Route>
          <Route path='/landing' exact element={<LandingPage/>}></Route>
          <Route path='/premium' exact element={<PremiumPage/>}></Route>
          <Route path='/general' exact element={<GeneralPage/>}></Route>
          <Route path='/admin' exact element={<Admin/>}></Route>   
          <Route path='/ranking' exact element={<Ranking/>}></Route>  
          <Route path='/ranking' exact element={<Ranking/>}></Route>  
        </Routes>
        </Ethers>
      </Router>
      {/* <div className='l_Bottom margin'>&#169;Global Community Union</div>   */}
    </div>
  );
}

export default App;
