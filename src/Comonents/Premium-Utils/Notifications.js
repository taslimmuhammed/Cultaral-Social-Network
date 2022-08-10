import React, { useState, useEffect, useContext } from 'react'
import Modal from 'react-modal'
import bell from '../../images/bell.png'
import { newMessages, oldMessages } from '../../Utils/Messages';
import belln from '../../images/bell-n.png'
function Notifications() {
  const [Notify, setNotify] = useState(bell)
  const [isOpen1, setIsOpen1] = useState(false);
  const currentValue = 2;
  let read = localStorage.getItem("CSNData")
  function toggleModal1() {
    setIsOpen1(!isOpen1);
  }
  const openNotifications = async () => {
    setIsOpen1(!isOpen1);
    localStorage.setItem("CSNData", currentValue)
    setNotify(bell)
  }
  useEffect(() => {
    console.log(read, currentValue)
    if(read!=currentValue) setNotify(belln)
  }, [])
  
  return (
    <div>
      <img src={Notify} className='w-9 h-9' onClick={openNotifications} />
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
              <div className='message_liner mr-1' />
              <div className='message_date text-md text-yellow-400'>New</div>
              <div className='message_liner ml-1' />
            </div>
          </div>

          {
            newMessages.map((e, index) => {
              return (
                <div className='message w-full' key={e.id}>
                  <div className='message_date text-s underline '>{e.date}</div>
                  <div className='Message Data mb-3 '>
                    - {e.data}
                  </div>
                </div>
              )
            })
          }


          <div className='message w-full'>
            <div className='message-header flex '>
              <div className='message_liner mr-1' />
              <div className='message_date text-md text-yellow-400'>Old</div>
              <div className='message_liner ml-1' />
            </div>
          </div>

          {
            oldMessages.map((e, index) => {
              return (
                <div className='message w-full' key={e.id}>
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
  )
}

export default Notifications