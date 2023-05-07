var express = require('express');
var router = express.Router();

router.get('/manterAdmin', function (req, res, next) {
    res.render('manterAdministradores', {
        title: 'Mauá Salas - Gerenciar Usuários',
        style: "/stylesheets/stylesAdminPage.css",
        isAuthenticated: req.session.isAuthenticated,
        // isAdministrator: req.session.isAdministrator,
        username: req.session.account && req.session.account.name,
    });
});

router.get('/manterSalas', function (req, res, next) {
    res.render('manterSalas', {
        title: 'Mauá Salas - Gerenciar Salas',
        style: "/stylesheets/stylesManterSalas.css",
        isAuthenticated: req.session.isAuthenticated,
        // isAdministrator: req.session.isAdministrator,
        username: req.session.account && req.session.account.name,
    });
});



module.exports = router;