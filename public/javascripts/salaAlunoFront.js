async function getSala(bloco, andar, numero_sala){
    axios.post(("https://mauasalas.lcstuber.net/salas/sala/conteudo"),{
        bloco: bloco,
        andar: andar,
        numero_sala: numero_sala
    }, {timeout: 5000})
    .then((data) => {
        const sala = data.data;
        const titulo_reserva = document.getElementById("titulo-reserva");
        titulo_reserva.innerHTML = sala.bloco + sala.andar + sala.numero_sala;
        for (let i = 0; i < sala.length; i++) {
            const caracteristica = sala[i];
            const caracteristica_sala = document.getElementById(caracteristica);
            caracteristica_sala.innerHTML = sala[caracteristica];
        }
    });
}