var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('manterSalas', {
        title: 'Mauá Salas - Manter Salas',
        style: "/stylesheets/stylesManterSalas.css",
        isAuthenticated: req.session.isAuthenticated,
        // isAdministrator: req.session.isAdministrator,
        username: req.session.account && req.session.account.name,
    });
});

module.exports = router;