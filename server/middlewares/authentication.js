const { verify } = require('../helpers/jwt')

module.exports = (req, res, next) => {
    try {
        console.log('masuk');
        const decoded = verify(req.headers.token)
        req.authenticatedUser = decoded
        if (req.body.token) res.status(200).json({ message: 'This user is verified!' })
        else next()
    } catch (error) {
        res.status(401).json({ type: 'AUTHENTICATION ERROR', message: 'You do not have access to this page!' })
    }
}