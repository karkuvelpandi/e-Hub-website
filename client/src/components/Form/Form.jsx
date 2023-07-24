import React from 'react'
import './Form.css'
import Axios from 'axios'
import { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import success from '../../assets/success.gif'
const Form = () => {
  let [contact, setContact] = useState({
    name: "",
    email: "",
    mobile: "",
    message: ""
  })
  let [submitted, setSubmitted] = useState(false)
  const toggle = () => {
    setSubmitted(!submitted)
  }

  const getData = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    let url = `https://cute-hare-attire.cyclic.app/contact/create`
    Axios.post(url, contact)
      .then((resp) => {
        setSubmitted(true)
      })
      .catch(() => { })
  }
  return <>
    <div className="form-container">
      <div className="form-left">
        <h1>GET IN TOUCH</h1>
        <h3 className='h3-text'>Please complete the form and we will get back to you.</h3>
      </div>
      {
        submitted ? <><div>
          <Modal isOpen={submitted} className="detailCard" toggle={toggle}  >
            <ModalHeader className='modelHead'>
              <img src={success} className="modelHeadImg" alt="Success..." />
            </ModalHeader>
            <ModalBody className="modelBody">
              <h1 >
                Success...
              </h1>
            </ModalBody>
            <ModalFooter className='modelFooter'>
              <Button onClick={toggle}>OK</Button>
            </ModalFooter>
          </Modal>
        </div>
        </> : null
      }
      {
        submitted ? <><h1 className='sucess'>Successful...!&#128522;<br /><br /><span className='sucess-span'>Thanks for your intrest we will get back to you soon</span></h1></> : <>
          <form onSubmit={submitHandler} className="form-right">
            <label className='label'>Name*</label>
            <input className='input' name='name' type="text" onChange={getData} placeholder='Enter Your Name' /><br />
            <label className='label'>Email*</label>
            <input className='input' name='email' type="email" onChange={getData} placeholder='Enter Your Email' /><br />
            <label className='label'>Mobile Number*</label>
            <input className='input' name='mobile' type="number" onChange={getData} placeholder='Enter Your Mobile Number' /><br />
            <label className='label'>Message</label>
            <textarea className='input textarea' name="message" onChange={getData} cols="50" rows="4" placeholder='Enter Message'></textarea><br />
            <input className='input btn' type="submit" value='Contact Now' />
          </form>
        </>
      }

    </div>

  </>
}

export default Form