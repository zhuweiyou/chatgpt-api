export async function get_access_token(req, res) {
    const { email, password, proxy = '' } = req.body
    if (!email || !password) {
        throw new Error('invalid [email] or [password]')
    }

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
        throw new Error(json?.detail || 'failed to get [access_token]')
    }

    res.json({ access_token: json.access_token })
}
