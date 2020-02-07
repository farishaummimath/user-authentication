const bcryptjs = require('bcryptjs')

const encrypted = '$2a$10$Zn21F4AchiSOGznNWwUnau6/I6yCkT5t0o4.t.BrNvYLVLK1xAr.6'
const password = 'secret@13'

bcryptjs.compare(password,encrypted)
    .then(function(result){
        console.log(result)
    })
