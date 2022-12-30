import express from 'express'
import Product from '../model/Product.js'

let router = express.Router()
//Get all products
/*
URL           : http://127.12.22.32:8000/product/
method        : GET
Require fields: N/A
*/
router.get('/', async (req, resp) => {
   let product = await Product.find()
   resp.status(200).json(product)
})

//Get single product
/*
URL           : http://127.12.22.32:8000/product/:id
method        : GET
Require fields: N/A
*/
router.get('/:id', async (req, resp) => {
   let product_Id = req.params.id
   try {
      let product = await Product.findById(product_Id)
      if (!product) {
         return resp.status(404).json({
            msg: "Product not found...!"
         })
      }
      resp.status(200).json(product)
   }
   catch (err) { }
})

//Create Products
/*
URL           : http://127.12.22.32:8000/product/
method        : POST
Require fields: name,image,price,qty,info
*/
router.post('/create', async (req, resp) => {
   try {
      let new_product = {
         name: req.body.name,
         image: req.body.image,
         price: req.body.price,
         qty: req.body.qty,
         info: req.body.info
      }
      let product = await Product.findOne({ name: new_product.name })
      if (product) {
         return resp.status(404).json({
            msg: "Product already exist...!"
         })
      }
      let createProduct = await Product(new_product)
      let saveProduct = await createProduct.save()
      resp.status(200).json({
         result: "Product created successfully...!",
         product: saveProduct
      })
   }
   catch (err) { console.log(err); }
})

//Update Products
/*
URL           : http://127.12.22.32:8000/product/:id
method        : PUT
Require fields: name,image,price,qty,info
*/
router.put("/:id", async (req, resp) => {
   let product_Id = req.params.id
   try {
      let updateProduct = {
         name: req.body.name,
         image: req.body.image,
         price: req.body.price,
         qty: req.body.qty,
         info: req.body.info
      }
      let product = await Product.findById(product_Id)
      if (!product) {
         return resp.status(404).json({ msg: "Product not found...!" })
      }
      product = await Product.findByIdAndUpdate(product_Id, { $set: updateProduct }, { new: true })
      resp.status(200).json({
         result: 'Product updated successfully...!',
         prodcut: product
      })
   }
   catch (err) { }
})

//Delete Products
/*
URL           : http://127.12.22.32:8000/product/:id
method        : DELETE
Require fields: N/A
*/
router.delete('/:id', async (req, resp) => {
   let product_Id = req.params.id
   try {
      let product = await Product.findById(product_Id)
      if (!product) {
         return resp.status(404).json({ msg: "Product not found...!" })
      }
      product = await Product.findByIdAndDelete(product_Id)
      resp.status(200).json({ msg: 'Product deleted successfully...!' })
   }
   catch (err) { }
})
export default router