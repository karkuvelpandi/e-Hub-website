import express from "express";
import ContactApp from "../schema/ContactApp.js";
import dotenv from "dotenv";
dotenv.config({ path: "../config/config.env" });
const router = express.Router();
//get all Contacts
/*
URL            : http://127.12.22.32:8000/contact-app/
method         : GET
required field : N/A
*/
router.get("/", async (req, resp) => {
  let user = await ContactApp.find({});
  resp.status(200).json(user);
});

//Add user  / creating ContactApp data
/*
URL            : http://127.12.22.32:8000/contact-app/create
method         : POST
required field : id, firstName, lastName, email, status,image
*/

router.post("/create", async (req, resp) => {
  try {
    let new_user = {
      id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      status: req.body.status,
      image: req.body.image,
    };

    let createUser = await ContactApp({ ...new_user });
    let saveUser = await createUser.save();
    resp.status(200).json({
      result: "Contact added Successfully...",
      contact: saveUser,
    });
  } catch (err) {
    console.log(err);
  }
});
// Updating Contact data
/*
URL            : http://127.12.22.32:8000/contact-app/:id
method         : PUT
required field : id, firstName, lastName, email, status,image
*/
router.put("/:id", async (req, resp) => {
  let user_Id = req.params.id;
  try {
    let updateUser = {
      id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      status: req.body.status,
      image: req.body.image,
    };
    let user = await ContactApp.findById(user_Id);
    if (!user) {
      return resp.status(404).json({ msg: "User not found...!" });
    }
    user = await ContactApp.findByIdAndUpdate(
      user_Id,
      { $set: updateUser },
      { new: true }
    );
    resp.status(200).json({
      result: "Product updated successfully...!",
      contact: user,
    });
  } catch (err) {}
});

// Deleting contact data
/*
URL            : http://127.12.22.32:8000/contact-app/:id
method         : DELETED
required field : N/A
*/
router.delete("/:id", async (req, resp) => {
  let user_Id = req.params.id;
  try {
    let user = await ContactApp.findById(user_Id);
    if (!user) {
      return resp.status(404).json({ msg: "User not found...!" });
    }
    user = await ContactApp.findByIdAndDelete(user_Id);
    resp.status(200).json({ msg: "User deleted successfully...!" });
  } catch (err) {}
});

//Get single contact
/*
URL            : http://127.12.22.32:8000/contact-app/:id
method         : GET
required field : N/A
*/
router.get("/:id", async (req, resp) => {
  let user_Id = req.params.id;
  try {
    let user = await ContactApp.findById(user_Id);
    if (!user) {
      return resp.status(404).json({
        msg: "Product not found...!",
      });
    }
    resp.status(200).json(user);
  } catch (err) {}
});

export default router;
