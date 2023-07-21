import React from 'react'
import { Link } from 'react-router-dom'
import "./Footer.css"
const Footer = () => {
  return <>
    <div className='footer-bg relative bottom-0'>
      <div className="footer">
        <div className="footerOne">
          <div className="footerHeader">ABOUT US</div>
          <div className="footerBody">
            Ehub"•' is a global technology company specializing in disruptive
            technologies - Artificial Intelligence (Al), Machine Learning. Robotic Process
            Automation (RPA). BlockChain and Internet of Things (IOT). Ehub mission
            to enable businesses to leverage the full potential of disruptive
            technologies to stay competitive in the market.
          </div>
        </div>
        <div className="footerTwo">
          <div className="footerHeader">MENUS</div>
          <div className="footerBody">
            <Link className='footerLink'>Home</Link>
            <Link className='footerLink'>Services</Link>
            <Link className='footerLink'>Products</Link>
            <Link className='footerLink'>Career</Link>
          </div>
        </div>
        <div className="footerThree">
          <div className="footerHeader">LEARN MORE</div>
          <div className="footerBody">
            <Link className='footerLink'>About</Link>
            <Link className='footerLink'>Contact Us</Link>
          </div>
        </div>
        <div className="footerFour">
          <div className="footerHeader">ADDRESS</div>
          <div className="footerBody">
            <p>Novel Tech Park, 1st Floor, Hosur Rd,
              Kudlu gate, Bengaluru, Karnataka
              560068
              Phone: 0804-717-8999
              Email: hi@Ehub.com</p>
            <div><p>SOCIAL MEDIA</p>

            </div>
          </div>
        </div>
      </div>
      <div className="copyRight">
        <h5>@ copyright 2017 - 2022 | Ehub is a brand of THINK AHEAD INNOVATIONS PVT. LTD. I All Rights Reserved</h5>
      </div>
    </div>
  </>
}

export default Footer