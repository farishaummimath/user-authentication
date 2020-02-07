const express = require('express')
const router = express.Router()
const {authenticateUser}  =require('../app/middlewares/authentication')
const messagesControllers = require('../app/controllers/MessagesController')


router.get('/messages', authenticateUser, messagesControllers.list)
router.post('/messages', authenticateUser, messagesControllers.create)
router.get('/messages/:id', authenticateUser, messagesControllers.show)
router.put('/messages/:id', authenticateUser, messagesControllers.update)
router.delete('/messages/:id', authenticateUser, messagesControllers.destroy)

module.exports = router