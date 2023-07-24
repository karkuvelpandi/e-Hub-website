import React from 'react'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const ProductAdmin = () => {

  let navigate = useNavigate();
  let [products, setProducts] = useState([])
   let[errorMsg,setErrorMsg]=useState("")

  useEffect(() => {
    Axios.get("https://cute-hare-attire.cyclic.app/product/").then((res) => {
      setProducts(res.data)
    }).catch((err) => { setErrorMsg(err)})
  }, [])

  
  let deleteProduct = (id) => {
    Axios.delete(`https://cute-hare-attire.cyclic.app/product/${id}`)
      .then((resp) => {
        navigate(0)
      }).catch((err) => { setErrorMsg(err)})
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className='table table-hover mt-5'>
              <thead className='bg-dark text-white'>
                <tr>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Product Qty</th>
                  <th>Total Qty</th>
                  <th>Image</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.length > 0 ? <>
                    {
                      products.map((product) => {
                        return <tr key={product._id}>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.qty}</td>
                          <td>{(product.qty) * (product.price)}</td>
                          <td><img height='80pc' width='70pc' src={product.image} alt="" /></td>
                          <td><Link to={`/updateProduct/${product._id}`} className='btn btn-success'>Edit</Link >&nbsp;
                            <Link className='btn btn-danger' onClick={deleteProduct.bind(this, product._id)}>Delete</Link ></td>
                        </tr>

                      })
                    }
                  </> : null
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductAdmin