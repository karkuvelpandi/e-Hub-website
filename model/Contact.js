import mongoose from "mongoose";

let ContactSchema = mongoose.Schema

let Schema = new ContactSchema({
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
    }
})