import React,{useState, useEffect, useContext} from 'react'
import './Premium.css'
import Loader from '../Loading/Loading'
import { useNavigate } from 'react-router-dom'
import {EthersContext} from '../../Context/EthersContext'
import Modal from 'react-modal'
import Copy from '../../images/copy.png'
import cup from '../../images/cup.png'
import bell from '../../images/bell.png'
import { Messages } from '../../Utils/Messages'

Modal.setAppElement("#root");
function Premium() {
    const navigate = useNavigate()
    const {checkSignIn,unitBalance,buyToken,enterGame, currentAccount,referanceData} = useContext(EthersContext)
    const [Units, setUnits] = useState(0)
    const [BUnits, setBUnits] = useState(0)
    const [Bunit1, setBunit1] = useState(0)
    const [ReferalBalance, setReferalBalance] = useState(0);
    const [isLoading, setisLoading] = useState(false)
    const [RFData, setRFData] = useState()
    const [In1, setIn1] = useState()
    const [Ben, setBen] = useState(0)
    const [CA, setCA] = useState()
    const [Read, setRead] = useState(false)
   const ShortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

 const [isOpen, setIsOpen] = useState(false);
 const [isOpen1, setIsOpen1] = useState(false);
    const initiaor= async()=>{
        setisLoading(true)
        try{
            const s1 = await checkSignIn()
            if(s1!=2) navigate("/")
            const units = await unitBalance()
             setUnits(units[3])
            let  refer = units[2]
            refer = refer/10
            refer = refer.toFixed(2)
            setReferalBalance(refer)
            const bunits = units[0]
            setBunit1(bunits)
            let benifit =units[1]
            benifit = benifit*2
            setBen(benifit)
        }catch(e){
            console.log(e)
        }
        setisLoading(false)
    }
    const getReferenceDetails=  async()=>{
     const x = await referanceData()
     setRFData(x)
    }
   
    const handleBuy= async()=>{
   if(window.confirm(`Proceed to buy ${In1} units ?`)==true){

    //If accpeted
          setisLoading(true)
      let x = parseInt(In1)
      console.log(x, In1)
      if(Bunit1+x>10){ return (alert("The amount exceeds your limit "))}
      else{
        try{
          await buyToken(In1)
          alert( `Succefully bought ${In1} UNIT`)
          initiaor()
          setIsOpen1(false)
       } catch(e){
       console.log(e)
        // alert("Make sure you have 10 Matic in polygon blocchain, Note: if you have Matic in other blockchains please swap to polygon")
        alert(e.data.message)
      }
      }
     setisLoading(false)
   }
   else{
    //if trasaction is cancelled by user
    alert("Buying cancelled succefully")
   }
  }

  const handleLot= async()=>{
    setisLoading(true)
   try{
      await enterGame()
      alert("1 Ticket has been used Lot, if you win your Ticket balance will increase automatically")
      initiaor()
   } catch(e){
   console.log(e)
   alert(e.data.message)
   }
   setisLoading(false)
}

    useEffect(() => {
      getReferenceDetails()
      initiaor()
    }, [])

useEffect(() => {
  if(currentAccount) setCA(ShortenAddress(currentAccount))
}, [currentAccount])


  function toggleModal() {
    setIsOpen(!isOpen);
  }
  function toggleModal1() {
    setIsOpen1(!isOpen1);
  }
    
  return isLoading? <Loader/>:
    <div className='p_main'>
      {/* Nav Part */}
      <div className='h_head flex justify-between items-center px-1'>
         <div className='title1'>CSN</div>
         <div className='p_id_main '>
         <div className='p_id ml-1' >ID :{CA}</div>
         <img className='copy-img' src={Copy} onClick={() => {navigator.clipboard.writeText(currentAccount)}}></img>
      </div>
      <img src={bell} className='w-9 h-9'  onClick={toggleModal1}/>
      <img src={cup}  className='w-9 h-8' onClick={()=>navigate('/ranking')}/>
      </div>
      {/* Nav Part End */}


        <div className='p_bottom'>
          <div className='p_details'>
              <div>
              <div className='sub_head'>Ticket Order</div>
            <div className='sub_sub'>{Bunit1}/10</div>
              </div>
            
             <div>
             <div className='sub_head'>Ticket Available</div>
            <div className='sub_sub'>{Bunit1+Ben/2-Units}</div>
             </div>
            
            </div>
            <div className='sub_head'>BENEFITS SHARING</div>
            <div className='sub_sub'>{Ben} Matic | {Ben/2}Units</div>

            <div className='sub_head'>Invite Commission</div>
            <div className='sub_sub'>{ReferalBalance} Matic</div>
              
            <div className='flex w-full justify-evenly' >
            <button className="button-9" role="button" onClick={handleBuy}>ORDER</button>
            <button className="button-9" role="button" onClick={handleLot}>ACTIVATE</button>
            </div>

            <div className='p_cards'>
                <div className='p_card'>
                  <div className='p_box px-3'>
                    <div className='p_card_head'>Level 1</div>
                    <div className='p_card_sub'>{RFData? RFData[0]: "xxx"}</div>
                  </div>
                  <div className='p_box px-3'>
                    <div className='p_card_head'>Level 2</div>
                    <div className='p_card_sub'>{RFData? RFData[1]: "xxx"}</div>
                    </div>
                  <div className='p_box px-3'>
                    <div className='p_card_head'>Level 3</div>
                    <div className='p_card_sub'>{RFData? RFData[2]: "xxx"}</div>
                    </div>
                </div>

                <div className='p_card'>

                  <div className='p_box px-3'>
                    <div className='p_card_head'>Level 4</div>
                    <div className='p_card_sub'>{RFData? RFData[3]: "xxx"}</div>
                    </div>
                  <div className='p_box px-3'>
                    <div className='p_card_head'>Level 5</div>
                    <div className='p_card_sub'>{RFData? RFData[4]: "xxx"}</div>
                    </div>
                  <div className='p_box px-3'>
                    <div className='p_card_head'>Level 6</div>
                    <div className='p_card_sub'>{RFData? RFData[5]: "xxx"}</div>
                    </div>
                </div>

                <div className='p_card'>
                  <div className='p_box px-3'>
                    <div className='p_card_head'>Level 7</div>
                    <div className='p_card_sub'>{RFData? RFData[6]: "xxx"}</div>
                    </div>
                  <div className='p_box px-3'>
                    <div className='p_card_head'>Level 8</div>
                    <div className='p_card_sub'>{RFData? RFData[7]: "xxx"}</div>
                    </div>
                  <div className='p_box px-3'>
                    <div className='p_card_head'>Level 9</div>
                    <div className='p_card_sub'>{RFData? RFData[8]: "xxx"}</div>
                    </div>
                </div>
            </div>
          
        </div>
<Modal
  isOpen={isOpen1}
  onRequestClose={toggleModal1}
  contentLabel="My dialog"
  className="mymodal"
  overlayClassName="myoverlay"
  closeTimeoutMS={500}
>
  <div className='md_1'>Enter the amount of tickets (max {10-Bunit1})</div>
  <input className='in_2 px-1' onChange={(e)=>{setIn1(e.target.value)}} type="number" placeholder='000'></input>
  <div onClick={handleBuy} className="button-x">Buy Token</div>
  <button onClick={toggleModal1} className="md_3">Close X</button>
</Modal>

<Modal
  isOpen={isOpen1}
  onRequestClose={toggleModal1}
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
      <div className='message_date text-md text-yellow-400'>Old</div>
      <div className='message_liner ml-1'/>
      </div>
    </div>

    {
      Messages.map((e, index)=>{
        return(
      <div className='message w-full'  key={e.id}>
      <div className='message_date text-s underline '>{e.date}</div>
      <div className='Message Data mb-3 '>
       - {e.data}
      </div>
    </div>    
        )
      })
    }

  <button onClick={toggleModal1} className="md_3">Close X</button>
  </div>
  
</Modal>
    </div>
}

export default Premium