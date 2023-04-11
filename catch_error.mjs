export function catch_error(err, req, res, next) {
    console.error(err)
    res.status(500)
    res.json({ message: err.message })
}
