const bcrypt = require("bcrypt")
const password = "password"
const confirmedPassword = "password2"

bcrypt.hash(userPassword, 6, (err, hashedPassword) => {
    console.log(`User password is: ${password}`)
    console.log(`Hashed password: ${hashedPassword}`)
})

bcrypt.hash(confirmedPassword, 6, (err, hashedPassword) => {
    console.log(`User password is: ${confirmedPassword}`)
    console.log(`Hashed password: ${hashedPassword}`)
})