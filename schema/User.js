import mongoose from 'mongoose'

let userSchema=mongoose.Schema

let schema=new userSchema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    // username:{
    //     type:String,
    //     required:true
    // },
    password:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }, 
    image:{
        type:String,
        required:true
    }
    
})

let User=mongoose.model('user1',schema)

export default User