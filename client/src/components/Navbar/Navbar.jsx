import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import homeLogo from '../../assets/logo.png'
import './Navbar.css'
import Dropdown from './DropDown/Dropdown'
import { MenuItems } from './DropDown/MenuItems'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [dropDownProduct, setDropdownProduct] = useState(false)
  const [dropDownUser, setDropdownUser] = useState(false)

  const scrollToActive = () => {
    if (window.scrollY >= 75) {
      setScrolled(true);
    } else { setScrolled(false) }
  }
  window.addEventListener("scroll", scrollToActive);

  const onMouseEnter = (listName) => {
    if (listName === "product" && !window.innerWidth < 960) {
      setDropdownProduct(true)
      setDropdownUser(false)
    }
    else if (listName === "user" && !window.innerWidth < 960) {
      setDropdownUser(true)
      setDropdownProduct(false)
    }
    //  else {setDropdownProduct(false);setDropdownUser(false)}

  }
  const onMouseLeave = () => {
    setDropdownProduct(false)
    setDropdownUser(false)
  }
  return <>
    <nav className='w-full bg-blue-500 flex justify-between px-10 sticky top-0 inset-x-0 z-30'>
      <div className='flex'>
        <Link to='/' className='flex justify-start items-center'><img src={homeLogo} className="w-25" alt="" /></Link>
      </div>
      <ul className='nav-right-list'>
        <li className="nav-item-li" ><Link className='nav-link-li' to='/'>HOME</Link></li>
        {/* <li className="nav-item" >
            <Link className='nav-link' to="/service">SERVICES</Link>
            </li> */}
        <li className="nav-item-li" onMouseOver={onMouseEnter.bind(this, "product")} onMouseLeave={onMouseLeave}>
          <Link className='nav-link-li' to='/product'>PRODUCTS</Link>
          {dropDownProduct ? <Dropdown dropdown={MenuItems.product} /> : null}
        </li>
        <li className="nav-item-li" name="user" onMouseOver={onMouseEnter.bind(this, "user")} onMouseLeave={onMouseLeave}>
          <Link className='nav-link-li' to='/userLogin'>LOG IN</Link>
          {dropDownUser ? <Dropdown dropdown={MenuItems.user} /> : null}
        </li>
        <li className="nav-item-li" ><Link className='nav-link-li' to="/contact">CONTACT US</Link></li>
        {/* <li><Link className='nav-link'>CAREER</Link></li>
            <li><Link className='nav-link'>BLOG</Link></li>
            <li><Link className='nav-link'>ABOUT</Link></li> */}
      </ul>

    </nav>
  </>
}

export default Navbar