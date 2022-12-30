import mongoose from "mongoose";

let ContactSchema = mongoose.Schema

let schema = new ContactSchema({
    name : {
        type:String,
        required : true
    },
    email : {
        type:String,
        required : true
    },
    mobile : {
        type:Number,
        required : true
    },
    message : {
        type : String,
        required : false
    }
})

let Contact = mongoose.model('contact',schema)

export default Contact