import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { Navigate } from 'react-router-dom'

const CreateProduct = () => {
    let [product, setProduct] = useState({
        name: "",
        image: "",
        price: "",
        qty: "",
        info: ""
    })
    let [submitted, setSubmitted] = useState(false)
    
    let productData = (event) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        })
    }

    let submitHandler = (event) => {
        event.preventDefault();
        let url ="https://cute-hare-attire.cyclic.app/product/create" 
        Axios.post(url, product).then((res) => {
            setSubmitted(true)
            console.log(url)
        }).catch(() => { })    
    }

    let changeImage = (event) => {
        let imageFile = event.target.files[0]
        let reader = new FileReader()    
        reader.readAsDataURL(imageFile)
        reader.addEventListener("load", () => {
            if (reader.result) {
               /*  console.log(reader.result) */
                setProduct({ ...product, image: reader.result })
            }
        })
    }
   
    return <>
        <div className="container mt-5">
            {/* <pre>{JSON.stringify(product)}</pre>
            <pre>{JSON.stringify(submitted)}</pre> */}
            {
                submitted ? <><Navigate to='/product' /></> : <>
                    <div className="row">
                        <div className="col-md-5 m-auto">
                            <div className="card ">
                                <div className="card-header bg-dark text-white text-center"><h1>Create Product</h1></div>
                                <div className="card-body bg-info">
                                    <form onSubmit={submitHandler}>
                                        <div className="form-group">
                                            <input type="text" name="name" placeholder='Product Name' className='form-control' onChange={productData} />
                                        </div>
                                        <div className="form-group">
                                            <input type="file" name="image" placeholder='Image' height='100px' className='form-control' onChange={changeImage} />
                                        </div>
                                        <div className="form-group">
                                            <input type="number" name="price" placeholder='Price' className='form-control' onChange={productData} />
                                        </div>
                                        <div className="form-group">
                                            <input type="number" name="qty" placeholder='QTY' className='form-control' onChange={productData} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="info" placeholder='Information' className='form-control' onChange={productData} />
                                        </div>
                                        <input type="submit" value="Create Product" className='btn btn-warning' />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    </>
}

export default CreateProduct