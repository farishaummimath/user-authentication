const express = require('express')
const router = express.Router()
const Booking  =require('../models/Booking')
router.post('/bookings',function(req,res){
    const body = req.body
    const booking = new Booking(body)
    booking.save()
   .then(function(booking){
       res.json(booking)
   })
   .catch(err=> res.send(err))
})
module.exports = {
    bookingsRouter: router

}