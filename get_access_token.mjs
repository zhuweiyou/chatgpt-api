import axios from 'axios'

export async function get_access_token(req, res) {
    const { email, password } = req.body
    if (!email || !password) {
        throw new Error('invalid [email] or [password]')
    }
    // 如果需要自建auth服务, 请fork: https://github.com/zhuweiyou/chatgpt-auth
    const { data } = await axios({
        method: 'POST',
        url: 'https://chatgpt-auth.vercel.app/',
        headers: {
            'X-Email': email,
            'X-Password': password,
        },
    })
    if (!data) {
        throw new Error('failed to get [access_token]')
    }
    res.json({ access_token: data })
}
