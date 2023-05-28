async function getSala(bloco, andar, numero_sala){
    axios.post(("http://localhost:3000/salas/sala/conteudo"),{
        bloco: bloco,
        andar: andar,
        numero_sala: numero_sala
    })
    .then((data) => {
        console.log(data.data[0])
    });
}