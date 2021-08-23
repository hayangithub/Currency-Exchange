$(document).ready(function () {
    $('.js-example-basic-single').select2();
    $('#first_select_list').empty();
    $('#second_select_list').empty();
    $('#first_select_list').append('<option value=""> --Select Currency 1--</option>');
    $('#second_select_list').append('<option value=""> --Select Currency 2--</option>');

    $.getJSON('currencies.json', function (msg) {
        for (var key in msg.results) {
            //console.log(msg.results[key]);
            $('#first_select_list').append('<option value=' + msg.results[key].id + '>' + msg.results[key].currencyName + '(' + msg.results[key].id + ')' + '</option>');
            $('#second_select_list').append('<option value=' + msg.results[key].id + '>' + msg.results[key].currencyName + '(' + msg.results[key].id + ')' + '</option>');
        }
    });
});

$("#first_select_list").change(function () {
    var selectedCurrency = $(this).children("option:selected").val();
    //alert("You have selected the country - " + selectedCurrency);
    exchangeCurrency();
});


$("#second_select_list").change(function () {
    var selectedCurrency = $(this).children("option:selected").val();
    //alert("You have selected the country - " + selectedCurrency);
    exchangeCurrency();
});


$(".amount").on("input", function () {
    exchangeCurrency();
});


function exchangeCurrency() {
    var first_currency = $('#first_select_list').children("option:selected").val();
    var second_currency = $('#second_select_list').children("option:selected").val();
    var amount = $('.amount').val();
    if (!isEmpty(first_currency) && !isEmpty(second_currency)) {

        if (first_currency == second_currency) {
            alert("first currency should be different from second currency");
            return;
        }

        if (isEmpty(amount)) {
            alert("Please Insert the Amount");
            return;
        }
        var url = 'https://free.currconv.com/api/v7/convert?q=' + first_currency + '_' + second_currency + '&compact=ultra&apiKey=6db09803905f9fc4bdb4'
        $.ajax({
            url: url,
            type: 'GET',
            data: {},
            beforeSend: function () {
                $(".loading").removeClass('hidden');
                $(".loading").addClass('show');
            },
            success: function (data) {
                console.log(data);
                // var obj = $.parseJSON(data);
                var value = data[first_currency + '_' + second_currency];
                $('.results').text(amount * value);
            },
            error: function (xhr, error, thrown) { // if error occured
                console.log(xhr);
                console.log(error);
                alert("Error occured.please try again");
            },
            complete: function () {
                $(".loading").removeClass('show');
                $(".loading").addClass('hidden');
            }
        });
    }
}

function isEmpty(property) {
    return (property === null || property === "" || typeof property === "undefined");
}