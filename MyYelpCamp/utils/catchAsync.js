module.exports = func => { // the func is what you pass in, and return new function that has func executed and catch errors to the nex
    return (req, res, next) => {
        func(req, res, next).catch(next)
    }
}