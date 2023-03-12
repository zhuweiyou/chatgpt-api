import { PythonShell } from 'python-shell'

export async function get_access_token(req, res) {
    const { email, password } = req.body
    if (!email || !password) {
        throw new Error('invalid [email] or [password]')
    }
    const access_token = await get_access_token_py(email, password)
    if (!access_token) {
        throw new Error('failed to get [access_token]')
    }
    res.json({ access_token })
}

async function get_access_token_py(email, password) {
    try {
        const [access_token] = await PythonShell.run('get_access_token.py', {
            mode: 'text',
            args: [email, password],
        })
        return access_token
    } catch (e) {
        console.error(e)
        return ''
    }
}
