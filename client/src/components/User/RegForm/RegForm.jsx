import { useState } from "react"
import React from 'react'
import { useEffect } from "react"
import { Link,Navigate } from 'react-router-dom'
import './RegForm.css'
import Axios from 'axios'
const RegForm = () => {
  let [nameErr, setNameErr] = useState(null)
  let [emailErr, setEmailErr] = useState(null)
  let [mobileErr, setMobileErr] = useState(null)
  let [passwordErr, setPasswordErr] = useState(null)
  let [stateErr, setStateErr] = useState(null)
  let [cityErr, setCityErr] = useState(null)
  let [descriptionErr, setDescriptionErr] = useState(null)
  let [imageErr, setImageErr] = useState(null)
  let [valid, setValid] = useState(false)
  let [submitted, setSubmitted] = useState(false)
  let [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    state: "",
    city: "",
    description: "",
    image: "",
  })

  let getData = (event) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    if (valid === true) {
      validateFun(userDetails)
    }
  }, [userDetails])

  let submitHandler = (e) => {
    e.preventDefault()
    setValid(true)
    let submit = validateFun(userDetails)
    if (submit === true) {
      console.log(submit);
      let url = "https://cute-hare-attire.cyclic.app/user/register"
      Axios.post(url, userDetails)
        .then((response) => {
          setSubmitted(true)
          alert("Register successfully completed...")
        })
        .catch((err) => {
          console.log(err)
        })

    }
  }
  let validateFun = (value) => {
    let name = value.name
    let email = value.email
    let mobile = value.mobile
    let password = value.password
    let state = value.state
    let city = value.city
    let description = value.description
    let image = value.image

    if (name === "") {
      setNameErr("please enter name")
    }
    else if (name.length <= 4 || name.length >= 15) {
      setNameErr("please enter min 4 and max 10 character only")
    }
    else if (name.length >= 4 || name.length <= 15) {
      setNameErr("")
    }
    if (email === "") {
      setEmailErr("please enter email")
    }
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(email)) {
      setEmailErr('Invalid email address')
    }
    else {
      setEmailErr("")
    }
    if (mobile === "") {
      setMobileErr("please enter Mobile Number")
    }
    else if (mobile.length !== 10) {
      setMobileErr("please enter 10 Numbers")
    }
    else if (mobile.length === 10) {
      setMobileErr("")
    }
    if (!password) {
      setPasswordErr("Please enter password")
    }
    if (!/^[A-Z]/.test(password)) {
      setPasswordErr("Must have atleast 1 capital letter")
    }
    if (!/^(?=.*\d)/.test(password)) {
      setPasswordErr("Must have atleast 1 number ")
    }
    else if (password.length < 4 || password.length > 10) {
      setPasswordErr("Password requird min 4 to 10 characters")
    }
    else {
      setPasswordErr("")
    }
    if (state === "") {
      setStateErr("please enter State")
    }
    else if (state.length < 4) {
      setStateErr("please enter min 4 character")
    }
    else if (state.length >= 4) {
      setStateErr("")
    }
    if (city === "") {
      setCityErr("please enter City")
    }
    else if (city.length < 4) {
      setCityErr("please enter min 4 character")
    }
    else if (city.length >= 4) {
      setCityErr("")
    }
    if (description === "") {
      setDescriptionErr("please enter Description")
    }
    else if (description.length < 4) {
      setDescriptionErr("please enter min 4 character")
    }
    else if (description.length >= 4) {
      setDescriptionErr("")
    }

    if (image === "") {
      setImageErr("Please select image")
    }
    else if (image.length >= 4) {
      setImageErr("")
    }

    if (nameErr === "" && emailErr === "" && mobileErr === "" && passwordErr === "" && stateErr === "" && cityErr === "" && descriptionErr === "" && imageErr === "") {
      return true
    }
  }

  let changeImage = (event) => {
    let imageFile = event.target.files[0]
    console.log(event);
    let reader = new FileReader()
    reader.readAsDataURL(imageFile)
    reader.addEventListener("load", () => {
      if (reader.result) {
        setUserDetails({ ...userDetails, image: reader.result })
      }
    })
  };

  return <>
    <div className="container container1 mt-5">
      <div className="row">
        <div className="col-md-12 col-bg">
          <center><h2 className="h1">Registration Form</h2></center>
          {
            submitted?<Navigate to="/userLogin"/>:<>
            <form onSubmit={submitHandler}>
            <div className="form-group">
              <input type="text" className="form-control" name="name" onChange={getData} placeholder='Name' />
              <h6 className="text-danger">{nameErr}</h6>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" name="email" onChange={getData} placeholder='E-mail' />
              <h6 className="text-danger">{emailErr}</h6>
            </div>
            <div className="form-group">
              <input type="number" className="form-control" name="mobile" onChange={getData} placeholder='Mobile-Number' />
              <h6 className="text-danger">{mobileErr}</h6>
            </div>
            <div className="form-group">
              <input type="password" autoComplete="true" className="form-control" name="password" onChange={getData} placeholder='Password' />
              <h6 className="text-danger">{passwordErr}</h6>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" name="state" onChange={getData} placeholder='State' />
              <h6 className="text-danger">{stateErr}</h6>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" name="city" onChange={getData} placeholder='City' />
              <h6 className="text-danger">{cityErr}</h6>
            </div>
            <div className="form-group">
              <textarea className="form-control" name="description" onChange={getData} placeholder='Description' />
              <h6 className="text-danger">{descriptionErr}</h6>
            </div>
            <div className="form-group">
              <input type="file" className="form-control" name="image" onChange={changeImage} placeholder='Image' />
              <h6 className="text-danger">{imageErr}</h6>
            </div>
            <input type="submit" value="Register" className='btn btn-success' />
          </form>
            </>
          }
          
          <p className="">Already have a account ? <Link to="/login">Log in</Link></p>
        </div>

      </div>
    </div>
  </>
}

export default RegForm