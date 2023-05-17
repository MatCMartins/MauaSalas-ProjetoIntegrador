var express = require('express');
var router = express.Router();
let banco = require('../conector');
var axios = require('axios');


callback = async (rows, req, res) => {
    if (!req.session.isAuthenticated){
        return res.json(rows);
    }
    else{
        return res.json({
            "unauthorized": "unauthorized"
        });
    }
};

router.get('/manterAdmin/lista', function (req, res, next) {
    banco('select email,tipo_de_user from admin;', callback, req, res);
});

router.get('/manterAdmin', function (req, res, next) {
    axios.get('https://mauasalas.lcstuber.net/admin/manterAdmin/lista').then((data) =>
    res.render('manterAdministradores', {
        title: 'Mauá Salas - Gerenciar Usuários',
        style: "/stylesheets/stylesAdminPage.css",
        isAuthenticated: req.session.isAuthenticated,
        // isAdministrator: req.session.isAdministrator,
        username: req.session.account && req.session.account.name,
        funcao: "carregarAdministradores("+JSON.stringify(data.data)+")",
        script: "/javascripts/adminFront.js"
    }));
});

router.get('/manterSalas/lista', function (req, res, next) {
    banco('select * from salas;', callback, req, res);
});

router.get('/manterSalas', function (req, res, next) {
    axios.get('https://mauasalas.lcstuber.net/admin/manterSalas/lista').then((data) =>
    res.render('manterSalas', {
        title: 'Mauá Salas - Gerenciar Salas',
        style: "/stylesheets/stylesManterSalas.css",
        isAuthenticated: req.session.isAuthenticated,
        // isAdministrator: req.session.isAdministrator,
        username: req.session.account && req.session.account.name,
        funcao: "carregarSalas("+JSON.stringify(data.data)+")",
        script: "/javascripts/salasFront.js"
    }));
});



module.exports = router;