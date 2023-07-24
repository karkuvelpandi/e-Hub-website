import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Axios from 'axios'
import Footer from '../../components/Footer/Footer'
import './Product.css'
const Products = ({ context = "" }) => {

  let [products, setProducts] = useState([])
  let [err, setErr] = useState("")

  useEffect(() => {
    Axios.get("https://cute-hare-attire.cyclic.app/product/").then((res) => {
      setProducts(res.data)
    }).catch((er) => { setErr(er) })
  }, [])

  return <>

    <div className={`container mt-1 flex flex-1 
    ${context === "Home" && "md:relative md:bottom-56 md:z-20"}
    ` } style={{ minHeight: "50vh" }}>
      {/* <pre>{JSON.stringify(products)}</pre> */}
      <div className="row flex justify-center">
        {
          products.length > 0 ? <>
            {
              products.map((product, index) => {
                return <div key={index} className="col-md-3 cursor-pointer">
                  <div className="card card1 mt-5">
                    <center><img src={product.image} className="productImg" alt="" /></center>
                    <ul className="list-group">
                      <li className="list-group-item"><b> Name : </b>{product.name}</li>
                      <li className="list-group-item"><b> Price : &#8377; </b>{product.price}</li>
                      <li className="list-group-item"><b> Stock Available : </b>{product.qty}</li>
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
    <Footer />
  </>
}

export default Products
