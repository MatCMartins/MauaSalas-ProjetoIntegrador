async function getSala(bloco, andar, numero_sala){
    axios.post(("https://mauasalas.lcstuber.net/salas/sala/conteudo"),{
        bloco: bloco,
        andar: andar,
        numero_sala: numero_sala
    }, {timeout: 5000})
    .then((data) => {
        console.log(data.data[0])
    });
}