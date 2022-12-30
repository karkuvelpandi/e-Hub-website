import mongoose from "mongoose";

let productSchema=mongoose.Schema

let schema= new productSchema({
    name:{
       type:String,
       required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    qty:{
       type:Number,
       required:true
    },
    info:{
        type:String,
        required:true
    }

})
const Product=mongoose.model("products",schema)

export default Product