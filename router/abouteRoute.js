const express=require('express');
const aboutControllers=require('../controllers/aboutControllers')
const router =express.Router();
router
.route('/')
.get(aboutControllers)

module.exports=router;