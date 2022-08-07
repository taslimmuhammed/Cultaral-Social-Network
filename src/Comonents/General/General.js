import React,{useState, useEffect, useContext} from 'react'
import './General.css'
import {EthersContext} from '../../Context/EthersContext'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loading/Loading'
function General() {
  const navigate = useNavigate()
  const {checkSignIn,unitBalance,buyToken,enterGame,unitCount, currentAccount} = useContext(EthersContext)
  const [Units, setUnits] = useState(0)
  const [BUnits, setBUnits] = useState(0)
  const [In, setIn] = useState(0)
  const [isLoading, setisLoading] = useState(false)
  const handleBuy= async()=>{
    setisLoading(true)
    if(Units==1) return alert("Your limit has been reached")
    else{
      try{
        await buyToken("1")
        alert(" Succefully bought 1 UNIT, if its not reflected in your wallet try refreshing after few minutes"        )
        initiaor()
     } catch(e){
     console.log(e.data.message)
     alert("Make sure you have 10 usdt in polygon blocchain, Note: if you have USDt in other blockchains please swap to polygon"     )
     }
   
    }
    setisLoading(false)
}

const handleLot= async()=>{
  setisLoading(true)
 try{
    await enterGame()
    alert(" 1 UNIT has been used Lot, if you win your unit balance will increase automatically"    )
    initiaor()
 } catch(e){
 console.log(e)
 alert(e.data.message)
 }
 setisLoading(false)
}


const initiaor= async()=>{
  setisLoading(true)
  try{
    
    const s1 = await checkSignIn()
    if(s1!=1) navigate("/")
    const units = await unitBalance()
    setUnits(units[0])
    setBUnits(units[1])
    setIn(units[3])
  }catch(e){
      console.log(e)
  }
  setisLoading(false)
}

useEffect(() => {
  initiaor()
}, [])
  return (
  isLoading?<Loader/>:<div className='p_main'>
  <div className='p_head'>General Member</div>
  <div className='Wallet'>
      <div className='wallet_head'>WALLET ADDRESS</div>
      <div className='wallet_address'>{currentAccount}</div>
  </div>

  <div className='p_bottom'>

      <div className='sub_head'>PURCHASE UNIT</div>
      <div className='sub_sub'>{Units}/1</div>
    
      <div className='sub_head'>Out Unit</div>
      <div className='sub_sub'>{BUnits}/{In}</div>

      <div className='sub_head'>Price of 1 Unit</div>
          <div className='sub_sub'>10 USDt (*polygon chain)</div>
      <div className='p_buttons' >
          <button className="button-9" role="button" onClick={handleBuy}>Purchase</button>
          <button className="button-9" role="button" onClick={handleLot}>Start</button>
          </div>
     
  </div>

</div>
  )
    
}

export default General