const express=require('express')
const postControllers=require('../controllers/postControllers.js')
const router=express.Router()

router
.route('/')
.get(postControllers.getAllPosts)
.post(postControllers.createPost)

router
.route("/compose")
.get(postControllers.compose)

router
.route('/update/:id')
.get(postControllers.getUpdatePage)
.post(postControllers.updatePost)

router
.route('/:id')
.get(postControllers.getPostById)
.delete(postControllers.deletePost)


module.exports=router;