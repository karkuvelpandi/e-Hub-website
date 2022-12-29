import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Axios from 'axios'
import Footer from '../../Footer/Footer'
const Products = () => {

  let [products, setProducts] = useState([])
  let [err, setErr] = useState("")

  useEffect(() => {
    Axios.get("/product/").then((res) => {
      setProducts(res.data)
    }).catch((er) => { setErr(er) })
  }, [])

  return <> 
    <div className="container" style={{minHeight:"50vh"}}>
      <pre>{JSON.stringify(products)}</pre>
      <div className="row">
        {
          products.length > 0 ? <>
            {
              products.map((product) => {
                return <div className="col-md-3">
                  <div className="card mt-5">
                    <div className="card-header"><center><img src={product.image} width='130pc' height='170pc' alt="" /></center></div>
                    <div className="card-body">
                      <ul className="list-group">
                        <li className="list-group-item"><b> Name : </b>{product.name}</li>
                        <li className="list-group-item"><b> Price : </b>{product.price}</li>
                        <li className="list-group-item"><b> QTY : </b>{product.qty}</li>
                        <li className="list-group-item"><b> Info : </b>{product.info}</li>
                      </ul>
                    </div>
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
