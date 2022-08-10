import React, { useState, useEffect, useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { EthersContext } from '../../Context/EthersContext'
import Loader from '../Loading/Loading'
import './Admin.css'
function Admin() {
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false)
    const { checkOwner, changeOwner, changeLimit, getAdminDetails,withDrawMoney,FInitiator } = useContext(EthersContext)
    const [Address, setAddress] = useState()
    const [Limit, setLimit] = useState()
    const [Data, setData] = useState()
    const initiator = async () => {
        setisLoading(true)
        try {
            await FInitiator()
            //const v = await checkOwner()
            // if (v != true) {
            //     alert("Not Authorized")
            //     navigate('/')
            //     console.log("Hello")
            // }else{
                const datas = await getAdminDetails()
                console.log(datas)
                setData(datas)
            //}

        } catch (e) {
            console.log(e)
            alert(e)
        }
        setisLoading(false)
    }

    const changeOwner1 = async () => {
        setisLoading(true)
        if (Limit == null) return alert("fill in something")
        await changeOwner(Address)
        setisLoading(false)
        initiator()
    }

    const changeLimit1 = async () => {
        setisLoading(true)
        if (Limit == null) { return alert("fill in something") }
        else {
            await changeLimit(Limit)
            setisLoading(false)
            initiator()
            }
    }

    const withDr = async () => {
        var answer = window.confirm("Sure withdraw?");
        if (answer) {
            setisLoading(true)
            await withDrawMoney()
            setisLoading(false)
        }
        else {
            alert("withdrawal cancelled")
        }
    }

    useEffect(() => {
        initiator()
    }, [])

    return isLoading ? <Loader /> :
        <div> 
           {Data && <div>
            <div className='h_head'> Admin Panel</div>
            <div className='h_box  text-white'>
                <div> Total number of tokens Supplied:</div>
                <div className='text-green-400'>{Data.totalSupply}</div>

                <div> Maximum Limit of Tokens:</div>
                <div className='text-green-400'>{Data.unitLimit}</div>
                

                <div className='flex justify-around w-full text-center mb-2'>
                    <div>
                        <div> Month Number:</div>
                        <div className='text-green-400'>{Data.currentMonth}</div>
                    </div>

                    <div>
                        <div> Days Left:</div>
                        <div className='text-green-400'>{30 - Data.days}</div>
                    </div>
                </div>

                <div className='mb-1'>Transfer ownership</div>
                <input placeholder="new Address" className='text-black' onChange={(e) => { setAddress(e.target.value) }}></input>
                <button className="button-8 mt-1" role="button" onClick={changeOwner1} >Change Owner</button>
                <div>Change Unit max limit</div>
                <input placeholder="new Limit" className='text-black' onChange={(e) => { setLimit(e.target.value) }} type="number"></input>
                <button  className="button-8 mt-1" role="button" onClick={changeLimit1}>Change Limit</button>
                
                <button className="button-24" role="button" onClick={withDr}>Withdraw Money</button>
                {/* <button class="button-8" role="button" onClick={withDr}>WithDraw Balance USDT</button> */}
            </div>
        </div>}
    </div>
}

export default Admin