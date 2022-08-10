import React,{useState, useEffect, useContext} from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import {EthersContext} from '../../Context/EthersContext'
import Loader from '../Loading/Loading'
function Home() {

  // const [Selected, setSelected] = useState(true)
  const [refferalId, setrefferalId] = useState()
  const [isLoading, setisLoading] = useState(false)
  const [x, setx] = useState()
  const navigate = useNavigate()
  const {signIn} = useContext(EthersContext)
  const handleSubmit= async()=>{
      setisLoading(true)
      try{
        let refferal ;
        if(refferalId==null)  refferal= "0x0000000000000000000000000000000000000000"
        else refferal = refferalId
       await signIn(refferal, true)
      //window.location.reload();
      navigate("/premium")
      }catch(e){
        console.log(e)
      }
    setisLoading(false)
    
  }
  return (
    <div>
      {
        isLoading?  <Loader/>:
        <div> 
        <div className='h_box'>


          <div className='h_head flex justify-between items-center px-4'>
         <div className='title1'>CSN</div>
         <div>
          <a href="https://ipfs.io/ipfs/bafybeicqg5odcvtdnc2xmycfgxy6egrigh7ppzdxbunjznbyji6opsrbla" target="_blank">
          <button className="button-82-pushable mb-2" role="button">
      <span className="button-82-shadow"></span>
  <span className="button-82-edge"></span>
  <span className="button-82-front text">
    Read Me
  </span>
</button>
          </a>
         
         </div>

          </div>

       <div className='w-full flex flex-column justify-center items-center'>
        <div className='wel-box'>
        Welcome to smart contract automated financial allocation dapp .
        </div>
          <div className='h51 mt-5'>Refferal ID [*optional]</div>
          <input className='h_in1 bg-transparent px-1'
           placeholder='0x0000000000000000000000000000000000000000' 
           onChange={(e)=>{
             setrefferalId(e.target.value)
           }}></input>
          <div className='signIn_btn' onClick={handleSubmit}>Log In</div>
        </div>
        
        </div>
      </div>
        
      }
     
</div>
  )
}

export default Home


// function Home() {

//   const [Selected, setSelected] = useState(true)
//   const [refferalId, setrefferalId] = useState()
//   const [isLoading, setisLoading] = useState(false)
//   const [x, setx] = useState()
//   const navigate = useNavigate()
//   const {signIn,Language} = useContext(EthersContext)
//   const handleSubmit= async()=>{
//     setisLoading(true)
//     try{
//       let refferal ;
//       if(refferalId==null)  refferal= "0x0000000000000000000000000000000000000000"
//       else refferal = refferalId
//      await signIn(refferal, x)
//     window.location.reload();
//     }catch(e){
//       console.log(e)
//     }
//   setisLoading(false)
//   }
//   return (
//     <div>
//       {
//         isLoading?  <Loader/>:
//           Selected?      <div>
//           <div className='h_head'>{Language[30]}</div>
//           <div className='h_box'>
//             <div className='h_btn' onClick={()=>{
//               setx(true)
//               setSelected(false)
//             }}>{Language[31]}</div>
  
//             <div className='h_btn' onClick={()=>{
//               setx(false)
//               setSelected(false)
//             }}>{Language[32]}</div>
//           </div>
//         </div>:
//         <div>
//         <div className='h_head'>{Language[33]}</div>
//          <div className='h_head'>{Language[34]}</div>
         
//         <div className='h_box'>
//           <input className='h_btn bg-transparent px-1'
//            placeholder='referal Id' 
//            onChange={(e)=>{
//              setrefferalId(e.target.value)
//            }}></input>
//           <div className='h_btn' onClick={handleSubmit}>{Language[35]}</div>
//         </div>
//       </div>
        
//       }
     
// </div>
//   )
// }