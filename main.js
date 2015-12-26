/**
 * Created by админ on 23.12.15.
 */
window.sign; // выбор действия 0= сложение, 1= вычитание, 2= умножение, 3= деление
window.log = '#log'; // для отладки
function go() {
    $(".main").css('display','block');
    $(".firstNumb").html(genNumb($('#digit').val()));
    $(".secondNumb").html(genNumb($('#digit').val()));
        switch ($('select')[0].selectedIndex){
            case 0: $('.sign').html('+'); break;
            case 1: $('.sign').html('-'); break;
            case 2: $('.sign').html('*'); break;
            case 3: $('.sign').html('/'); break;
            default :break;
        }
    var dateBegin = new Date();
    $('#answer').focus();
    $('#answer')[0].oninput = function(){
        check(dateBegin)
    };
}
function check(dateBegin){
    var trueAnswer = (+$('.firstNumb').html()) + (+$('.secondNumb').html());
    var answer = $('#answer').val();
    if(answer == trueAnswer){
        var dateEnd = new Date();
            $(log).append(' Your time = ');
        if((dateEnd - dateBegin)/1000 < 1){
            $(log).append('<span class="green">' + ((dateEnd - dateBegin)/1000) + '</span> <br>');
        }else if((dateEnd - dateBegin)/1000 > 2){
            $(log).append('<span class="red">' + ((dateEnd - dateBegin)/1000) + '</span> <br>');
        }else{
            $(log).append('<span >' + ((dateEnd - dateBegin)/1000) + '</span> <br>');
        }
        $('#answer').val('');
        go();
    }
}
function genNumb(lenght){return Math.round(Math.random()* Math.pow(10, lenght) + 1) - 1}
//<span id="result">' + ((dateEnd - dateBegin)/1000) + '</span></p>');
/*
* if( $('#answer').val() == (+$('.firstNumb').html()) + (+$('.secondNumb').html()))
*
*
* */