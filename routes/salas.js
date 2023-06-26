require('dotenv').config();

var express = require('express');
var router = express.Router();
let banco = require('../conector');
var axios = require('axios');
var createError = require('http-errors');

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

router.get('/',
    isAuthenticated,
    async function (req, res, next) {
        axios.get(process.env.POST_LOGOUT_REDIRECT_URI+"salas/blocos/lista", {
            timeout: 5000,
            headers: req.headers
        }).then((data) =>
            res.render('salas', {
                url: process.env.POST_LOGOUT_REDIRECT_URI,
                title: 'Mauá Salas - Salas',
                style: "/stylesheets/stylesSalas.css",
                isAuthenticated: req.session.isAuthenticated,
                username: req.session.account && req.session.account.name,
                funcao: "getBlocos(" + JSON.stringify(data.data) + ")",
                script: "/javascripts/salasAlunoFront.js"

            }));
    });

router.post("/sala/conteudo",
    isAuthenticated,
    async function (req, res, next) {
        banco('select * from salas where bloco = "' + req.body.bloco + '" and andar = ' + req.body.andar + " and numero_sala =" + req.body.numero_sala + ';', callback, req, res);
    });

router.get('/sala',
    isAuthenticated,
    async function (req, res, next) {
        axios.get(process.env.POST_LOGOUT_REDIRECT_URI+"salas/blocos/lista", {
            timeout: 5000,
            headers: req.headers
        }).then((data) => {
            console.log(req.query);
            if (req.query.bloco == undefined || req.query.andar == undefined || req.query.numero_sala == undefined) {
                next(createError(400));
            } else {
            res.render('sala', {
                url: process.env.POST_LOGOUT_REDIRECT_URI,
                title: 'Mauá Salas - Sala ' + req.query.bloco + req.query.andar + req.query.numero_sala,
                style: "/stylesheets/stylesSala.css",
                isAuthenticated: req.session.isAuthenticated,
                username: req.session.account && req.session.account.name,
                funcao: 'getSala("' + req.query.bloco + '",' + req.query.andar + "," + req.query.numero_sala + ")",
                script: "/javascripts/salaAlunoFront.js"
            })}
        });
    });




module.exports = router;