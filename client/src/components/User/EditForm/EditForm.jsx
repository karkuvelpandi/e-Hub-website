import { useId, useState } from "react"
import React from 'react'
import { useEffect } from "react"
import { Link, Navigate, useParams } from 'react-router-dom'
import './EditForm.css'
import Axios from 'axios'
const EditForm = () => {
  let selectedId = useParams().id
  let [nameErr, setNameErr] = useState(null)
  let [emailErr, setEmailErr] = useState(null)
  let [mobileErr, setMobileErr] = useState(null)
  let [passwordErr, setPasswordErr] = useState(null)
  let [stateErr, setStateErr] = useState(null)
  let [cityErr, setCityErr] = useState(null)
  let [descriptionErr, setDescriptionErr] = useState(null)
  // let [imageErr, setImageErr] = useState(null)
  let [submitted, setSubmitted] = useState(false)
  let [selectedUser, setSelectedUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    state: "",
    city: "",
    description: "",
    image: ""
  })

  useEffect(() => {
    Axios.get(`https://good-gold-ray-cape.cyclic.app/user/${selectedId}`)
      .then((response) => {
        setSelectedUser(response.data)
      })
      .catch((err) => { console.log(err) })
      
  }, [selectedId])

  let getData = (event) => {
    setSelectedUser({ ...selectedUser, [event.target.name]: event.target.value })
    validateFun(selectedUser)
  }

  let submitHandler = (e) => {
    e.preventDefault()
   let flag = validateFun(selectedUser)
    console.log(flag);
   if(flag === (true)) {
      let url = `https://cute-hare-attire.cyclic.app/user/${selectedId}`
      Axios.put(url, selectedUser)
        .then((response) => {
          setSubmitted(true)
          alert("Profile successfully Updated...")
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
    else if (mobile.length != 10 ) {
      console.log(mobile.length);
      setMobileErr("Enter 10 character only")
    }
    else if (mobile.length === 10) {
      setMobileErr("")
    }
    if (!password) {
      setPasswordErr("Please enter password")
    }
    // if (!/^[A-Z]/.test(password)) {
    //   setPasswordErr("Must have atleast 1 capital letter")
    // }
    // if (!/^(?=.*\d)/.test(password)) {
    //   setPasswordErr("Must have atleast 1 number ")
    // }
    // else if (password.length < 4 || password.length > 10) {
    //   setPasswordErr("Password requird min 4 to 10 characters")
    // }
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
    if((nameErr===null||nameErr==="")&&(emailErr===null||emailErr==="")&&(mobileErr===null||mobileErr==="")&&(stateErr===null||stateErr==="")&&(cityErr===null||cityErr==="")&&(descriptionErr===null||descriptionErr==="") ){
      return true
    }
  }

  let changeImage = (event) => {
    let imageFile = event.target.files[0]
    console.log(event)
    let reader = new FileReader()
    reader.readAsDataURL(imageFile)
    reader.addEventListener("load", () => {
      if (reader.result) {
        setSelectedUser({ ...selectedUser, image: reader.result })
      }
    })
  };

  return <>
    
{/* <pre>{JSON.stringify(selectedUser)}</pre> */}
    <div className="container container1 mt-5">
      <div className="row">
        <div className="col-md-12 col-bg">
          <center><h2 className="h1">Update Profile</h2></center>
          {
            submitted? <Navigate to="/userAdmin"/>:<>
             <form onSubmit={submitHandler}>
            <div className="form-group">
              <input type="text" className="form-control" value={selectedUser.name} name="name" onChange={getData} placeholder='Name' />
              <h6 className="text-danger">{nameErr}</h6>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" value={selectedUser.email} name="email" onChange={getData} placeholder='E-mail' />
              <h6 className="text-danger">{emailErr}</h6>
            </div>
            <div className="form-group">
              <input type="number" className="form-control" value={selectedUser.mobile} name="mobile" onChange={getData} placeholder='Mobile-Number' />
              <h6 className="text-danger">{mobileErr}</h6>
            </div>
            {/* <div className="form-group">
              <input type="password" autoComplete="true" value={selectedUser.password} className="form-control" name="password" onChange={getData} placeholder='Password' />
              <h6 className="text-danger">{passwordErr}</h6>
            </div> */}
            <div className="form-group">
              <input type="text" className="form-control" value={selectedUser.state} name="state" onChange={getData} placeholder='State' />
              <h6 className="text-danger">{stateErr}</h6>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" value={selectedUser.city} name="city" onChange={getData} placeholder='City' />
              <h6 className="text-danger">{cityErr}</h6>
            </div>
            <div className="form-group">
              <textarea className="form-control" value={selectedUser.description} name="description" onChange={getData} placeholder='Description' />
              <h6 className="text-danger">{descriptionErr}</h6>
            </div>
            <div className="form-group">
              <input type="file" className="form-control" name="image" onChange={changeImage} placeholder='Image' /><img src={selectedUser.image} height="50px" alt="no pic" />
              {/* <h6 className="text-danger">{imageErr}</h6> */}
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

export default EditForm