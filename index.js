var express = require("express");
var jwt = require('jsonwebtoken');

var app = express();

app.get("/api", (req, res) => {
    res.send("Hello from express!")
});

const SECRET_KEY = "some_secret_new_key";

/**
 * Provide the Auth token that will be validated using JWT and the secret key
 */
app.get("/api/secured", verifyToken, (req, res) => {

    jwt.verify(req.token, SECRET_KEY, (error, data) => {
        var message = {
            message: error ? "You are not authorized." : "You are authorised.",
            authData: data,
            error : error
        }
        res.send(message);
    });
});

/**
 * Call using basic authintication using username and password and receive auth token
 */
app.post("/api/login", (req, res) => {
    var auth = req.headers['authorization'];  // auth is in base64(username:password)  so we need to decode the base64

    var loginInfo = getLogin(auth);
    if (!loginInfo) {
        // Sending a 401 will require authentication, we need to send the 'WWW-Authenticate' to tell them the sort of authentication to use
        // Basic auth is quite literally the easiest and least secure, it simply gives back  base64( username + ":" + password ) from the browser
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
    }

    // TODO: Here check the database and validate the username and password are valid then issue token
    var mockUser = {name:"rahman mahmoodi", id:1111, role:"Admin"}

    var token = jwt.sign({ userName: loginInfo.userName, user: mockUser }, SECRET_KEY);
    res.json({ token: token });
});

/**
 * Helper function that parses the header for authorization and splits the username and password
 * @param {*} auth : bearar <token>
 */
function getLogin(auth) {
    if (!auth) {     // No Authorization header was passed in so it's the first time the browser hit us
        return null;
    }

    if (auth) {    // The Authorization was passed in so now we validate it
        var tmp = auth.split(' ');   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
        var buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
        var plain_auth = buf.toString();        // read it back out as a string
        // At this point plain_auth = "username:password"
        var creds = plain_auth.split(':');      // split on a ':'
        var username = creds[0];
        var password = creds[1];

        return { userName: username, password: password };
    }
}

/**
 * Helper function that is used to grab Auth token from the header and assign it to request
 * @param {*} req : request
 * @param {*} res : response
 * @param {*} next : what to be called next
 */
function verifyToken(req, res, next) {
    var auth = req.headers["authorization"];

    if (!auth) {
        res.sendStatus(401);
        return;
    }

    var authParts = auth.split(' ');
    var token = authParts[1];

    if (!token) {
        res.sendStatus(401);
        return;
    }

    req.token = token;
    next();
}


app.listen(55000, () => {
    console.log("Server is listening at port 55000.");
})