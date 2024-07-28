const express=require('express');
const contactControllers=require('../controllers/contactControllers')
const router =express.Router()
router
.route('/')
.get(contactControllers)

module.exports=router;
