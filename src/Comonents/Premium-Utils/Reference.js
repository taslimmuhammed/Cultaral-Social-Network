import React, { useState, useEffect, useContext } from 'react'
import { EthersContext } from '../../Context/EthersContext'

function Reference() {
    const { referanceData, FInitiator } = useContext(EthersContext)
    const [RFData, setRFData] = useState()

    const getReferenceDetails = async () => {
        await FInitiator()
        const x = await referanceData()
        setRFData(x)
    }
    useEffect(() => {
        getReferenceDetails()
    }, [])
    return (
        <div className='p_cards'>
            <div className='p_card'>
                <div className='p_box px-3'>
                    <div className='p_card_head'>Level 1</div>
                    <div className='p_card_sub'>{RFData ? RFData[0] : "xxx"}</div>
                </div>
                <div className='p_box px-3'>
                    <div className='p_card_head'>Level 2</div>
                    <div className='p_card_sub'>{RFData ? RFData[1] : "xxx"}</div>
                </div>
                <div className='p_box px-3'>
                    <div className='p_card_head'>Level 3</div>
                    <div className='p_card_sub'>{RFData ? RFData[2] : "xxx"}</div>
                </div>
            </div>

            <div className='p_card'>

                <div className='p_box px-3'>
                    <div className='p_card_head'>Level 4</div>
                    <div className='p_card_sub'>{RFData ? RFData[3] : "xxx"}</div>
                </div>
                <div className='p_box px-3'>
                    <div className='p_card_head'>Level 5</div>
                    <div className='p_card_sub'>{RFData ? RFData[4] : "xxx"}</div>
                </div>
                <div className='p_box px-3'>
                    <div className='p_card_head'>Level 6</div>
                    <div className='p_card_sub'>{RFData ? RFData[5] : "xxx"}</div>
                </div>
            </div>

            {/* <div className='p_card'>
                <div className='p_box px-3'>
                    <div className='p_card_head'>Level 7</div>
                    <div className='p_card_sub'>{RFData ? RFData[6] : "xxx"}</div>
                </div>
                <div className='p_box px-3'>
                    <div className='p_card_head'>Level 8</div>
                    <div className='p_card_sub'>{RFData ? RFData[7] : "xxx"}</div>
                </div>
                <div className='p_box px-3'>
                    <div className='p_card_head'>Level 9</div>
                    <div className='p_card_sub'>{RFData ? RFData[8] : "xxx"}</div>
                </div>
            </div> */}
        </div>
    )
}

export default Reference