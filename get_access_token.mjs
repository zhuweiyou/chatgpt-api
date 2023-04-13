export async function get_access_token(req, res) {
    const { email, password } = req.body
    if (!email || !password) {
        throw new Error('invalid [email] or [password]')
    }

    const login_response = await fetch('https://chat.gateway.do/api/auth/login', {
        method: 'POST',
        body: new URLSearchParams({
            username: email,
            password,
        }),
    })
    const json = await login_response.json()
    if (!json.accessToken) {
        throw new Error(json.detail || 'failed to get [access_token]')
    }

    res.json({ access_token: json.accessToken, expires: json.expires })
}
