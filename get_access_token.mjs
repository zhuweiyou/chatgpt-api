import axios from 'axios'

export async function get_access_token(req, res) {
    const { email, password } = req.body
    const { data } = await axios({
        method: 'POST',
        url: 'https://chat.gateway.do/api/auth/login',
        data: new URLSearchParams({
            username: email,
            password,
        }),
    })
    if (!data.accessToken) {
        throw new Error('failed to get [access_token]')
    }

    res.json({ access_token: data.accessToken, expires: data.expires })
}
