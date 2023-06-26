/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

require('dotenv').config();

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {
        url: process.env.POST_LOGOUT_REDIRECT_URI,
        adoptID: process.env.ADOPT_WEBSITE_ID,
        title: 'Mauá Salas',
        style: "/stylesheets/stylesHomePage.css",
        isAuthenticated: req.session.isAuthenticated,
        // isAdministrator: req.session.isAdministrator,
        username: req.session.account && req.session.account.name,
    });
});

module.exports = router;