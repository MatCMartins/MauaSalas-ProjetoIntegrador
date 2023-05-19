var salas;  	
const l = [];
var lista_blocos;
const BLOCOS_POR_PAGINA = 5;
async function carregarSalas(rows){
    salas = rows;
    for (let i = 0; i <rows.length; i++){
        l.push(rows[i].bloco);
    }
    lista_blocos = [...new Set(l)].sort();
    const pagination = document.querySelector(".pagination");
    const itemFinal = document.querySelector("#itemFinal");
    for (let i = 0; i < BLOCOS_POR_PAGINA; i++){
        const li = document.createElement("li");
        const a = document.createElement("a");
        li.classList.add("page-item");
        a.classList.add("page-link", "pagina");
        a.id = `pag${i}`;
        a.innerHTML = lista_blocos[i];
        a.addEventListener("click", function(){
        mostrarSalas(a.innerHTML)});
        li.appendChild(a);
        pagination.insertBefore(li, itemFinal);
    }
    const lista = document.querySelector(".list-group");
    for (let i = 0; i <rows.length; i++){
        if(rows[i].bloco == lista_blocos[0]){
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
                titulo.innerHTML =  salas[i].bloco + salas[i].andar + salas[i].numero_sala;
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

let indiceBlocos = BLOCOS_POR_PAGINA;
async function trocaPagination(id) {
    const pagination = document.querySelector(".pagination");
    const itemInicial = document.querySelector("#itemInicial");
    const itemFinal = document.querySelector("#itemFinal");
    const ant = document.querySelector("#PaginaAnt");
    const prox = document.querySelector("#PaginaProx");
    let qntd = 0;
    if (id === "PaginaProx") {
      if (indiceBlocos + BLOCOS_POR_PAGINA <= lista_blocos.length) {
        for (let i = 0; i < BLOCOS_POR_PAGINA; i++, indiceBlocos++) {
            const pag = document.querySelector("#pag" + i);
            pag.innerHTML = lista_blocos[indiceBlocos];
        }
      } else {
        while (pagination.children.length > 2) {
          pagination.removeChild(pagination.children[1]);
        }
        let novoIndice = indiceBlocos;
        for (let i = 0;i < lista_blocos.length - novoIndice;i++, indiceBlocos++) {
          const li = criarItemPagina();
          const a = criarLinkPagina(i,lista_blocos[indiceBlocos]);
          a.addEventListener("click", function(){
            mostrarSalas(a.innerHTML)});
          li.appendChild(a);
          pagination.insertBefore(li, itemFinal);
        }
        const prox = document.querySelector("#" + id);
        prox.classList.add("disabled");
      }
      
      ant.classList.remove("disabled");
    } else if (id === "PaginaAnt") {
        
        while (pagination.children.length > 2) {
          pagination.removeChild(pagination.children[1]);
          qntd++;
        }
        let novoIndice = indiceBlocos - qntd;
        indiceBlocos = novoIndice;
        for (let i = 0;i < BLOCOS_POR_PAGINA;i++, novoIndice--) {
            const li = criarItemPagina();
            const a = criarLinkPagina(novoIndice - 1,lista_blocos[novoIndice - 1]);
            a.addEventListener("click", function(){
                mostrarSalas(a.innerHTML)});    
            li.appendChild(a);
            pagination.insertBefore(li, itemInicial.nextSibling);
            }
        if (indiceBlocos === BLOCOS_POR_PAGINA) {
            const ant = document.querySelector("#" + id);
            ant.classList.add("disabled");
        }
        prox.classList.remove("disabled");
        
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

    

    axios.post("https://mauasalas.lcstuber.net/admin/manterSalas/lista",{
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
        descricao: descricao})
}

function editarSala(){
    let bloco = document.querySelector("#bloco_editar").value;
    let numero = document.querySelector("#numero_editar").value;
    let andar = document.querySelector("#andar_editar").value;
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
    try{
        axios.put("https://mauasalas.lcstuber.net/admin/manterSalas/lista",{
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
            descricao: descricao,
            bloco_editar: bloco_editar,
            andar_editar: andar_editar,
            numero_editar: numero_editar})
    }
    catch(err){
       console.log("Batata")
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
    console.log(bloco_editar,numero_editar,andar_editar)
    axios.delete("https://mauasalas.lcstuber.net/admin/manterSalas/lista",{
        data: {
            bloco: bloco_editar,
            numero_sala: numero_editar,
            andar: andar_editar
        }
    })
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



