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

var recorrencia = "";
$('input[name="recorrencia"]').change(function () {
    if ($('input[name="recorrencia"]:checked').val() === "unique") {
        recorrencia = "unique"
        input = document.querySelector('.data-final');
        input.style.display = 'none';
    } else if ($('input[name="recorrencia"]:checked').val() === "WEEKLY") {
        recorrencia = "WEEKLY"
        document.querySelector('.data-final').removeAttribute('style');
    } else if ($('input[name="recorrencia"]:checked').val() === "MONTHLY"){
        recorrencia = "MONTHLY"
        document.querySelector('.data-final').removeAttribute('style');
    }
});
var proposito = ""
$('input[name="proposito"]').change(function () {
    if ($('input[name="proposito"]:checked').val() === "aula") {
        proposito = "aula"
        document.querySelector('.prova').style.display = 'none';
        document.querySelector('.aula').removeAttribute('style');
    } else if ($('input[name="proposito"]:checked').val() === "comum") {
        proposito = "comum"
        document.querySelector('.aula').style.display = 'none';
        document.querySelector('.prova').style.display = 'none';
    } else if ($('input[name="proposito"]:checked').val() === "prova"){
        proposito = "prova"
        document.querySelector('.prova').removeAttribute('style');
        document.querySelector('.aula').style.display = 'none';
    }
});


function recarregar() {
    setTimeout(function () {
        location.reload();
    }, 2000)
};
function showToast(texto){
    const toastMensagem = document.getElementById('mensagemToast')
    const textoToast = document.querySelector('.toast-body')
    textoToast.innerHTML = texto;
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastMensagem)
    toastBootstrap.show()
}
function cadastrarReserva(){
    console.log('cadastrar')
    var dataInicio = document.getElementById('calendario-inicio').value;
    var horarioInicio = document.getElementById('hora-inicio').value;
    var horarioFinal = document.getElementById('hora-fim').value;

    var dataFinal = document.getElementById('calendario-final').value;

    var cursoAula = document.getElementById('curso-aula').value;
    var materiaAula = document.getElementById('materia-aula').value;
    var grupo = document.getElementById('grupo').value;
    var turma = document.getElementById('turma').value;
    var laboratorio = document.getElementById('laboratorio').value;
    var professor = document.getElementById('nome-professor').value;

    var cursoProva = document.getElementById('curso-prova').value;  
    var materiaProva = document.getElementById('materia-prova').value;


        var nomeSala = document.getElementById("titulo-reserva").innerHTML;
        if (dataInicio != "" && horarioInicio != "" && horarioInicio != "HH:MM" && horarioFinal != "" && horarioFinal != "HH:MM" && recorrencia != "" && proposito != "") {
            if (recorrencia === "unique") {
                if (proposito === "comum") {
                    axios.post('https://mauasalas.lcstuber.net/reservas/calendario/lista', {
                        nome: nomeSala,
                        dia: dataInicio,
                        horaInicio: horarioInicio,
                        horaFim: horarioFinal,
                        diaFimRec: "",
                        freq: recorrencia,
                        tipo: proposito,
                        curso: "",
                        materia: "",
                        GTL: "",
                        professor: ""
                    }, { timeout: 5000 })
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    showToast("Reserva cadastrada com sucesso!");
                    recarregar()
                }
                else if (proposito === "aula") {
                    if (cursoAula != "---" && materiaAula != "" && grupo != "" && turma != "" && laboratorio != "" && professor != "") {
                        axios.post('https://mauasalas.lcstuber.net/reservas/calendario/lista', {
                            nome: nomeSala,
                            dia: dataInicio,
                            horaInicio: horarioInicio,
                            horaFim: horarioFinal,
                            diaFimRec: "",
                            freq: recorrencia,
                            tipo: proposito,
                            curso: cursoAula,
                            materia: materiaAula,
                            GTL: grupo,
                            professor: professor
                        }, { timeout: 5000 })
                            .then(function (response) {
                                console.log(response);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        showToast("Reserva cadastrada com sucesso!");
                        recarregar()
                    }
                } else if (proposito === "prova") {
                    if (cursoProva != "---" && materiaProva != "") {
                        axios.post('https://mauasalas.lcstuber.net/reservas/calendario/lista', {
                            nome: nomeSala,
                            dia: dataInicio,
                            horaInicio: horarioInicio,
                            horaFim: horarioFinal,
                            diaFimRec: "",
                            freq: recorrencia,
                            tipo: proposito,
                            curso: cursoProva,
                            materia: materiaProva,
                            GTL: "",
                            professor: ""
                        }, { timeout: 5000 })
                            .then(function (response) {
                                console.log(response);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        showToast("Reserva cadastrada com sucesso!");
                        recarregar();
                    }
                }
            } else if ((recorrencia === "WEEKLY" || recorrencia === "MONTHLY") && dataFinal != "") {
                if (proposito === "comum") {
                    axios.post('https://mauasalas.lcstuber.net/reservas/calendario/lista', {
                        nome: nomeSala,
                        dia: dataInicio,
                        horaInicio: horarioInicio,
                        horaFim: horarioFinal,
                        diaFimRec: dataFinal,
                        freq: recorrencia,
                        tipo: proposito,
                        curso: "",
                        materia: "",
                        GTL: "",
                        professor: ""
                    }, { timeout: 5000 })
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    showToast("Reserva cadastrada com sucesso!");
                    recarregar()
                }
                else if (proposito === "aula") {
                    if (cursoAula != "---" && materiaAula != "" && grupo != "" && turma != "" && laboratorio != "" && professor != "") {
                        axios.post('https://mauasalas.lcstuber.net/reservas/calendario/lista', {
                            nome: nomeSala,
                            dia: dataInicio,
                            horaInicio: horarioInicio,
                            horaFim: horarioFinal,
                            diaFimRec: dataFinal,
                            freq: recorrencia,
                            tipo: proposito,
                            curso: cursoAula,
                            materia: materiaAula,
                            GTL: grupo,
                            professor: professor
                        }, { timeout: 5000 })
                            .then(function (response) {
                                console.log(response);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        showToast("Reserva cadastrada com sucesso!");
                        recarregar()
                    }
                } else if (proposito === "prova") {
                    if (cursoProva != "---" && materiaProva != "") {
                        axios.post('https://mauasalas.lcstuber.net/reservas/calendario/lista', {
                            nome: nomeSala,
                            dia: dataInicio,
                            horaInicio: horarioInicio,
                            horaFim: horarioFinal,
                            diaFimRec: dataFinal,
                            freq: recorrencia,
                            tipo: proposito,
                            curso: cursoProva,
                            materia: materiaProva,
                            GTL: "",
                            professor: ""
                        }, { timeout: 5000 })
                            .then(function (response) {
                                console.log(response);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        showToast("Reserva cadastrada com sucesso!");
                        recarregar();
                    }
                }
            }
        }
        else{
            showToast("Preencha todos os campos!");        
        }
}
