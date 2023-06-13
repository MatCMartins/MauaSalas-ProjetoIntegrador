var salas;  	
const lista_blocos = []
const BLOCOS_POR_PAGINA = 5;

async function carregarBlocos(rows){
    for (let i = 0; i <rows.length;){
        const bloco_pequeno = [];
        for (let j = 0; j < BLOCOS_POR_PAGINA; j++ , i++){
            if (rows[i] == undefined) break;
            bloco_pequeno.push(rows[i].bloco);
        }
        lista_blocos.push(bloco_pequeno);
    }
    const pagination = document.querySelector(".pagination");
    const itemFinal = document.querySelector("#itemFinal");
    for (let i = 0; i < BLOCOS_POR_PAGINA; i++){
        const li = document.createElement("li");
        const a = document.createElement("a");
        li.classList.add("page-item");
        a.classList.add("page-link", "pagina");
        a.id = `pag${i}`;
        a.innerHTML = rows[i].bloco;
        a.addEventListener("click", function(){
        mostrarSalas(a.innerHTML)});
        li.appendChild(a);
        pagination.insertBefore(li, itemFinal);
    }
}

async function carregarSalas(rows){
    salas = rows;
    const lista = document.querySelector(".list-group");
    for (let i = 0; i <rows.length; i++){
        if(rows[i].bloco == "A"){
            let item = document.createElement("li");
            let a_item = document.createElement("a");
            let botao_editar_item = document.createElement("button");
            let botao_excluir_item = document.createElement("button");
            item.classList.add("list-group-item");
            a_item.classList.add("d-inline-block","mt-3");


            botao_editar_item.classList.add("btn","btn-outline-primary","float-end","mt-2","ms-2");
            botao_editar_item.type = "button";
            botao_editar_item.width = "20%";
            botao_editar_item.id = `botao${i}`;
            botao_editar_item.innerHTML = "Editar";
            botao_editar_item.addEventListener("click", function() {
                var modal = new bootstrap.Modal(document.getElementById("modalEditarSala"));
                var titulo = document.querySelector("#tituloEditarSala");
                titulo.innerHTML =  salas[i].bloco + salas[i].andar + salas[i].numero_sala;
                modal.show();
                
            })

            botao_excluir_item.classList.add("btn","btn-outline-danger","float-end","mt-2");
            botao_excluir_item.type = "button";
            botao_excluir_item.id = `botao${i}`;
            botao_excluir_item.innerHTML = "Excluir";
            botao_excluir_item.addEventListener("click", function() {
                var modal = new bootstrap.Modal(document.getElementById("modalDeletarSala"));
                var titulo = document.querySelector("#tituloDeletarSala");
                titulo.innerHTML =  salas[i].bloco + salas[i].andar + salas[i].numero_sala;
                modal.show();
            })

            item.appendChild(a_item);
            item.appendChild(botao_editar_item);
            item.appendChild(botao_excluir_item);
            lista.appendChild(item);
            a_item.id = `Sala${i}`;
            document.querySelector(`#Sala${i}`).innerHTML = salas[i].bloco + salas[i].andar + salas[i].numero_sala;
        }
    }
}
async function mostrarSalas(letra_pagina){
    let list_group = document.querySelector(".list-group");
    while (list_group.firstChild){
        list_group.removeChild(list_group.firstChild);
    }
    for (let i = 0; i <salas.length; i++){
        if(salas[i].bloco == letra_pagina){
            let item = document.createElement("li");
            let a_item = document.createElement("a");
            let botao_editar_item = document.createElement("button");
            let botao_excluir_item = document.createElement("button");
            item.classList.add("list-group-item");
            a_item.classList.add("d-inline-block","mt-3");


            botao_editar_item.classList.add("btn","btn-outline-primary","d-inline-block","float-end","mt-2");
            botao_editar_item.type = "button";
            botao_editar_item.id = `botao${i}`;
            botao_editar_item.innerHTML = "Editar";
            botao_editar_item.addEventListener("click", function() {
                var modal = new bootstrap.Modal(document.getElementById("modalEditarSala"));
                var titulo = document.querySelector("#tituloEditarSala");
                titulo.innerHTML = salas[i].bloco + salas[i].andar + salas[i].numero_sala;
                modal.show();
            })

            botao_excluir_item.classList.add("btn","btn-outline-danger","d-inline-block","float-end","mt-2","ms-2");
            botao_excluir_item.type = "button";
            botao_excluir_item.id = `botao${i}`;
            botao_excluir_item.innerHTML = "Excluir";
            botao_excluir_item.addEventListener("click", function() {
                var modal = new bootstrap.Modal(document.getElementById("modalDeletarSala"));
                var titulo = document.querySelector("#tituloDeletarSala");
                titulo.innerHTML =  salas[i].bloco + salas[i].andar + salas[i].numero_sala;
                modal.show();
            })

            item.appendChild(botao_excluir_item);
            item.appendChild(botao_editar_item);
            item.appendChild(a_item);
            list_group.appendChild(item);
            a_item.id = `Sala${i}`;
            document.querySelector(`#Sala${i}`).innerHTML = salas[i].bloco + salas[i].andar + salas[i].numero_sala;
        }
    }
}
let indiceBloco = 0;
async function trocaPagination(id) {
    const pagination = document.querySelector(".pagination");
    const itemInicial = document.querySelector("#itemInicial");
    const itemFinal = document.querySelector("#itemFinal");
    const ant = document.querySelector("#PaginaAnt");
    const prox = document.querySelector("#PaginaProx");
    if (id == "PaginaProx"){
        indiceBloco++;
        var tam = lista_blocos[indiceBloco].length;
        if (indiceBloco == lista_blocos.length - 1){
            prox.classList.add("disabled");
        }
        if (indiceBloco != 0){
            ant.classList.remove("disabled");
        }
        if (tam < BLOCOS_POR_PAGINA){
            for (let i = 0; i < BLOCOS_POR_PAGINA; i++){
                const pag = document.querySelector(`#pag${i}`);
                if (i < BLOCOS_POR_PAGINA - tam){
                    pag.classList.add("d-none");
                }
                else{
                    pag.innerHTML = lista_blocos[indiceBloco][i-(BLOCOS_POR_PAGINA-tam)];
                }
            }
        }
        else{
            for (let i =0; i < BLOCOS_POR_PAGINA; i++){
                if (lista_blocos[indiceBloco][i] == undefined){
                    break;
                }
                const pag = document.querySelector(`#pag${i}`);
                pag.innerHTML = lista_blocos[indiceBloco][i];
            }
        }
    }
    else{
        var tam = lista_blocos[indiceBloco].length;
        indiceBloco--;
        if (tam < BLOCOS_POR_PAGINA){
            for (let i = 0; i < BLOCOS_POR_PAGINA; i++){
                const pag = document.querySelector(`#pag${i}`);
                pag.classList.remove("d-none");
                pag.innerHTML = lista_blocos[indiceBloco][i];
            }
        }
        else{
            for (let i =0; i < BLOCOS_POR_PAGINA; i++){
                const pag = document.querySelector(`#pag${i}`);
                pag.innerHTML = lista_blocos[indiceBloco][i];
            }
        }
        if (indiceBloco == lista_blocos.length - 2){
            prox.classList.remove("disabled");
        }
        if (indiceBloco == 0){
            ant.classList.add("disabled");
        }
    }
}
  

function cadastrarSala(){
    let bloco = document.querySelector("#bloco").value;
    let numero = document.querySelector("#numero").value;
    let andar = document.querySelector("#andar").value;
    let cadeiras = document.querySelector("#cadeiras").value;
    let mesas = document.querySelector("#mesas").value;
    let numero_computadores = document.querySelector("#numero_computadores").value;
    let numero_projetores = document.querySelector("#numero_projetores").value;
    let numero_quadros = document.querySelector("#numero_quadros").value;
    let tipo_quadro = document.querySelector("#tipo_de_quadro").value;
    let numero_tomadas = document.querySelector("#numero_tomadas").value;
    let tipo_metodo = document.querySelector("#tipo_metodologia").value;
    let descricao = document.querySelector("#descricao_sala").value;
    if (bloco === "" || numero === "" || andar === "" || cadeiras === "" || mesas === "" || numero_computadores === "" || numero_projetores === "" || numero_quadros === "" || tipo_quadro === "" || numero_tomadas === "" || tipo_metodo === "" || descricao === ""){
       showToast("Preencha todos os campos!");
    }
    else if(numero_computadores < 0 || numero_projetores < 0 || numero_quadros < 0 || numero_tomadas < 0 || cadeiras < 0 || mesas < 0){
        showToast("Não é possível inserir valores negativos!");
    }
    else{
        try{
            (axios.post("https://mauasalas.lcstuber.net/admin/manterSalas/lista",{
                bloco: bloco,
                numero_sala: numero,
                andar: andar,
                tipo_metodo: tipo_metodo,
                mesas: mesas,
                cadeiras: cadeiras,
                computadores: numero_computadores,
                tomadas: numero_tomadas,
                quadros: numero_quadros,
                tipo_quadro: tipo_quadro,
                projetores: numero_projetores,
                descricao: descricao}, {timeout: 5000})
            .then(function(response){
                if (response.data == ""){
                    showToast("Sala já cadastrada!");
                }
                else{
                    showToast("Sala cadastrada com sucesso!");
                }
            }));
        }
        catch(err){
            showToast("Erro ao cadastrar sala!");
        }
    }
}

function editarSala(){
    let cadeiras = document.querySelector("#cadeiras_editar").value;
    let mesas = document.querySelector("#mesas_editar").value;
    let numero_computadores = document.querySelector("#numero_computadores_editar").value;
    let numero_projetores = document.querySelector("#numero_projetores_editar").value;
    let numero_quadros = document.querySelector("#numero_quadros_editar").value;
    let tipo_quadro = document.querySelector("#tipo_de_quadro_editar").value;
    let numero_tomadas = document.querySelector("#numero_tomadas_editar").value;
    let tipo_metodo = document.querySelector("#tipo_metodologia_editar").value;
    let descricao = document.querySelector("#descricao_sala_editar").value;


    let tituloEditarSala = document.querySelector("#tituloEditarSala").innerHTML;
    let bloco_editar = tituloEditarSala[0];
    let andar_editar = tituloEditarSala[1];
    let numero_editar = tituloEditarSala[2];
    if (tituloEditarSala.length == 4){
        numero_editar = tituloEditarSala[2] + tituloEditarSala[3];
    }

    if (bloco == "" | numero == "" | andar == "" | cadeiras == "" | mesas == "" | numero_computadores == "" | numero_projetores == "" | numero_quadros == "" | tipo_quadro == "" | numero_tomadas == "" | tipo_metodo == "" | descricao == ""){
        showToast("Preencha todos os campos");
    }else if (numero_computadores < 0 | numero_projetores < 0 | numero_quadros < 0 | numero_tomadas < 0 | cadeiras < 0 | mesas < 0){
        showToast("Não é possível inserir valores negativos");
    }else{
        (axios.put("https://mauasalas.lcstuber.net/admin/manterSalas/lista",{
        tipo_metodo: tipo_metodo,
        mesas: mesas,
        cadeiras: cadeiras,
        computadores: numero_computadores,
        tomadas: numero_tomadas,
        quadros: numero_quadros,
        tipo_quadro: tipo_quadro,
        projetores: numero_projetores,
        descricao: descricao,
        bloco_editar: bloco_editar,
        andar_editar: andar_editar,
        numero_editar: numero_editar}, {timeout: 5000})
        .then(function(response){
            showToast("Sala editada com sucesso!");
        }));
    }
}	

function deletarSala(){
    let tituloEditarSala = document.querySelector("#tituloDeletarSala").innerHTML;
    let bloco_editar = tituloEditarSala[0];
    let andar_editar = tituloEditarSala[1];
    let numero_editar = tituloEditarSala[2];
    if (tituloEditarSala.length == 4){
        numero_editar = tituloEditarSala[2] + tituloEditarSala[3];
    }
    (axios.delete("https://mauasalas.lcstuber.net/admin/manterSalas/lista",{timeout: 5000,
    data:{
        bloco: bloco_editar,
        numero_sala: numero_editar,
        andar: andar_editar
    }}).then(() => {
        showToast("Sala deletada com sucesso!");
    }));
}

function criarItemPagina() {
    const li = document.createElement("li");
    li.classList.add("page-item");
    return li;
}

function criarLinkPagina(index,text) {
    const a = document.createElement("a");
    a.classList.add("page-link", "pagina");
    a.innerHTML = text;
    a.id = "pag" + index;
    return a;
}

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
    recarregar();
}
