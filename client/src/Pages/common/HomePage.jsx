import React from 'react'
import Header from '../../components/Header/Header'
import Products from '../../components/Products/Products'
const HomePage = () => {
  return <>
    <Header />
    <Products context='Home' />
  </>
}

export default HomePage