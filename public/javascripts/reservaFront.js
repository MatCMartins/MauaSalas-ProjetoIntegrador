$(function () {
    $("#calendario-inicio").datepicker({
        dateFormat: 'dd/mm/yy',
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        minDate: new Date(2023, 0, 1),
        maxDate: new Date(2023, 11, 31),
        showOtherMonths: true,
        selectOtherMonths: true
    });
});
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
        document.querySelector('#dia').classList.add('d-none');
        var selectedNome = $(this).val();   
        if (selectedNome === "USER") {
            nome = document.querySelector("#nome").innerHTML;
            document.querySelector('#dia').classList.remove('d-none');
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
    document.querySelector('#dia').classList.add('d-none');
    $('#professor').change(function(){
        var selectedProfessor = $(this).find('option:selected').text();
        nome = selectedProfessor
        document.querySelector('#dia').classList.remove('d-none');
})});
$(document).ready(function(){
    document.querySelector('#dia').classList.add('d-none');
    $('#curso').change(function(){
        var selectedCurso = $(this).find('option:selected').text();
        nome = selectedCurso
        document.querySelector('#dia').classList.remove('d-none');
})});
$(document).ready(function(){
    document.querySelector('#dia').classList.add('d-none');
    $('#sala').change(function(){
        var selectedSala = $(this).find('option:selected').text();
        nome = selectedSala
        document.querySelector('#dia').classList.remove('d-none');
})});
$(document).ready(function(){
    document.querySelector('#dia').classList.add('d-none');
    $('#materia').change(function(){
        var selectedMateria = $(this).find('option:selected').text();
        nome = selectedMateria
        document.querySelector('#dia').classList.remove('d-none');
})});
$(document).ready(function(){
    document.querySelector('#dia').classList.add('d-none');
    $('#gtl').change(function(){
        var selectedGtl = $(this).find('option:selected').text();
        nome = selectedGtl
        document.querySelector('#dia').classList.remove('d-none');
})});

$(document).ready(function(){
    document.querySelector('.calendario').classList.add('d-none');
    $('#dia').change(function(){
        var selectedDia = document.querySelector('#calendario-inicio').value 
        document.querySelector('.calendario').classList.remove('d-none');
        exibirCalendario(nome);
})});

function exibirCalendario(nome){
    nome = "LEONARDO CAZOTTO STUBER"
    axios.post('https://mauasalas.lcstuber.net/reservas/calendario/lista', {
                nome: nome
            }, { timeout: 5000 })
    .then(function (data) {
        var reservas = data.data;
        var calendario = document.querySelector('.calendario');
        for (let i = 1; i < reservas.length + 1; i++){
            var card = document.createElement('div');
            card.classList.add('card');

            var cardHeader = document.createElement('div');
            cardHeader.classList.add('card-header');

            var cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            var cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.innerHTML = nome;

            var cardTextHoraInicio = document.createElement('p');
            cardTextHoraInicio.classList.add('card-text');
            cardTextHoraInicio.innerHTML = reservas[i-1].start;

            var cardTextHoraFim = document.createElement('p');
            cardTextHoraFim.classList.add('card-text');
            cardTextHoraFim.innerHTML = reservas[i-1].end;

            cardHeader.appendChild(cardTitle);
            cardBody.appendChild(cardTextHoraInicio);
            cardBody.appendChild(cardTextHoraFim);
            card.appendChild(cardHeader);
            card.appendChild(cardBody);
        }
        calendario.appendChild(card);

    })
}