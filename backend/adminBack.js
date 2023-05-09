var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());


const port = 3001;

var listaSalas = [
    {
        numero: 1,
        andar: 1,
        bloco: "A",
        tipo_de_metodologia: "Ativa",
        mesas: 10,
        cadeiras: 20,
        computadores: 0,
        projetor: true,
        tomadas: 10,
        tipo_de_quadro: "Branco",
        texto: "Sala de aula comum",
    },
    {
        numero: 1,
        andar: 1,
        bloco: "B",
        tipo_de_metodologia: "Ativa",
        mesas: 10,
        cadeiras: 20,
        computadores: 0,
        projetor: true,
        tomadas: 10,
        tipo_de_quadro: "Branco",
        texto: "Sala de aula comum",
    },
    {
        numero: 1,
        andar: 1,
        bloco: "C",
        tipo_de_metodologia: "Ativa",
        mesas: 10,
        cadeiras: 20,
        computadores: 0,
        projetor: true,
        tomadas: 10,
        tipo_de_quadro: "Branco",
        texto: "Sala de aula comum",
    },
    {
        numero: 1,
        andar: 1,
        bloco: "C",
        tipo_de_metodologia: "Ativa",
        mesas: 10,
        cadeiras: 20,
        computadores: 0,
        projetor: true,
        tomadas: 10,
        tipo_de_quadro: "Branco",
        texto: "Sala de aula comum",
    },
    {
        numero: 1,
        andar: 1,
        bloco: "E",
        tipo_de_metodologia: "Ativa",
        mesas: 10,
        cadeiras: 20,
        computadores: 0,
        projetor: true,
        tomadas: 10,
        tipo_de_quadro: "Branco",
        texto: "Sala de aula comum",
    }
];
var listaUsuarios = [
    {
        nome: "123",
        email: "a@a.com",
        tipo: "admin",
    }
];

app.get('/salas', (req, res) => {
    res.send(listaSalas);
});

app.post('/salas', (req, res) => {
    sala = {
        numero: req.body.numero,
        andar: req.body.andar,
        bloco: req.body.bloco,
        tipo_de_metodologia: req.body.tipo_de_metodologia,
        mesas: req.body.mesas,
        cadeiras: req.body.cadeiras,
        computadores: req.body.computadores,
        projetor: req.body.projetor,
        tomadas: req.body.tomadas,
        tipo_de_quadro: req.body.tipo_de_quadro,
        texto: req.body.texto,
    };
    listaSalas.push(sala);
    res.send(listaSalas);
});

app.put('/salas', (req, res) => {
    index = req.body.index;
    if (req.body.numero != null) {
        listaSalas[index].numero = req.body.numero;
    }
    if (req.body.andar != null) {
        listaSalas[index].andar = req.body.andar;
    }
    if (req.body.bloco != null) {
        listaSalas[index].bloco = req.body.bloco;
    }
    if (req.body.tipo_de_metodologia != null) {
        listaSalas[index].tipo_de_metodologia = req.body.tipo_de_metodologia;
    }
    if (req.body.mesas != null) {
        listaSalas[index].mesas = req.body.mesas;
    }
    if (req.body.cadeiras != null) {
        listaSalas[index].cadeiras = req.body.cadeiras;
    }
    if (req.body.computadores != null) {
        listaSalas[index].computadores = req.body.computadores;
    }
    if (req.body.projetor != null) {
        listaSalas[index].projetor = req.body.projetor;
    }
    if (req.body.tomadas != null) {
        listaSalas[index].tomadas = req.body.tomadas;
    }
    if (req.body.tipo_de_quadro != null) {
        listaSalas[index].tipo_de_quadro = req.body.tipo_de_quadro;
    }
    if (req.body.texto != null) {
        listaSalas[index].texto = req.body.texto;
    }
    res.send(listaSalas[index]);
});
app.delete("/salas", (req, res) => {
    index = req.body.index;
    listaSalas.splice(index, 1);
    res.send(listaSalas);
});

app.get('/admin', (req, res) => {
    res.send(listaUsuarios);
});

app.post('/admin', (req, res) => {
    usuario = {
        nome: req.body.nome,
        email: req.body.email,
        tipo: req.body.tipo,
    };
    listaUsuarios.push(usuario);
    res.send(listaUsuarios);
});
app.put('/admin', (req, res) => {
    index = req.body.index;
    if (req.body.nome != null) {
        listaUsuarios[index].nome = req.body.nome;
    }
    if (req.body.email != null) {
        listaUsuarios[index].email = req.body.email;
    }
    if (req.body.tipo != null) {
        listaUsuarios[index].tipo = req.body.tipo;
    }
    res.send(listaUsuarios[index]);
});
app.delete("/admin", (req, res) => {
    index = req.body.index;
    listaUsuarios.splice(index, 1);
    res.send(listaUsuarios);
});



app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

