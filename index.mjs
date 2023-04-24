import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import { home_page } from './home_page.mjs'
import { send_message } from './send_message.mjs'
import { get_access_token } from './get_access_token.mjs'
import { catch_error } from './catch_error.mjs'

if (!globalThis.fetch) {
    console.error('Node.js 版本太低, 请使用 v18+')
    process.exit(1)
}

const app = express()
app.use(morgan('combined'))
app.use(express.urlencoded({ extended: false }))

app.get('/', home_page)
app.post('/send_message', send_message)
app.post('/get_access_token', get_access_token)
app.use(catch_error)

app.listen(3000, () => console.log('Listening on http://localhost:3000'))
