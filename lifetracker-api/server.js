import {listen} from "./app"
import {PORT} from "./config"

listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})