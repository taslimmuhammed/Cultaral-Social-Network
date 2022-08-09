import React,{useState, useEffect, useContext} from 'react'
import {EthersContext} from '../../Context/EthersContext'
import Loader from '../Loading/Loading'
import { useNavigate } from 'react-router-dom'
import './Ranking.css'
function Ranking() {
    const [isLoading, setisLoading] = useState(false)
    const navigate = useNavigate()
    const {getAllrankDetails, getDaysLeft} = useContext(EthersContext)
    const [Data, setData] = useState()
    const [Days, setDays] = useState(0)
   const initiator = async()=>{
    setisLoading(true)
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
                <div className='addresses'>{Data.winners[0] ? Data.winners[0].address : "0x000...0000"}</div>
            </div>
            <div  className='r-table-sub'>
                <div className='ranks'>Lengend</div>
                <div className='addresses'>{Data.winners[1] ? Data.winners[1].address : "0x000...0000"}</div>
            </div>
            <div className='r-table-sub'>
                <div  className='ranks'>Epic</div>
                <div className='addresses'>{Data.winners[2] ? Data.winners[2].address : "0x000...0000"}</div>
            </div>
            <div className='r-table-sub'>
                <div  className='ranks'>Master</div>
                <div className='addresses'>{Data.winners[3] ? Data.winners[3].address : "0x000...0000"}</div>
            </div>
            <div className='r-table-sub'>
                <div  className='ranks'>Elite</div>
                <div className='addresses'>{Data.winners[4] ? Data.winners[4].address : "0x000...0000"}</div>
            </div>   
            <div className='r-table-sub'>
                <div  className='ranks'>Warrior</div>
                <div className='addresses'>{Data.winners[5] ? Data.winners[5].address : "0x000...0000"}</div>
            </div>
            <div className='r-table-sub'>
                <div  className='ranks'>Diamond</div>
                <div className='addresses'>{Data.winners[6] ? Data.winners[6].address : "0x000...0000"}</div>
            </div>
            <div className='r-table-sub'>
                <div className='ranks'>Gold</div>
                <div className='addresses'>{Data.winners[7] ? Data.winners[7].address : "0x000...0000"}</div>
            </div>
            <div className='r-table-sub'>
                <div className='ranks'>Silver</div>
                <div className='addresses'>{Data.winners[8] ? Data.winners[8].address : "0x000...0000"}</div>
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