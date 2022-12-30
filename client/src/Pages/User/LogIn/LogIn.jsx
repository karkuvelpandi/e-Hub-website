import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import "./LogIn.css"
import Axios from 'axios'
const LogIn = () => {
  let [emailErr, setEmailErr] = useState(null)
  let [passwordErr, SetPasswordErr] = useState(null)
  let [valid, setValid] = useState(false)
  let [submitted, setSubmitted] = useState(false)
  let [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
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
      let url = "https://cute-hare-attire.cyclic.app/user/login"
      Axios.post(url, userDetails).then((resp) => {
        setSubmitted(true)
        console.log(resp.data);
       
        alert(resp.data.result)
        let token = resp.data.token
        localStorage.setItem("token", token)

      })
        .catch((error) => {
          console.log(error.response.data)
          setEmailErr(error.response.data.msg)
        })
    }
  }
  let validateFun = (value) => {
    let email = value.email
    let password = value.password

    if (email === "") {
      setEmailErr("please enter email")
    }
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(email)) {
      setEmailErr('Invalid email address')
    }
    else {
      setEmailErr("")
    }
    if (!password) {
      SetPasswordErr("Please enter password")
    }
    if (!/^[A-Z]/.test(password)) {
      SetPasswordErr("Must have atleast 1 capital letter")
    }
    if (!/^(?=.*\d)/.test(password)) {
      SetPasswordErr("Must have atleast 1 number ")
    }
    else if (password.length < 4 || password.length > 10) {
      SetPasswordErr("Password requird min 4 to 10 characters")
    }
    else {
      SetPasswordErr("")
  
    }
    if((passwordErr===null||passwordErr==="")&&(emailErr===null||emailErr==="")){
      setEmailErr("") && SetPasswordErr("")
    }
    if (emailErr === "" && passwordErr === "") {
      return true
    }

  }

  return <>
    <div className="container container1 mt-5">
      <div className="row">
        <div className="col-md-12 bg-1">
          <center><h2 className="h1">Log in Form</h2></center>
          <center><h5 style={{color:'blue'}}>Log in to view Admin Table</h5></center>
          {
            submitted ? <Navigate to="/userAdmin" /> : <>
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <input type="text" className="form-control" name="email" onChange={getData} placeholder='E-mail' />
                  <h6 className="text-danger">{emailErr}</h6>
                </div>
                <div className="form-group">
                  <input type="password" autoComplete="true" className="form-control" name="password" onChange={getData} placeholder='Password' />
                  <h6 className="text-danger">{passwordErr}</h6>
                </div>
                <input type="submit" value="Log In" className='btn btn-success' />
              </form>
            </>
          }

          &nbsp;&nbsp;&nbsp;<p>Didn't have a account ? <Link to="/">Register here</Link> </p>
        </div>
      </div><br />
      <div className="row">
      </div>
    </div>
  </>
}

export default LogIn