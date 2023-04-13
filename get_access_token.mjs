export async function get_access_token(req, res) {
    const { email, password } = req.body
    if (!email || !password) {
        throw new Error('invalid [email] or [password]')
    }

    const response = await fetch('https://chat.gateway.do/api/auth/login', {
        method: 'POST',
        body: new URLSearchParams({
            username: email,
            password,
        }),
    })
    const json = await response.json()
    if (!json || !json.accessToken) {
        throw new Error(json?.detail || 'failed to get [access_token]')
    }

    res.json({ access_token: json.accessToken, expires: json.expires })
}
