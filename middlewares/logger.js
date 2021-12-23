function log(req, res, next) {
    console.log("loading...");
    next(); // para que la funcion middleware llame a la siguiente funcion
}

module.exports.log;