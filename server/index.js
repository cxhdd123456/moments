import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"

const app = express()
dotenv.config()

app.use(express.json({ limit: "30mb", extended: true}))
app.use(express.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

app.get('/', (req, res) => {
  res.send("APP IS RUNNING")
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);