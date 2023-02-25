import express from 'express'
import 'express-async-errors'
import { get_access_token } from './get_access_token.mjs'
import { send_message } from './send_message.mjs'
import { catch_error } from './catch_error.mjs'

const app = express()
app.use(express.urlencoded({ extended: false }))

app.post('/get_access_token', get_access_token)
app.post('/send_message', send_message)
app.use(catch_error)

app.listen(3000)
