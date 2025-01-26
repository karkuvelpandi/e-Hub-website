import express from 'express'
import Blog from '../schema/Blog.js'

let router = express.Router()
//Get all blog
/*
URL           : http://127.12.22.32:8000/api/blog/
method        : GET
Require fields: N/A
*/
router.get('/', async (req, resp) => {
   let blog = await Blog.find()
   resp.status(200).json(blog)
})

//Get single blog
/*
URL           : http://127.12.22.32:8000/api/blog/:id
method        : GET
Require fields: N/A
*/
router.get('/:id', async (req, resp) => {
   let blog_Id = req.params.id
   try {
      let blog = await Blog.findById(blog_Id)
      if (!blog) {
         return resp.status(404).json({
            msg: "Product not found...!"
         })
      }
      resp.status(200).json(blog)
   }
   catch (err) { }
})

//Create blog
/*
URL           : http://127.12.22.32:8000/api/blog/
method        : POST
*/
router.post('/create', async (req, resp) => {
   try {
      let new_blog = {
        slug: req.body.slug,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
        content: req.body.content,
        coverImage: req.body.coverImage,
        readingTime: req.body.readingTime,
        description: req.body.description
      }
      let blog = await Blog.findOne({ slug: new_blog.slug })
      if (blog) {
         return resp.status(404).json({
            msg: "Blog slug already exist...!"
         })
      }
      let createBlog = await Blog(new_blog)
      let saveBlog = await createBlog.save()
      resp.status(200).json({
         result: "Blog created successfully...!",
         product: saveBlog
      })
   }
   catch (err) { console.log(err); }
})

//Update blog
/*
URL           : http://127.12.22.32:8000/api/blog/:id
method        : PUT
*/
router.put("/:id", async (req, resp) => {
   let blog_Id = req.params.id
   try {
      let updateBlog = {
        slug: req.body.slug,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
        content: req.body.content,
        coverImage: req.body.coverImage,
        readingTime: req.body.readingTime,
        description: req.body.description
      }
      let blog = await Blog.findById(blog_Id)
      if (!blog) {
         return resp.status(404).json({ msg: "Blog not found...!" })
      }
      blog = await Blog.findByIdAndUpdate(blog_Id, { $set: updateBlog }, { new: true })
      resp.status(200).json({
         result: 'Blog updated successfully...!',
         blog: blog
      })
   }
   catch (err) { }
})

//Delete Products
/*
URL           : http://127.12.22.32:8000/api/blog/:id
method        : DELETE
Require fields: N/A
*/
router.delete('/:id', async (req, resp) => {
   let blog_Id = req.params.id
   try {
      let blog = await Blog.findById(blog_Id)
      if (!blog) {
         return resp.status(404).json({ msg: "Blog not found...!" })
      }
      blog = await Blog.findByIdAndDelete(blog_Id)
      resp.status(200).json({ msg: 'Blog deleted successfully...!' })
   }
   catch (err) { }
})
export default router