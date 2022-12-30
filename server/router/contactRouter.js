import express from 'express'
import Contact from '../model/Contact.js'

let router = express.Router()
//Get all contacts
/*
URL           : http://127.12.22.32:8000/contact/all
method        : GET
Require fields: N/A
*/
router.get('/all',async (req,resp)=>{
   let contact = await Contact.find()
   resp.status(200).json(contact)
})

//Get single contact
/*
URL           : http://127.12.22.32:8000/contact/:id
method        : GET
Require fields: N/A
*/
router.get('/:id', async (req, resp)=>{
   let contactID = req.params.id;
   try{
      let contact = await Contact.findById(contactID)
      if(!contact){
         return resp.status(404).json({
            msg : "No Contact found...!"
         })
      }
      resp.status(200).json(contact)
   }
   catch(err){
      if(err) throw err
   }
})

//Post Contact
/*
URL           : http://127.12.22.32:8000/contact/create
method        : POST
Require fields: name,email,mobile,message
*/
router.post('/create', async (req,resp)=>{
   try{
      let newContact = {
         name : req.body.name,
         email : req.body.email,
         mobile : req.body.mobile,
         message : req.body.message
      }
      let contact = await Contact.findOne({email : newContact.email})
         if(contact){
           return resp.status(404).json({
            msg : "Contact already exists...!"
           })
         }
      let createContact = await Contact(newContact)
      let saveContact = await createContact.save()
      resp.status(200).json({
         result : "Contact posted successfully",
         contact : saveContact
      })
   }
   catch(e){
      resp.status(401).json({
         msg : e
      })
   }
})

export default router