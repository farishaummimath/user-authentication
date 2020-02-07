// username, email, password- 
const mongoose = require('mongoose')
const validator = require('validator')
const jwt  = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const _ = require('lodash')
const Schema = mongoose.Schema


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength:5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate : {
            validator: function(value){
                return validator.isEmail(value)
            },
            message: function(){
                return 'Invalid Email Format'
            }
        }
        // how to check format of email
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128
    },
    tokens : [
        {
            token :{
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    ipAddresses : [
        {
            ipAddress :{
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    loginCount : {
        type: Number,
        default : 0
    }

})
// static method
userSchema.statics.findByCredentials = function(body){
    const User = this
    return User.findOne(_.pick(body,['username','email']))
                .then(function(user){
                    if(!user) {
                        return Promise.reject('Invalid email / password')
                    }
                    return bcryptjs.compare(body.password,user.password)
                        .then(function(result){
                            if(result){
                                return Promise.resolve(user)
                            } else {
                                return Promise.reject('Invalid email/password')
                            }
                        })
                })
                .catch(function(err){
                    return Promise.reject(err)
                    // return new Promise(function(resolve,reject){
                    //   reject(err)
                    // })
                })
}
userSchema.statics.findByToken= function(token){
    const User = this // reference to User model
    // handle error from jwt verify using try and catch
    let tokenData
    try {
        tokenData = jwt.verify(token,'jwt@123')
    } catch(err) {
        return Promise.reject(err)
    }
    return User.findOne({
            _id: tokenData._id,
            'tokens.token':token
    }) // either user or null
}
// own instance methods

userSchema.methods.generateToken = function(ipAddress){
    const user = this
    const tokenData = {
        _id: user._id,
        username: user.username,
        createdAt: Number(new Date())
    }
    const token = jwt.sign(tokenData,'jwt@123')// secret key jwt@123
    user.tokens.push({
        token
    })
    user.loginCount +=1
    user.ipAddresses.push({
        ipAddress
    })
    return user.save()
        .then(function(user){
            return Promise.resolve(token)
        })
        .catch(function(err){
            Promise.reject(err)
        })
}
//pre hooks

userSchema.pre('save',function(next){
    const user = this // refers to user object, just before saving the function will be called
    if(user.isNew){
        bcryptjs.genSalt(10)
        .then(function(salt){
            bcryptjs.hash(user.password,salt)
                .then(function(encryptedPassword){
                    user.password = encryptedPassword
                    next()
                })
        })
    } else {
        next()
    }
})
const User = mongoose.model('User',userSchema)
module.exports = {
    User
}