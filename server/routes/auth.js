// write unit tests first for auth.js
// and see if you are able to obtain a username

// using 2 external dependencies
// npm install cookie-session
// npm install cas

// can't use app.use inside the app.get('/') for clubs
// because we need to have an unprotected interface

// change it up to Dondero's example once done

const express = require('express');
// require('cookie-session');
const http = require('express');
const queryString = require('querystring');
const url = require('url');
const { promsify } = require('util');
const regex = require('regex');
const router = express.Router();


// // external dependencies
// // style?
let CAS = require('cas');

CAS_URL = 'https://fed.princeton.edu/cas/'

// given the url -> we want to only extract the ticket
// return url after stripping out the ticket parameter that
// was added by the CAS server
function stripTicket(url) {
    if (url == null) {
        return "something is badly wrong";
    }

    // write comments for regex here later
    // replace it with nothing -> but just search and strip the ticket out
    url = url.replace('/ticket=[^&]*&?/', '');
    url = url.replace('/\?&?$|&$/', '')
    return url;
}

// validate a login ticket by contacting the CAS server
// if valid, return the user's username; otherwise, return null
async function validate(ticket) {
    // could also use querystring here!!!
    const valUrl = CAS_URL + 'validate' + '?service=' +
    encodeURIComponent(stripTicket(reqUrl)) + '&ticket=' +
    encodeURIComponent(ticket);

    // define async and await later
    const [line1, line2] = await promsify(http.get)(valUrl);
    if (!line1.startsWith('yes')) {
        return null;
    }

    // validation is good to go!
    return line2;
}

// authenticate the remote user, and return the user's username
// do not return unless the user is successfully authenticated
async function authenticate(req, res) {
    if (req.session.netid) {
        return req.session.netid;
    }

    // if the request does not contain a login ticket,
    // then redirect the browser to the login page to get one
    const ticket = req.query.ticket;
    if(!ticket) {
        // when pushing to deployment -> have the other configHost ready to go
        const configHost = 'localhost:5050';
        const loginUrl = CAS_URL + "login?service=" + 'http://'+ configHost + "/";
        return res.redirect(loginUrl);
    }

    // if the login ticket is invalid, then redirect the browser
    // to the login page to get a new one
    const netid = await validate(ticket);
    if (!netid) {
        // use the stripTicket function!!!!
        const configHost = 'localhost:5050';
        const loginUrl = CAS_URL + "login?service=" + 'http://'+ configHost + "/";
        return res.redirect(loginUrl);
    }

    // the user is authenticated, so store the username in the session
    req.session.netid = netid.trim();
    return netid;
}

// when you logout -> should logout of App and CAS
function logoutApp(req, res) {
    // null the session contents; let it get garbage collected
    req.session = null;
    const configHost = 'localhost:5050';
    const logoutUrl = CAS_URL + "logout?service=" + 'http://'+ configHost + "/";
    res.redirect(logoutUrl);

    // return to logout screen -> which is the login page
}

function requireAuth(req, res, next) {
    // learn the promises
    authenticate(req, res).then((netid) => {
        if (!netid) {
            return;
        }
        console.log(netid);
        next();
    });
}

router.get('/logoutApp', logoutApp);
router.get('/login', requireAuth);

module.exports = router;
