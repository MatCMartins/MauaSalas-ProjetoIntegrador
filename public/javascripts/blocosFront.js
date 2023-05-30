var map = L.map('map',{zoomControl:false}).setView([(-23.6515300 +-23.6449700)/2 , (-46.57975+-46.56745)/2], 17,);

map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
map.boxZoom.disable();
map.keyboard.disable();
map.dragging.disable();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var data;
var lista_blocos = [];

var markers = {};

async function getBlocos(rows){
    data = rows;
    for (let i =0; i < data.length; i++){
        var bloco = data[i];
        lista_blocos.push(bloco.bloco);
    }
    for (let i =0; i < data.length; i++){
        var bloco = data[i];
        markers[bloco.id] = L.circle([bloco.latitude, bloco.longitude],{color: bloco.cor}).addTo(map);
        markers[bloco.id].bindPopup("Bloco " + bloco.bloco);
        markers[bloco.id].on('mouseover', function (e) {
            this.openPopup();
        });
        markers[bloco.id].on('mouseout', function (e) {
            this.closePopup();
        });
        markers[bloco.id].on('click', function(e){
            abrirModalDeletarBloco(lista_blocos[i]);
        });
    }
};

var latitude;
var longitude;
var cor;

function abrirModalCadastrarBloco(e){
    var modal = new bootstrap.Modal(document.getElementById('modalCadastrarBlocos'), {});
    latitude = e.latlng.lat;
    longitude = e.latlng.lng;
    modal.show();
}

map.on('click', abrirModalCadastrarBloco);

function cadastrarBloco(){
    var bloco = document.getElementById('blocoEntrada').value;
    const cores = ["red", "blue", "green", "yellow", "orange", "purple", "black", "brown", "pink"];
    cor = cores[Math.floor(Math.random() * cores.length)];
    axios.post("https://mauasalas.lcstuber.net/admin/manterBlocos/lista", {
        bloco: bloco,
        cor: cor,
        latitude: latitude,
        longitude: longitude
    }).then((data) => {
        showToast("Bloco cadastrado com sucesso");
    });
}

function abrirModalDeletarBloco(bloco){
    var modal = new bootstrap.Modal(document.getElementById('modalDeletarBlocos'), {});
    document.getElementById('blocoDeletar').innerHTML = bloco;
    modal.show();
}

function deletarBloco(){
    var bloco = document.getElementById('blocoDeletar').innerHTML;
    (axios.delete("https://mauasalas.lcstuber.net/admin/manterBlocos/lista", {data: {
        bloco: bloco
    }}).then(() => {
        showToast("Bloco deletado com sucesso");
    }));
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

