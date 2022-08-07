import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Home from '../Comonents/Home/Home'
import { EthersContext } from '../Context/EthersContext'

function HomePage() {
  const navigate = useNavigate()
  const {currentAccount, checkIfWalletIsConnect} = useContext(EthersContext)
  const checker = async() => {
     const  s1 = await checkIfWalletIsConnect()
          if(s1===0){
      navigate("/landing")
     }else{
      const s2 =await checkSignIn()
      console.log(s2)
      if(s2===1) navigate('/general')
      if(s2===2) navigate('/premium')
     }
  }

  useEffect(() => {
   checker()
  }, [currentAccount])
  return (
    <div>
      <Home></Home>
    </div>
  )
}

export default HomePage