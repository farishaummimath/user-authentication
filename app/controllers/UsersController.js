const express = require('express')
const router = express.Router()
const _ = require('lodash')
const {User}  =require('../models/User')
const Booking  =require('../models/Booking')

const {authenticateUser}  =require('../middlewares/authentication')

//localhost:3022/users/register
router.post('/register',function(req,res){
    const body = req.body
    const user = new User(body)
    console.log(user.isNew)
    user.save()
   .then(function(user){
       res.send(_.pick(user,['_id','username','email']))
   })
   .catch(err=> res.send(err))
})

//localhost:3022/users/login

router.post('/login',function(req,res){
    const body = req.body
    // own static method
    User.findByCredentials(body)
        .then(function(user){
            // create own instance method
            // generate token and write to db. it is async op so return promise
            return user.generateToken(req.ip)
            // res.send(user)
        })
        .then(function(token){
            //res.send(token)// token not in body
            // instead send in header- new prop and value
            //once user su
            res.setHeader('x-auth',token).send({})
        })
        .catch(function(err){
            res.send(err)
        })
    // User.findOne({email:body.email})
    //     .then(function(user){
    //         if(!user) {
    //             res.status('404').send("invalid email / password ")
    //         } 
    //         bcryptjs.compare(body.password,user.password)
    //             .then(function(result){
    //                 if(result) {
    //                     res.send(user)
    //                 } else {
    //                     res.status('404').send('Invalid email / password')
    //                 }
    //             })
          
    //     })
    //     .catch(function(err){
    //         console.log(err)
    //     })
})

//localhost:3022/users/account -- setting private route
router.get('/account', authenticateUser,function(req,res){
    const { user } = req
    res.send(_.pick(user,['id','username','email']))
    // const token = req.header('x-auth')
    // // if(token) {
    //    // res.send('Success')
    //    User.findByToken(token)
    //         .then(function(user){
    //             res.send(user)
    //         })
    //         .catch(function(err){
    //             res.status('401').send(err)
    //         })
    // } else {
    //     res.status('401').send('failed ')
    // }
})


//localhost:3022/users/logout

router.delete('/logout',authenticateUser, function(req,res){
    const {user,token} = req
    User.findByIdAndUpdate(user._id,{$pull:{tokens:{token}}})
        .then(function(){
            res.send({notice:'successfully logged out'})
        })
        .catch(function(err){
            res.send(err)
        })
})  
router.post('/bookings',function(req,res){
    const body = req.body
    const booking = new Booking(body)
    booking.save()
   .then(function(booking){
       res.json(booking)
   }).catch(function(err){
       res.send(err)
   })
})
module.exports = {
    usersRouter: router
}
