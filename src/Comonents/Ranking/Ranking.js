import React,{useState, useEffect, useContext} from 'react'
import {EthersContext} from '../../Context/EthersContext'
import Loader from '../Loading/Loading'
import { useNavigate } from 'react-router-dom'
import './Ranking.css'
import Copy from '../../images/copy.png'

function Ranking() {
    const [isLoading, setisLoading] = useState(false)
    const navigate = useNavigate()
    const {getAllrankDetails, getDaysLeft,FInitiator} = useContext(EthersContext)
    const [Data, setData] = useState()
    const [Days, setDays] = useState(0)
   const initiator = async()=>{
    setisLoading(true)
     await FInitiator()
    let data = await getAllrankDetails()
    let days = await getDaysLeft()
    setDays(days)
     setData(data)
    setisLoading(false)
   }
   useEffect(() => {
     initiator()
   }, [])
   
    //getAllrankDetails
   return (
    isLoading? <Loader/> :<div>
        <div className='h_box2'>

        <div className='h_head flex justify-between items-center px-4'>
         <div className='title1'>CSN</div>
         <div className='title2'> Top 9 ranks</div>
        </div>
         {/* End of navbar */}
        {
             Data && 
              <div className='r-table'>
            <div  className='r-table-sub'>
                <div className='ranks bold py-1'>Rank</div>
                <div className='addresses bold py-1'>Wallet Address</div>
            </div>
            <div className='r-table-sub'>
                <div className='ranks'>Mythic</div>
                <div className='addresses'>{Data.winners[0] ? <div className='flex w-full justify-center'>{Data.winners[0].address} 
                <img className='copy-img' src={Copy} onClick={() => {navigator.clipboard.writeText(Data.winners[0].fullAddress)}}></img>
                </div> : "0x000...0000"}
                </div>
            </div>
            <div  className='r-table-sub'>
                <div className='ranks'>Lengend</div>
                <div className='addresses'>{Data.winners[1] ? <div className='flex w-full justify-center'>{Data.winners[1].address} 
                <img className='copy-img' src={Copy} onClick={() => {navigator.clipboard.writeText(Data.winners[1].fullAddress)}}></img>
                </div> : "0x000...0000"}</div>
            </div>
            <div className='r-table-sub'>
                <div  className='ranks'>Epic</div>
                <div className='addresses'>{Data.winners[2] ? <div className='flex w-full justify-center'>{Data.winners[2].address} 
                <img className='copy-img' src={Copy} onClick={() => {navigator.clipboard.writeText(Data.winners[2].fullAddress)}}></img>
                </div> : "0x000...0000"}</div>
            </div>
            <div className='r-table-sub'>
                <div  className='ranks'>Master</div>
                <div className='addresses'>{Data.winners[3] ? <div className='flex w-full justify-center'>{Data.winners[3].address} 
                <img className='copy-img' src={Copy} onClick={() => {navigator.clipboard.writeText(Data.winners[3].fullAddress)}}></img>
                </div> : "0x000...0000"}</div>
            </div>
            <div className='r-table-sub'>
                <div  className='ranks'>Elite</div>
                <div className='addresses'>{Data.winners[4] ? <div className='flex w-full justify-center'>{Data.winners[4].address} 
                <img className='copy-img' src={Copy} onClick={() => {navigator.clipboard.writeText(Data.winners[4].fullAddress)}}></img>
                </div> : "0x000...0000"}</div>
            </div>   
            <div className='r-table-sub'>
                <div  className='ranks'>Warrior</div>
                <div className='addresses'>{Data.winners[5] ? <div className='flex w-full justify-center'>{Data.winners[5].address} 
                <img className='copy-img' src={Copy} onClick={() => {navigator.clipboard.writeText(Data.winners[5].fullAddress)}}></img>
                </div> : "0x000...0000"}</div>
            </div>
            <div className='r-table-sub'>
                <div  className='ranks'>Diamond</div>
                <div className='addresses'>{Data.winners[6] ? <div className='flex w-full justify-center'>{Data.winners[6].address} 
                <img className='copy-img' src={Copy} onClick={() => {navigator.clipboard.writeText(Data.winners[6].fullAddress)}}></img>
                </div> : "0x000...0000"}</div>
            </div>
            <div className='r-table-sub'>
                <div className='ranks'>Gold</div>
                <div className='addresses'>{Data.winners[7] ? <div className='flex w-full justify-center'>{Data.winners[7].address} 
                <img className='copy-img' src={Copy} onClick={() => {navigator.clipboard.writeText(Data.winners[7].fullAddress)}}></img>
                </div> : "0x000...0000"}</div>
            </div>
            <div className='r-table-sub'>
                <div className='ranks'>Silver</div>
                <div className='addresses'>{Data.winners[8] ? <div className='flex w-full justify-center'>{Data.winners[8].address} 
                <img className='copy-img' src={Copy} onClick={() => {navigator.clipboard.writeText(Data.winners[8].fullAddress)}}></img>
                </div> : "0x000...0000"}</div>
            </div>
            <div className='flex justify-between w-full mt-2 px-4'>
                <div>*your rank is - {Data.myRank}</div>
                <div>*Days Left - {Days}</div>
            </div>
            
     </div>
        }

        </div>
    </div>
   )
}

export default Ranking