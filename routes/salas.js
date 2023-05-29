var express = require('express');
var router = express.Router();
let banco = require('../conector');
var axios = require('axios');

function isAuthenticated(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/auth/signin'); // redirect to sign-in route
    }
    next();
};

async function callback(rows, req, res) {
    return res.json(rows);
};

router.get("/blocos/lista",
    isAuthenticated,
    async function (req, res, next) {
        banco('select * from blocos;', callback, req, res);
    });

router.post("/blocos/lista",
    isAuthenticated,
    async function (req, res, next) {
        banco('select * from salas WHERE bloco="' + req.body.bloco + '";', callback, req, res);

    });

router.get('/', function (req, res, next) {
    axios.get("https://mauasalas.lcstuber.net/salas/blocos/lista", {
        headers: req.headers
    }).then((data) =>
        res.render('salas', {
            title: 'Mauá Salas - Salas',
            style: "/stylesheets/stylesSalas.css",
            isAuthenticated: req.session.isAuthenticated,
            // isAdministrator: req.session.isAdministrator,
            username: req.session.account && req.session.account.name,
            funcao: "getBlocos(" + JSON.stringify(data.data) + ")",
            script: "/javascripts/salasAlunoFront.js"

        }));
});

router.get('/sala', function (req, res, next) {
    axios.get("https://mauasalas.lcstuber.net/salas/blocos/lista", {
        headers: req.headers
    }).then((data) =>
        res.render('sala', {
            title: 'Mauá Salas - Sala ' + req.query.salaNome,
            style: "/stylesheets/stylesSalas.css",
            isAuthenticated: req.session.isAuthenticated,
            // isAdministrator: req.session.isAdministrator,
            username: req.session.account && req.session.account.name,
            funcao: "getBlocos(" + JSON.stringify(data.data) + ")",
            script: "/javascripts/salasAlunoFront.js"

        }));
});

module.exports = router;