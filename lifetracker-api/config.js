require("dotenv").config()
import "colors"

const PORT = process.env.Port ? Number(process.env.PORT) : 3001
const SECRET_KEY = "ilovefoodsoverymuch"
const BCRYPT_WORK_FACTOR = 13
// const IS_TESTING = false

function getDatabaseUri() {
    const dbUser = process.env.DATABASE_USER || "postgres"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
    const dbHost = process.env.DATABASE_HOST || "localhost"
    const dbPort = process.env.DATABASE_PORT || 5432
    const dbName = process.env.DATABASE_NAME || "lifetracker"
    // const dbTestName = process.env.DATABASE_TEST_NAME || "lifetracker_test"

    // if DATABASE_URL environment variable exists, use it; otherwise, create db connection string
    return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}


console.log("App Config".red)
console.log("PORT: ".blue, PORT)
console.log("Database URI: ".blue, getDatabaseUri())
console.log("~~~~~~~~~~~~~~~~~~~~~~~")


export default {
    PORT,
    BCRYPT_WORK_FACTOR,
    SECRET_KEY,
    getDatabaseUri
}