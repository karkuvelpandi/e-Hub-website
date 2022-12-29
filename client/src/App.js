import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Navbar/Navbar'
import Home from './Pages/HomePage/Home'
import Products from './Pages/Products/Products'
// import Service from './Pages/Service/Service'
import Contact from './Pages/Contact/Contact'
import CreateProduct from './Pages/Products/components/CreateProduct'
import ProductAdmin from './Pages/Products/components/ProductAdmin'
import UpdateProduct from './Pages/Products/components/UpdateProduct'
import LogIn from './Pages/User/LogIn/LogIn'
import RegForm from './Pages/User/RegForm/RegForm'
import UserAdmin from './Pages/User/UserAdmin/UserAdmin'
import EditForm from './Pages/User/EditForm/EditForm'

const App = () => {
  return <>
    < Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/service' element={<Service />} /> */}
        <Route path='/contact' element={<Contact />} />

        <Route path='/product' element={<Products />} />
        <Route path='/createProduct' element={<CreateProduct />} />
        <Route path='/productAdmin' element={<ProductAdmin />} />
        <Route path='/updateProduct' element={<UpdateProduct />} />

        <Route path='/userLogin' element={<LogIn/>} />
        <Route path='/regForm' element={<RegForm />} />
        <Route path='/userAdmin' element={<UserAdmin />} />
        <Route path='/editForm/:id' element={<EditForm />} />
      </Routes>

    </Router>

  </>
}

export default App