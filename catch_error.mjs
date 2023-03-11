export function catch_error(err, req, res, next) {
	console.error(err)
	res.json({ message: err.message })
}
