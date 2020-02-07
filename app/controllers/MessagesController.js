const Message = require('../models/Message')

module.exports.list = (req,res) => {
    Message.find({user:req.user._id})
        .then(message=> res.json(message))
        .catch(err => res.json(err))
}

module.exports.create = (req,res) => {
    const body = req.body
    const message = new Message(body)
    message.user = req.user._id

   message.save()
        .then(message=> res.json(message))
        .catch(err => res.json(err))
}

module.exports.show = (req,res) => {
    const id = req.params.id
    Message.findOne({_id: id, user: req.user._id})
        .then(message=> message? res.json(message):res.json({}))
        .catch(err=> res.json(err))
}

module.exports.update = (req,res) => {
    const id = req.params.id
    const body = req.body
    Message.findOneAndUpdate({_id: id, user : req.user._id}, body, {new:true, runValidators:true})
        .then(message=> message? res.json(message):res.json({}))
        .catch(err => res.json(err))
}
module.exports.destroy = (req, res) => {
    const id = req.params.id
    Message.findOneAndDelete({_id: id, user: req.user._id})
        .then(message=> message? res.json(message):res.json({}))
        .catch(err=> res.json(err))
}