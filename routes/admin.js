var express = require('express');
var router = express.Router();
let banco = require('../conector');
var axios = require('axios');
var cors = require('cors');



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
    banco('select email,tipo_de_user from admin order by bloco asc;', callback, req, res);
});

router.post('/manterAdmin/lista', function (req, res, next) {
    banco('insert into admin (email,tipo_de_user) values ("'+req.body.email+'","'+req.body.tipo+'");', callback, req, res);
});

router.put('/manterAdmin/lista', function (req, res, next) {
    banco('update admin set email="'+req.body.email+'",tipo_de_user="'+req.body.tipo+'" WHERE email="'+req.body.titulo+'";', callback, req, res);
});

router.delete('/manterAdmin/lista', function (req, res, next) {
    banco('delete from admin WHERE email="'+req.body.email+'";', callback, req, res);
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

router.post('/manterSalas/lista', function (req, res, next) {
    banco('insert into salas (bloco,numero_sala,andar,tipo_metodo,mesas,cadeiras,computadores,tomadas,quadros,tipo_quadro,projetores,descricao) values ("'+req.body.bloco+'","'+req.body.numero_sala+'","'+req.body.andar+'","'+req.body.tipo_metodo+'","'+req.body.mesas+'","'+req.body.cadeiras+'","'+req.body.computadores+'","'+req.body.tomadas+'","'+req.body.quadros+'","'+req.body.tipo_quadro+'","'+req.body.projetores+'","'+req.body.descricao+'");', callback, req, res);
});

router.put('/manterSalas/lista', function (req, res, next) {
    banco('update salas set tipo_metodo="'+req.body.tipo_metodo+'",mesas="'+req.body.mesas+'",cadeiras="'+req.body.cadeiras+'",computadores="'+req.body.computadores+'",tomadas="'+req.body.tomadas+'",quadros="'+req.body.quadros+'",tipo_quadro="'+req.body.tipo_quadro+'",projetores="'+req.body.projetores+'",descricao="'+req.body.descricao+'" WHERE bloco="'+req.body.bloco_editar+'" and numero_sala="'+req.body.numero_editar+'" and andar="'+req.body.andar_editar+'";', callback, req, res);
});

router.delete('/manterSalas/lista', function (req, res, next) {
    banco('delete from salas where bloco="'+req.body.bloco+'" and numero_sala="'+req.body.numero_sala+'" and andar="'+req.body.andar+'";', callback, req, res);
});


router.get('/manterSalas', function (req, res, next) {
    const urls = [
        'https://mauasalas.lcstuber.net/admin/manterSalas/lista',
        'http://localhost:3000/admin/manterBlocos/lista'
    ];
    
    const requests = urls.map(url => axios.get(url));
    axios.all(requests).then((axios.spread((...responses) =>
    res.render('manterSalas', {
        title: 'Mauá Salas - Gerenciar Salas',
        style: "/stylesheets/stylesManterSalas.css",
        isAuthenticated: req.session.isAuthenticated,
        // isAdministrator: req.session.isAdministrator,
        username: req.session.account && req.session.account.name,
        funcao: "carregarSalas("+JSON.stringify(responses[0].data)+"); carregarBlocos("+JSON.stringify(responses[1].data)+")",
        script: "/javascripts/salasFront.js"
    }))));
});

router.get('/manterBlocos/lista', function (req, res, next) {
    banco('select * from blocos order by bloco;', callback, req, res);
});

router.post('/manterBlocos/lista', function (req, res, next) {
    banco('insert into blocos (bloco,cor,latitude,longitude) values ("'+req.body.bloco+'","'+req.body.cor+'","'+req.body.latitude+'","'+req.body.longitude+'");', callback, req, res);
});

router.delete('/manterBlocos/lista', function (req, res, next) {
    console.log(req.body.bloco);
    banco('delete from blocos where bloco="'+req.body.bloco+'";', callback, req, res);
});

router.get('/manterBlocos', function (req, res, next) {
    axios.get('http://localhost:3000/admin/manterBlocos/lista').then((data) =>
    res.render('manterBlocos', {
        title: 'Mauá Salas - Gerenciar Blocos',
        style: "/stylesheets/stylesManterBlocos.css",
        isAuthenticated: req.session.isAuthenticated,
        // isAdministrator: req.session.isAdministrator,
        username: req.session.account && req.session.account.name,
        funcao: "getBlocos("+JSON.stringify(data.data)+")",
        script: "/javascripts/blocosFront.js"
    }));
});

module.exports = router;