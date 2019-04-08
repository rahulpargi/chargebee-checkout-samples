var fs = require("fs");

module.exports = {
	cert: fs.readFileSync(__dirname + "/../cert/localhost.pem"),
	key: fs.readFileSync(__dirname + "/../cert/localhost.key"),
	passphrase: "12345"
};