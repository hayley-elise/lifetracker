const {BadRequestError, UnauthorizedError} = require("../utils/errors")
const db = require("../db")
const {BCRYPT_WORK_FACTOR} = require("../config")
const bcrypt = require("bcrypt")

class User {

    // allows values to be seen in console 
    static async makePublicUser(user) {
        return {
            id: user.id,
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email
        }
    }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // login user
    static async login(credentials) {

        // required to submit these fields
        const requiredFields = ["username", "password"]

    // ~~~~~~~~~~~
        // throws error if field is missing or empty
        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Field required: ${field}`)
            }
        })

    // ~~~~~~~~~~~
        // finds user's username
        const user = await User.fetchUserbyUsername(credentials.username)
        if (user) {
            // compares submitted password w/ db password
            const isValid = await bcrypt.compare(credentials.password, user.password)
            if (isValid) {
                // returns the user
                return this.makePublicUser(user)
            }
        }

        // throws error if username not found
        throw new UnauthorizedError("Invalid username/password; please try again.")
    }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // register new user
    static async register(credentials) {

        // required to submit these fields
        const requiredFields = ["username", "firstName", "lastName", "email", "password"]

    // ~~~~~~~~~~~
        // throws error if field is missing or empty
        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Field required: ${field}`)
            }
        })

    // ~~~~~~~~~~~
        // throws error if @ symbol is missing or the very 1st item in text
        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email.")
        }

    // ~~~~~~~~~~~
        // checks db for existing username & email
        const existingEmail = await User.fetchUserbyEmail(credentials.email)
        const existingUsername = await User.fetchUserbyUsername(credentials.username)

        if (existingEmail) {
            throw new BadRequestError(`Duplicate email found: ${credentials.email}`)
        }

        if (existingUsername) {
            throw new BadRequestError(`Duplicate username found: ${credentials.username}`)
        }

    // ~~~~~~~~~~~
        // hashes user's password
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)
 
    // ~~~~~~~~~~~
        // lowercases user's email
        const lowercasedEmail = credentials.email.toLowerCase()

    // ~~~~~~~~~~~
        // creates new user in db
        const result = await db.query(`
            INSERT INTO users (
                username, first_name, last_name, email, password
            )

            VALUES ($1, $2, $3, $4, $5)

            RETURNING 
                username, first_name, last_name, email; 
        ` , [credentials.username, credentials.firstName, credentials.lastName, lowercasedEmail, hashedPassword])

    // ~~~~~~~~~~~
        // returns the user
        const user = result.rows[0]
        return this.makePublicUser(user)
    }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // fetch user by email
    static async fetchUserbyEmail(email) {

        // throws error if parameter is not an email
        if (!email) {
            throw new BadRequestError("No email provided.")
        }

        // searches db for email & lowercases it
        const query = `
            SELECT * 
            FROM users 
            WHERE email = $1`

        const result = await db.query(query, [email.toLowerCase()])

        // returns email
        const user = result.rows[0]
        return user
    }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // fetch user by username
    static async fetchUserbyUsername(userName) {

        // throws error if parameter is not a username
        if (!userName) {
            throw new BadRequestError("No username provided.")
        }

        // searches db for username
        const query = `
            SELECT * 
            FROM users 
            WHERE username = $1`

        const result = await db.query(query, [userName])

        // returns username
        const user = result.rows[0]
        return user
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = User