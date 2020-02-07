const jwt = require('jsonwebtoken')

const tokenData = {
    id:1,
    username: 'user1'
}

const token = jwt.sign(tokenData,'jwt@123')

console.log(token)//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VyMSIsImlhdCI6MTU4MDcxMzQzMX0.2FwONA5btiKXfxaAyTwXegp35sUlko2m7byeU5NM-4s