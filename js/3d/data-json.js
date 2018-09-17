
var DATA_packaging_type = '';
var DATA_optional = '';
var DATA_material = '';
var DATA_print = '';
var DATA_qta = '';
var DATA_delivery = '';

$('#section-select-packaging select option').bind('click', function () {
    DATA_packaging_type = 'packaging:' + $(this).data('tipo') + ' - ' + $(this).data('misura');
});

$('#section-optional-packaging select option').bind('click', function () {
    DATA_optional = 'optional:' + $(this).data('optional');
});

$('#section-select-material select option').bind('click', function () {
    DATA_material = 'material:' + $(this).data('materiale');
});

$('#section-select-print select option').bind('click', function () {
    DATA_print = 'print:' + $(this).data('stampa');
});

$('#section-select-qta input').bind('change', function () {
    DATA_qta = 'quantity:' + $(this).val();
});

$('#section-select-date input').bind('change', function () {
    DATA_delivery = 'delivery:' + $(this).val();
});

$('.get-data').bind('click', function () {
    console.log(DATA_packaging_type)
    console.log(DATA_optional)
    console.log(DATA_material)
    console.log(DATA_print)
    console.log(DATA_qta)
    console.log(DATA_delivery)
});