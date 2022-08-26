import React, { useState, useEffect, useContext } from 'react'
import './Premium.css'
import Loader from '../Loading/Loading'
import { useNavigate } from 'react-router-dom'
import { EthersContext } from '../../Context/EthersContext'
import Modal from 'react-modal'
import Copy from '../../images/copy.png'
import cup from '../../images/cup.png'
import { Messages } from '../../Utils/Messages'
import Reference from '../Premium-Utils/Reference'
import Notifications from '../Premium-Utils/Notifications'

Modal.setAppElement("#root");
function Premium() {
  const navigate = useNavigate()
  const { checkSignIn, unitBalance, buyToken, enterGame, currentAccount, referanceData, FInitiator } = useContext(EthersContext)
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
  const initiaor = async () => {
    await FInitiator()
    setisLoading(true)
    try {
      const s1 = await checkSignIn()
      if (s1 != 2) navigate("/")
      const units = await unitBalance()
      setUnits(units[3])
      let refer = units[2]
      refer = refer / 10
      refer = refer.toFixed(2)
      setReferalBalance(refer)
      const bunits = units[0]
      setBunit1(bunits)
      let benifit = units[1]
      benifit = benifit * 2
      setBen(benifit)
    } catch (e) {
      console.log(e)
    }
    setisLoading(false)
  }

  const handleBuy = async () => {
    if (window.confirm(`Proceed to buy ${In1} ticket ?`) == true) {
      //If accpeted
        setisLoading(true)
        let x = parseInt(In1)
        console.log(x, In1)
        if (Bunit1 + x > 10) { return (alert("The amount exceeds your limit ")) }
        else {
          try {
            await buyToken(In1)
            initiaor()
            setIsOpen(false)
          } catch (e) {
            console.log(e)
            alert("Make sure you have 10 Matic in polygon blockhain, Note: if you have Matic in other blockchains please swap to polygon")
            alert(e.data.message)
          }
        }
        setisLoading(false)
    }
    else {
      //if trasaction is cancelled by user
      alert("Buying cancelled succefully")
    }
  }

  const handleLot = async () => {
    setisLoading(true)
    try {
      await enterGame()
      initiaor()
    } catch (e) {
      console.log(e)
      alert(e.data.message)
    }
    setisLoading(false)
  }

  useEffect(() => {
    initiaor()
  }, [])

  useEffect(() => {
    if (currentAccount) setCA(ShortenAddress(currentAccount))
  }, [currentAccount])


  function toggleModal() {
    console.log("jhabs")
    setIsOpen(!isOpen);
  }


  return isLoading ? <Loader /> :
    <div className='p_main'>
      {/* Nav Part */}
      <div className='p_head flex justify-between items-center px-1 '>
        <div className='title1'>CSN</div>
        <div className='p_id_main '>
          <div className='p_id ml-1' >ID :{CA}</div>
          <img className='copy-img' src={Copy} onClick={() => { navigator.clipboard.writeText(currentAccount)}}></img>
        </div>
        <a href="https://ipfs.io/ipfs/bafybeicqg5odcvtdnc2xmycfgxy6egrigh7ppzdxbunjznbyji6opsrbla" target="_blank" className='a-1'><div className='read-btn '>Read-Me</div></a>
      </div>
      {/* Nav Part End */}


      <div className='p_bottom'>
        <div className='flex justify-between w-full px-2 py-3'>
        <Notifications/>
        <img src={cup} className='w-9 h-8' onClick={() => navigate('/ranking')} />
        </div>
     
        <div className='p_details'>
          <div>
            <div className='sub_head'>Ticket Order</div>
            <div className='sub_sub'>{Bunit1}/10</div>
          </div>

          <div>
            <div className='sub_head'>Ticket Available</div>
            <div className='sub_sub'>{Bunit1 + Ben / 2 - Units}</div>
          </div>

        </div>
        <div className='sub_head'>Benefits Sharing</div>
        <div className='sub_sub'>{Ben} Matic | {Ben / 2} Ticket</div>

        <div className='sub_head'>Invite Commission</div>
        <div className='sub_sub'>{ReferalBalance} Matic</div>

        <div className='flex w-full justify-evenly' >
          <button className="button-9" role="button" onClick={toggleModal}>ORDER</button>
          <button className="button-9" role="button" onClick={handleLot}>ACTIVATE</button>
        </div>

        <Reference />

      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div className='md_1'>Enter the amount of tickets (max {10 - Bunit1})</div>
        <input className='in_2 px-1' onChange={(e) => { setIn1(e.target.value) }} type="number" placeholder='000'></input>
        <div onClick={handleBuy} className="button-x">Buy Ticket</div>
        <button onClick={toggleModal} className="md_3">Close X</button>
      </Modal>

    </div>
}

export default Premium