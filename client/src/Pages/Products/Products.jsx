import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Axios from 'axios'
import Footer from '../../Footer/Footer'
import './Product.css'
const Products = () => {

  let [products, setProducts] = useState([])
  let [err, setErr] = useState("")

  useEffect(() => {
    Axios.get("https://cute-hare-attire.cyclic.app/product/").then((res) => {
      setProducts(res.data)
    }).catch((er) => { setErr(er) })
  }, [])

  return <> 

    <div className="container mt-1" style={{minHeight:"50vh"}}>
      {/* <pre>{JSON.stringify(products)}</pre> */}
      <div className="row">
        {
          products.length > 0 ? <>
            {
              products.map((product) => {
                return <div className="col-md-3">
                  <div className="card card1 mt-5">
                   <center><img src={product.image} width='130px' height='170px' alt="" /></center>
                    
                      <ul className="list-group">
                        <li className="list-group-item"><b> Name : </b>{product.name}</li>
                        <li className="list-group-item"><b> Price : </b>{product.price}</li>
                        {/* <li className="list-group-item"><b> QTY : </b>{product.qty}</li> */}
                        <li className="list-group-item"><b> Info : </b>{product.info}</li>
                      </ul>
                   
                  </div>
                </div>
              })
            }
          </> : <>No Products are created</>
        }
      </div>
    </div>
    <Footer/>
  </>
}

export default Products
