// write unit tests first for auth.js
// and see if you are able to obtain a username

// using 2 external dependencies
// npm install cookie-session
// npm install cas

// can't use app.use inside the app.get('/') for clubs
// because we need to have an unprotected interface

// change it up to Dondero's example once done

const express = require('express');
const router = express.Router();

// external dependencies
// style?
let CAS = require('cas');
let session = require('cookie-session');

CAS_URL = 'https://fed.princeton.edu/cas/'
// domain name and port
// to fit other routing
let configHost = 'localhost:5050';

let cas = new CAS({
    base_url: CAS_URL,
    service: configHost + '/auth/verify'
});


// explain this code
// router.use('*', function (req, res, next) {
//     next();
// });

// redirect the user to Princeton's CAS Server
// keep as home for now -> change to login later
router.get('/login', async (req, res) => {
    process.stdout.write("I'm inside auth");

    // save the user's redirection to a cookie
    if (typeof(req.query.redirect) === 'string') {
        req.session.redirect = req.query.redirect;
    }

    // // then here we would redirect the user to the CAS server
    res.redirect(CAS_URL + 'login?service=' + cas.service);
});

function validate(ticket) {
    // check if the user's ticket is valid
    cas.validate(ticket, function (err, status, netid) {
        if (err) {
            process.stdout.write('Error in ticket CAS validation' + err);
            res.sendStatus(500);
            return;
        }
    });
}

// Handles replies from Princeton's CAS server
router.get('/verify', function (req, res) {
    // check if the user has a redirection destination
    let redirectDest = req.session.redirect || '/';

    // if user already has a valid CAS session then send them to their destination
    if (req.session.cas) {
        res.redirect(redirectDest);
        return;
    }

    // do not have a valid CAS session -> need to build one
    let ticket = req.query.ticket;

    // if user does not have a ticket then send them to the
    // home directory
    if (typeof (ticket) === 'undefined') {
        res.redirect('/');
        return;
    }


    validate(ticket);

    req.session.cas = {
        // status is deprecated
        // may need to rewrite it later
        status: status,
        netid: netid
    };

    process.stdout.write(netid + "/n");

});

module.exports = router;


// still need to validate whether if a user's account (via netid) already exists
// or if a new one needs to be recreated

// also see how can you pass this netid around

function strip_ticket(url) {
    if (url === null) {
        return "something is badly wrong";
    }
    
}

function validate(ticket) {

}

function authenticate() {

}

function logoutApp() {

}

function logoutCAS() {

}

// have some unit testing here
// to see if you can extract a username