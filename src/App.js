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
import trophy from './images/trophy.png'
import { Messages } from './Utils/Messages';
import { English } from './Comonents/Languages/English';
function App() {
  const [Notify, setNotify] = useState(true)
  const [isOpen1, setIsOpen1] = useState(false);
  const [Read, setRead] = useState([])
  const [UnRead, setUnRead] = useState([])
  // localStorage.removeItem('n1');
  let read = localStorage.getItem("n2")
  read = parseInt(read)
  let arrRead  = []
  let arrNotRead = []
  const readCheck = ()=>{

    if(read!=null){ 
     for (let i =0; i<Messages.length; i++){
      if(Messages[i].id<=read) arrRead.push(Messages[i])
      else arrNotRead.push(Messages[i])
     }
    }
     else{ arrNotRead = Messages}
     setRead(arrRead)
     setUnRead(arrNotRead)
  
  }

  function CloseModal() {
    arrNotRead=[]
    arrRead = Messages
    setRead(arrRead)
    setUnRead(arrNotRead)
    setIsOpen1(!isOpen1);
  }
  const openNotifications = async()=>{
    setIsOpen1(!isOpen1);
    localStorage.setItem("n2",Messages[Messages.length-1].id)

  }
useEffect(() => {
  readCheck()
}, [])

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
        </Routes>
        </Ethers>
      </Router>
      <Modal
  isOpen={isOpen1}
  onRequestClose={CloseModal}
  contentLabel="My dialog"
  className="mymodal"
  overlayClassName="myoverlay"
  closeTimeoutMS={500}
>
  <div className='Notify_main text-white'>
    <div className='text-white text-lg mb-3 align-center items-center'>Notifications for you:-</div>


    <div className='message w-full'>
      <div className='message-header flex '>
      <div className='message_liner mr-1'/>
      <div className='message_date text-md text-yellow-400'>New</div>
      <div className='message_liner ml-1'/>
      </div>
    </div>
    {
      UnRead.map((e)=>{
        return(
      <div className='message w-full' key={e.id}>
      <div className='message_date text-s underline '>{e.date}</div>
      <div className='Message Data mb-3 '>
       - {English[e.data]}
      </div>
    </div>    
        )
      })
    }
    

    <div className='message w-full'>
      <div className='message-header flex '>
      <div className='message_liner mr-1'/>
      <div className='message_date text-md text-yellow-400'>Old</div>
      <div className='message_liner ml-1'/>
      </div>
    </div>

    {
      Read.map((e, index)=>{
        return(
      <div className='message w-full'  key={e.id}>
      <div className='message_date text-s underline '>{e.date}</div>
      <div className='Message Data mb-3 '>
       - {English[e.data]}
      </div>
    </div>    
        )
      })
    }
  <button onClick={CloseModal} className="md_3">Close X</button>
  </div>
  
</Modal>
    </div>
  );
}

export default App;
