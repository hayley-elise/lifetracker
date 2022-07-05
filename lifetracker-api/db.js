const {Client} = require("pg")
const {getDatabaseUri} = require("./config")
require("colors")

const db = new Client({connectionString: getDatabaseUri()})

db.connect((err) => {
    if (err) {
        console.error("Connection Error...".red.bold, err.stack)
    } else {
        console.log("Successfully connected to the Postgres database!".blue.bold)
    }
})

module.exports = db