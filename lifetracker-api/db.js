import {Client} from "pg"
import {getDatabaseUri} from "./config"
import "colors"

const db = new Client({connectionString: getDatabaseUri()})

db.connect((err) => {
    if (err) {
        console.error("Connection Error...".red, err.stack)
    } else {
        console.log("Successfully connected to the Postgres database!".blue)
    }
})

export default db