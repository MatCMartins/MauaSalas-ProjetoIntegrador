var express = require('express');
var router = express.Router();
let banco = require('../backend/conector');
var axios = require('axios');


callback = async (rows, req, res) => {
    console.log('Linhas retornadas: ', rows)
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
    var json;
    axios.get('https://mauasalas.lcstuber.net/admin/manterAdmin/lista').then((data) => json = data.data)
    console
    res.render('manterAdministradores', {
        title: 'Mauá Salas - Gerenciar Usuários',
        style: "/stylesheets/stylesAdminPage.css",
        isAuthenticated: req.session.isAuthenticated,
        // isAdministrator: req.session.isAdministrator,
        username: req.session.account && req.session.account.name,
        funcao: "carregarAdministradores("+json+")",
        script: "/javascripts/adminFront.js"
    });
});

router.get('/manterSalas', function (req, res, next) {
    res.render('manterSalas', {
        title: 'Mauá Salas - Gerenciar Salas',
        style: "/stylesheets/stylesManterSalas.css",
        isAuthenticated: req.session.isAuthenticated,
        // isAdministrator: req.session.isAdministrator,
        username: req.session.account && req.session.account.name,
        funcao: "carregarSalas()",
        script: "/javascripts/salasFront.js"
    });
});



module.exports = router;