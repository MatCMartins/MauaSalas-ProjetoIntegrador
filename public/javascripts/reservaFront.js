var nome = "";
var dia = "";  
$(document).ready(function () {
    $('#modalidade').change(function() {
        document.querySelector('.calendario').classList.add('d-none');
        document.querySelector('#modalidade-professor').classList.add('d-none');    
        document.querySelector('#modalidade-curso').classList.add('d-none');
        document.querySelector('#modalidade-sala').classList.add('d-none');
        document.querySelector('#modalidade-materia').classList.add('d-none');
        document.querySelector('#modalidade-gtl').classList.add('d-none');
        document.querySelector('.calendario').classList.add('d-none');
        var selectedNome = $(this).val();   
        if (selectedNome === "USER") {
            nome = document.querySelector("#nome").innerHTML;
            document.querySelector('.calendario').classList.remove('d-none');
            exibirCalendario(nome)
        } else if (selectedNome === "PROF") {
            document.querySelector('#modalidade-professor').classList.remove('d-none');
        } else if (selectedNome === "CURSO") {
            document.querySelector('#modalidade-curso').classList.remove('d-none');
        } else if (selectedNome === "SALA") {
            document.querySelector('#modalidade-sala').classList.remove('d-none')
        } else if (selectedNome === "MATERIA") {
            document.querySelector('#modalidade-materia').classList.remove('d-none');

        } else if (selectedNome === "GTL") {
            document.querySelector('#modalidade-gtl').classList.remove('d-none');
        }
    })
});
$(document).ready(function(){
    document.querySelector('.calendario').classList.add('d-none');
    $('#professor').change(function(){
        var selectedProfessor = $(this).find('option:selected').text();
        nome = selectedProfessor
        document.querySelector('.calendario').classList.remove('d-none');
        exibirCalendario(nome)
})});
$(document).ready(function(){
    document.querySelector('.calendario').classList.add('d-none');
    $('#curso').change(function(){
        var selectedCurso = $(this).find('option:selected').text();
        nome = selectedCurso
        document.querySelector('.calendario').classList.remove('d-none');
        exibirCalendario(nome)
})});
$(document).ready(function(){
    document.querySelector('.calendario').classList.add('d-none');
    $('#sala').change(function(){
        var selectedSala = $(this).find('option:selected').text();
        nome = selectedSala
        document.querySelector('.calendario').classList.remove('d-none');
        exibirCalendario(nome)

})});
$(document).ready(function(){
    document.querySelector('.calendario').classList.add('d-none');
    $('#materia').change(function(){
        var selectedMateria = $(this).find('option:selected').text();
        nome = selectedMateria
        document.querySelector('.calendario').classList.remove('d-none');
        exibirCalendario(nome)

})});
$(document).ready(function(){
    document.querySelector('.calendario').classList.add('d-none');
    $('#gtl').change(function(){
        var selectedGtl = $(this).find('option:selected').text();
        nome = selectedGtl
        document.querySelector('.calendario').classList.remove('d-none');
        exibirCalendario(nome)

})});

function exibirCalendario(nome){
    axios.post('https://mauasalas.lcstuber.net/reservas/calendario/lista', {
                nome: nome,
                consulta: true
            }, { timeout: 5000 })
    .then(function (data) {
        var reservas = data.data;
        var calendario = document.querySelector('.calendario');

            if (calendario.firstChild){

                calendario.removeChild(calendario.firstChild)
            }


            var card = document.createElement('div');
            card.classList.add('card');

            var cardHeader = document.createElement('div');
            cardHeader.classList.add('card-header');

            var cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            var cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.innerHTML = nome;

            var cardLocation = document.createElement("p")
            cardLocation.classList.add("card-text")
            var cardDia = document.createElement("p")
            cardDia.classList.add("card-text")
            var cardTextHoraInicio = document.createElement('p');
            cardTextHoraInicio.classList.add('card-text');
            var cardTextHoraFim = document.createElement('p');
            cardTextHoraFim.classList.add('card-text');
            if(reservas[0] != undefined){
                var horaIni = parseInt(reservas[0].start.slice(11,13)) - 3
                var horaFim = parseInt(reservas[0].end.slice(11,13)) - 3
                cardLocation.innerHTML = "Sala: " + reservas[0].location.title
                cardTextHoraInicio.innerHTML = "Inicio: " + horaIni  + reservas[0].start.slice(13,16);
                cardTextHoraFim.innerHTML = "Fim: "  + horaFim  + reservas[0].end.slice(13,16);
                cardDia.innerHTML = "Dia: " + reservas[0].start.slice(0,10)

            }
            else{
                cardTextHoraInicio.innerHTML = "Essa entidade não possui reservas"
            }


            cardHeader.appendChild(cardTitle);
            cardBody.appendChild(cardLocation)
            cardBody.appendChild(cardTextHoraInicio);
            cardBody.appendChild(cardTextHoraFim);
            cardBody.appendChild(cardDia)
            card.appendChild(cardHeader);
            card.appendChild(cardBody);
            calendario.appendChild(card);
        }

    )
}