/**
 * Created by админ on 23.12.15.
 */
function main(){
    $(".main").css('display','block');
    go();
}
function genNumb(lenght){
    var x = Math.round(Math.random()* Math.pow(10, lenght));
    if(x){
        return x;
    }
    return ++x;
}
function go(){
    var $fNumb = $(".firstNumb");
    var $sNumb = $(".secondNumb");
    var $sign = $(".sign");
    var $answer = $('#answer');
    var $digitVal = $('#digit').val();
    var trueAnswer;
    $fNumb.html(genNumb($digitVal));
    $sNumb.html(genNumb($digitVal));
    var fNumbVal = + $fNumb.html();
    var sNumbVal = + $sNumb.html();
    switch ($('select')[0].selectedIndex){
        case 0: sing = 0;
                $sign.html('+');
                trueAnswer = fNumbVal + sNumbVal;
                break;
        case 1: sing = 1;
                $sign.html('-');
                trueAnswer = fNumbVal - sNumbVal;
                break;
        case 2: sing = 2;
                $sign.html('*');
                trueAnswer = fNumbVal * sNumbVal;
                break;
        case 3: sing = 3;
                $sign.html('/');
                break;
        default : break;
    }
    var beginDate = new Date();
    $answer.focus();
    $answer[0].oninput = function(){
        var answer = $answer.val();
        if(answer==trueAnswer){
            var endDate = new Date();
            var time = (endDate - beginDate) / 1000;
            $answer.val('');
            go();
        }
    }
}