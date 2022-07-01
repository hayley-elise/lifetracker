const bcrypt = require("bcrypt")
const userPassword = "password"
const confirmUserPassword = "passwordConfirm"

bcrypt.hash(userPassword, 6, (err, hashedPassword) => {
    console.log(`User password is: ${userPassword}`)
    console.log(`Hashed version: ${hashedPassword}`)
})

bcrypt.hash(confirmUserPassword, 6, (err, hashedPassword) => {
    console.log(`User password is: ${confirmUserPassword}`)
    console.log(`Hashed version: ${hashedPassword}`)
})