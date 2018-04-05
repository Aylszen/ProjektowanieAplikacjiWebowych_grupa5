const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db.js');

const app = express();

const PORT = 8080;
const BASE_PATH = '/trello_copy_app/api';

app.use(bodyParser.json());

app.post(`${BASE_PATH}/register`, (req, res) => {
    res.set('content-type', 'application/json');
    let body = req.body;

    let newUser = body.user;
    if (newUser) {
        if (newUser.fname && newUser.fname !== '' && newUser.lname && newUser.lname !== '' && newUser.username && newUser.username !== '' && newUser.password && newUser.password !== '' && newUser.email && newUser.email !== '') {
            db.users.findByUsername(newUser.username).then((result) => {
                if (result === null) {
                    db.users.create(newUser).then((result) => {
                        if (result.result.ok && result.result.ok === 1) {
                            res.end(JSON.stringify({valid: true, info: 'User was successfully created'}));
                        } else {
                            res.end(JSON.stringify({valid: false, info: 'Database error'}));
                        }
                    });
                } else {
                    res.end(JSON.stringify({
                        valid: false,
                        info: 'Username specified in user object already exists in database'
                    }));
                }
            });
        } else {
            res.end(JSON.stringify({
                valid: false,
                info: 'User object must have all necessary fields which can\'t be empty'
            }));
        }
    } else {
        res.end(JSON.stringify({valid: false, info: 'No user object in request body'}));
    }
});

app.post(`${BASE_PATH}/login`, (req, res) => {
    res.set('content-type', 'application/json');
    let body = req.body;

    let user = body.user;
    if (user) {
        if (user.username && user.username !== '' && user.password && user.password !== '') {
            db.users.findByUsername(user.username).then((result) => {
                if (result !== null) {
                    if (result.password === user.password) {
                        res.end(JSON.stringify({valid: true, info: 'Password for this user is correct'}));
                    } else {
                        res.end(JSON.stringify({
                            valid: false,
                            info: 'Password for this user is incorrect'
                        }));
                    }
                } else {
                    res.end(JSON.stringify({
                        valid: false,
                        info: 'User with specified username isn\'t exist in database'
                    }));
                }
            });
        } else {
            res.end(JSON.stringify({
                valid: false,
                info: 'User object must have all necessary fields which can\'t be empty'
            }));
        }
    } else {
        res.end(JSON.stringify({valid: false, info: 'No user object in request body'}));
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});