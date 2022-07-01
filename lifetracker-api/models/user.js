const {BadRequestError, UnauthorizedError} = require("../utils/errors")
const db = require("../db")
const {BCRYPT_WORK_FACTOR} = require("../config")
const bcrypt = require("bcrypt")

class User {
    static makePublicUser(user) {
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name,
            createdAt: user.createdAt
        }
    }

    static async login(credentials) {
        const requiredFields = ["password", "email"]
        requiredFields.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError("Missing " + field + " in request body.")
            }
        })

        const user = await User.fetchUserbyEmail(credentials.email)
        if (user) {
            const isValid = await bcrypt.compare(credentials.password, user.password)
            if (isValid) {
                return this.makePublicUser(user)
            }
        }

        throw new UnauthorizedError("Invalid credentials, please try again.")
    }

    static async register(credentials) {
        const requiredFields = ["password", "firstName", "lastName", "email", "username"]
        requiredFields.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError("Missing " + field + " in request body.")
            }
        })

        const existingUser = await User.fetchUserbyEmail(credentials.email)
        if (existingUser) {
            throw new BadRequestError("Duplicate email found: " + credentials.email)
        }

        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)
 
        const lowercaseEmail = credentials.email.toLowerCase()

        const result = await db.query(`
            INSERT INTO users(
                password,
                first_name,
                last_name,
                email,
                username)
            VALUES($1, $2, $3, $4, $5)
            RETURNING id, first_name, last_name, email, username;
        `, [hashedPassword, credentials.firstName, credentials.lastName, lowercaseEmail, credentials.username])

        const user = result.rows[0]

        return this.makePublicUser(user)
    }

    static async fetchUserbyEmail(email) {
        if (!email) {
            throw new BadRequestError("No email provided.")
        }

        const query = "SELECT * FROM users WHERE email = $1"
        const result = await db.query(query, [email.toLowerCase()])

        const user = result.rows[0]

        return user
    }
}

module.exports = User