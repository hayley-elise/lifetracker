const app = require("./app")
const {PORT} = require("./Config/config")

app.listen(PORT, function () {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})