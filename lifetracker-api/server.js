const app = require("./app")
const {PORT} = require("./config")

listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})