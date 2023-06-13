async function getSala(bloco, andar, numero_sala){
    axios.post(("https://mauasalas.lcstuber.net/salas/sala/conteudo"),{
        bloco: bloco,
        andar: andar,
        numero_sala: numero_sala
    })
    .then((data) => {
        const sala = data.data[0];
        const titulo_reserva = document.getElementById("titulo-reserva");
        titulo_reserva.innerHTML = sala.bloco + sala.andar + sala.numero_sala;
        const lista_caracteristicas = document.querySelector(".list-group");
        const chaves = Object.keys(sala);
        for (let i = 2; i < chaves.length-2; i++) {
            const div = document.createElement('div');
            div.classList.add("list-group-item");
            const arr = chaves[i].split("_");
            const nome = document.createElement('p');
            nome.classList.add("m-0","nome");
            
            for (var j = 0; j < arr.length; j++) {
                arr[j] = arr[j].charAt(0).toUpperCase() + arr[j].slice(1);
            }

            nome.innerHTML = arr.join(" ");

            const valor = document.createElement('p');
            valor.classList.add("float-end","valor");
            valor.id = chaves[i];
            valor.innerHTML = sala[chaves[i]];

            div.appendChild(nome);
            div.appendChild(valor);
            lista_caracteristicas.appendChild(div);
        }
    });
}