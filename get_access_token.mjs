export async function get_access_token(req, res) {
    const { email, password, proxy = '' } = req.body
    if (!email || !password) {
        throw new Error('invalid [email] or [password]')
    }

    // 你也可以 Fork https://github.com/zhuweiyou/chatgpt-auth 自建 auth 服务
    const response = await fetch('https://chatgpt-auth.vercel.app/api', {
        method: 'POST',
        headers: {
            email,
            password,
            proxy,
        },
    })
    const json = await response.json()
    if (!json?.access_token) {
        throw new Error(json?.message || 'failed to get [access_token]')
    }

    res.json({ access_token: json.access_token })
}
