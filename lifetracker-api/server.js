const {app} = require("./app")
const {PORT} = require("./config")
require("colors")

app.listen(PORT, () => {
  console.log(`🚀 Server running: http://localhost:${PORT}`.yellow)
})