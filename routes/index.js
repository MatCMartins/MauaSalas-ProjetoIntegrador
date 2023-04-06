/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Mauá Salas',
        isAuthenticated: req.session.isAuthenticated,
        username: req.session.account?.name,
    });
});

module.exports = router;