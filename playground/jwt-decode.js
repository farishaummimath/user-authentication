const jwt = require('jsonwebtoken')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTM3YjdmYjAyZGI5OGIwZTM0NDhmODIiLCJ1c2VybmFtZSI6InVzZXIzIiwiY3JlYXRlZEF0IjoxNTgwNzIyODMzNDkyLCJpYXQiOjE1ODA3MjI4MzN9.FkQVKhO440UXSG0tck4NygCNUx5iYFMCKNDsnIdNclA'
const t = '12323'
const tok = ''
console.log(jwt.verify(token,'jwt@123'))
// console.log(jwt.verify(token,'jt@123')) // invalid siganture
// console.log(jwt.verify(t,'jwt@123')) //  jwt malformed

console.log(jwt.verify(t,'jwt@123'))//jwt must be provided