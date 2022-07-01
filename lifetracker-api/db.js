const {Client} =  require("pg")
const {getDatabaseUri} = require("./Config/config")
require("colors")

const db = new Client({connectionString: getDatabaseUri()})

db.connect((err) => {
    if (err) {
        console.error("Connection Error...".red, err.stack)
    } else {
        console.log("Successfully connected to the Postgres database!".blue)
    }
})

module.exports = db