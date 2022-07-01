import express, {json} from "express"
import cors from "cors"
import morgan from "morgan"
import {BadRequest, NotFoundError} from "./utils/errors"
import authRoutes from "./routes/auth"

const app = express()


app.use(cors())
app.use(json())
app.use(morgan("tiny"))

app.use("/auth", authRoutes)

app.use((req, res, next) => {
    return next(new NotFoundError())
})

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message

    return res.status(status).json({
        error: {message, status},
    })
})

export default app