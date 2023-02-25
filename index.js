import { ChatGPTUnofficialProxyAPI } from 'chatgpt'
import express from 'express'
import 'express-async-errors'
import axios from 'axios'

const app = express()

app.use(express.urlencoded({ extended: false }))

app.post('/get_access_token', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new Error('Invalid [email] or [password]')
    }
    const { data } = await axios({
        method: 'POST',
        url: `https://chatgpt-auth.vercel.app/`,
        headers: {
            'X-Email': email,
            'X-Password': password,
        },
    })
    if (!data) {
        throw new Error('Failed to get [access_token]')
    }
    res.json({ access_token: data })
})

app.post('/send_message', async (req, res) => {
    const { access_token, reverse_proxy, prompt, prompt_prefix, prompt_suffix, conversation_id, parent_message_id } =
        req.body
    if (!access_token || !prompt) {
        throw new Error('Invalid [access_token] or [prompt]')
    }
    const api = new ChatGPTUnofficialProxyAPI({
        accessToken: access_token,
        apiReverseProxyUrl: reverse_proxy ?? 'https://chat.duti.tech/api/conversation',
    })
    const sendMessageRes = await api.sendMessage(prompt, {
        conversationId: conversation_id,
        parentMessageId: parent_message_id,
        promptPrefix: prompt_prefix ?? 'return the result in Chinese',
        promptSuffix: prompt_suffix,
    })
    res.json({
        text: sendMessageRes.text,
        conversation_id: sendMessageRes.conversationId,
        parent_message_id: sendMessageRes.id,
    })
})

app.use((err, req, res, next) => {
    console.error(err)
    res.json({ message: err.message })
})

app.listen(3000)
