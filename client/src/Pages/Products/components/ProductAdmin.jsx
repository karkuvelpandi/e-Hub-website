import React from 'react'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const ProductAdmin = () => {

  let navigate = useNavigate();
  let [products, setProducts] = useState([])
   let[errorMsg,setErrorMsg]=useState("")

  useEffect(() => {
    Axios.get("http://127.12.22.32:8000/product/").then((res) => {
      setProducts(res.data)
    }).catch((err) => { setErrorMsg(err)})
  }, [])

  
  let deleteProduct = (id) => {
    Axios.delete(`http://127.12.22.32:8000/product/${id}`)
      .then((resp) => {
        navigate(0)
      }).catch((err) => { setErrorMsg(err)})
  };
  return (
    <>
      <div className="container mt-5">
        <pre>{JSON.stringify(products)}</pre>

        <div className="row">
          <div className="col-8">
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