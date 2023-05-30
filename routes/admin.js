var express = require('express');
var router = express.Router();
let banco = require('../conector');
let mail = require('../mailer');
var axios = require('axios');
var createError = require('http-errors');

function isAuthenticated(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/auth/signin'); // redirect to sign-in route
    }
    else if (req.session.userType != 1){
        next(createError(403));
    }
    else{
        next();
    }
};

callback = async (rows, req, res) => {
    return res.json(rows);
};

router.get('/manterAdmin/lista',
    isAuthenticated,
    async function (req, res, next) {
        banco('select email,tipo_de_user from admin;', callback, req, res);
    });

router.post('/manterAdmin/lista',
    isAuthenticated,
    async function (req, res, next) {
        banco('insert into admin (email,tipo_de_user) values ("' + req.body.email + '","' + req.body.tipo + '");', callback, req, res);
        mail(req.body.email, "Administradores Mauá Salas",`Você foi adicionado como ${(req.body.tipo == 1) ? "administrador" : (req.body.tipo == 2) ? "coordenador" : "laboratorista"} no sistema do Mauá Salas por: <a href=mailto:${req.session.account.username}>${req.session.account.name}</a>`).catch(console.error);
    });

router.put('/manterAdmin/lista',
    isAuthenticated,
    async function (req, res, next) {
        banco(`update admin set tipo_de_user='${req.body.tipo}' WHERE email='${req.body.email}';`, callback, req, res);
        mail(req.body.email, "Administradores Mauá Salas",`Seus privilégios no sistema do Mauá Salas foram atualizados para ${(req.body.tipo == 1) ? "administrador" : (req.body.tipo == 2) ? "coordenador" : "laboratorista"} por: <a href=mailto:${req.session.account.username}>${req.session.account.name}</a>`).catch(console.error);
    });

router.delete('/manterAdmin/lista',
    isAuthenticated,
    async function (req, res, next) {
        banco('delete from admin WHERE email="' + req.body.email + '";', callback, req, res);
        mail(req.body.email, "Administradores Mauá Salas",`Seus privilégios de ${req.body.tipo} no sistema do Mauá Salas foram revogados por: <a href=mailto:${req.session.account.username}>${req.session.account.name}</a>`).catch(console.error);
    });

router.get('/manterAdmin',
    isAuthenticated,
    async function (req, res, next) {
        axios.get('https://mauasalas.lcstuber.net/admin/manterAdmin/lista', {
            headers: req.headers
          }).then((data) =>
            res.render('manterAdministradores', {
                title: 'Mauá Salas - Gerenciar Usuários',
                style: "/stylesheets/stylesAdminPage.css",
                isAuthenticated: req.session.isAuthenticated,
                // isAdministrator: req.session.isAdministrator,
                username: req.session.account && req.session.account.name,
                funcao: "carregarAdministradores(" + JSON.stringify(data.data) + ")",
                script: "/javascripts/adminFront.js"
            }));
    });

router.get('/manterSalas/lista',
    
    async function (req, res, next) {
        banco('select * from salas;', callback, req, res);
    });

router.post('/manterSalas/lista',
    isAuthenticated,
    async function (req, res, next) {
        banco('insert into salas (bloco,numero_sala,andar,tipo_metodo,mesas,cadeiras,computadores,tomadas,quadros,tipo_quadro,projetores,descricao) values ("' + req.body.bloco + '","' + req.body.numero_sala + '","' + req.body.andar + '","' + req.body.tipo_metodo + '","' + req.body.mesas + '","' + req.body.cadeiras + '","' + req.body.computadores + '","' + req.body.tomadas + '","' + req.body.quadros + '","' + req.body.tipo_quadro + '","' + req.body.projetores + '","' + req.body.descricao + '");', callback, req, res);
    });

router.put('/manterSalas/lista',
    isAuthenticated,
    async function (req, res, next) {
        banco('update salas set tipo_metodo="' + req.body.tipo_metodo + '",mesas="' + req.body.mesas + '",cadeiras="' + req.body.cadeiras + '",computadores="' + req.body.computadores + '",tomadas="' + req.body.tomadas + '",quadros="' + req.body.quadros + '",tipo_quadro="' + req.body.tipo_quadro + '",projetores="' + req.body.projetores + '",descricao="' + req.body.descricao + '" WHERE bloco="' + req.body.bloco_editar + '" and numero_sala="' + req.body.numero_editar + '" and andar="' + req.body.andar_editar + '";', callback, req, res);
    });

router.delete('/manterSalas/lista',
    isAuthenticated,
    async function (req, res, next) {
        banco('delete from salas where bloco="' + req.body.bloco + '" and numero_sala="' + req.body.numero_sala + '" and andar="' + req.body.andar + '";', callback, req, res);
    });


router.get('/manterSalas',
    isAuthenticated,
    async function (req, res, next) {
        const urls = [
            'https://mauasalas.lcstuber.net/admin/manterSalas/lista',
            'https://mauasalas.lcstuber.net/admin/manterBlocos/lista'
        ];

        const requests = urls.map(url => axios.get(url, {
            headers: req.headers
          }));
        axios.all(requests).then((axios.spread((...responses) =>
            res.render('manterSalas', {
                title: 'Mauá Salas - Gerenciar Salas',
                style: "/stylesheets/stylesManterSalas.css",
                isAuthenticated: req.session.isAuthenticated,
                // isAdministrator: req.session.isAdministrator,
                username: req.session.account && req.session.account.name,
                funcao: "carregarSalas(" + JSON.stringify(responses[0].data) + "); carregarBlocos(" + JSON.stringify(responses[1].data) + ")",
                script: "/javascripts/salasFront.js"
            }))));
    });

router.get('/manterBlocos/lista',
    
    async function (req, res, next) {
        banco('select * from blocos order by bloco;', callback, req, res);
    });

router.post('/manterBlocos/lista',
    isAuthenticated,
    async function (req, res, next) {
        banco('insert into blocos (bloco,cor,latitude,longitude) values ("' + req.body.bloco + '","' + req.body.cor + '","' + req.body.latitude + '","' + req.body.longitude + '");', callback, req, res);
    });

router.delete('/manterBlocos/lista',
    isAuthenticated,
    async function (req, res, next) {
        banco('delete from blocos where bloco="' + req.body.bloco + '";', callback, req, res);
    });

router.get('/manterBlocos',
    isAuthenticated,
    async function (req, res, next) {
        axios.get('https://mauasalas.lcstuber.net/admin/manterBlocos/lista', {
            headers: req.headers
          }).then((data) =>
            res.render('manterBlocos', {
                title: 'Mauá Salas - Gerenciar Blocos',
                style: "/stylesheets/stylesManterBlocos.css",
                isAuthenticated: req.session.isAuthenticated,
                // isAdministrator: req.session.isAdministrator,
                username: req.session.account && req.session.account.name,
                funcao: "getBlocos(" + JSON.stringify(data.data) + ")",
                script: "/javascripts/blocosFront.js"
            }));
    });

module.exports = router;