import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const Edit = () => {
    let [productID, setProductId] = useState(useParams().id)
    let [selectedproduct, setSelectedProduct] = useState({
        name: "",
        image: "",
        price: "",
        qty: "",
        info: ""
    })
    let [submitted, setSubmitted] = useState(false)
    let [errorMsg, setErrorMsg] = useState("")
    let setID = (id) => {
        setProductId(id)
    };
    useEffect(() => {
        let url = `https://cute-hare-attire.cyclic.app/product/${productID}`
        Axios.get(url).then((response) => {
            setSelectedProduct(response.data)
        }).catch((err) => { setErrorMsg(err) })

    }, [productID])

    let changeInput = (event) => {
        setSelectedProduct({
            ...selectedproduct,
            [event.target.name]: event.target.value
        })
    }

    //Change image to string

    let changeImage = (event) => {
        let imageFile = event.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(imageFile)
        reader.addEventListener("load", () => {
            if (reader.result) {
                setSelectedProduct({ ...selectedproduct, image: reader.result })
            }
        })
    }


    let submitHandler = (event) => {
        event.preventDefault();
        let dataURL = `https://cute-hare-attire.cyclic.app/product/${productID}`
        Axios.put(dataURL, selectedproduct).then((res) => {

            setSubmitted(true)
        }).catch((err) => { setErrorMsg(err) })
    }

    return <>
        <div className="container mt-5">
            {/* <pre>{JSON.stringify(selectedproduct)}</pre>
            <pre>{JSON.stringify(submitted)}</pre>
            <pre>{JSON.stringify(productID)}</pre> */}
            {
                submitted ? <><Navigate to='/productAdmin' /></> : <>
                    <div className="row">
                        <div className="col-md-5 m-auto">
                            <div className="card">
                                <div className="card-header bg-dark text-white text-center"><h1>Edit Product</h1></div>
                                <div className="card-body bg-secondary">
                                    <form onSubmit={submitHandler}>
                                        <div className="form-group">
                                            <input type="text" name="name" value={selectedproduct.name} placeholder='Product Name' className='form-control' onChange={changeInput} />
                                        </div>
                                        <div className="form-group">
                                            <input type="file" name="image" placeholder='Image' className='form-control' onChange={changeImage} />
                                        </div>
                                        <div className="form-group">
                                            <input type="number" name="price" value={selectedproduct.price} placeholder='Price' className='form-control' onChange={changeInput} />
                                        </div>
                                        <div className="form-group">
                                            <input type="number" name="qty" value={selectedproduct.qty} placeholder='QTY' className='form-control' onChange={changeInput} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="info" value={selectedproduct.info} placeholder='Information' className='form-control' onChange={changeInput} />
                                        </div>
                                        <input type="submit" value="Create Product" className='btn btn-dark' />
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

export default Edit