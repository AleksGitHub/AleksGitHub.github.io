/**
 * Created by админ on 23.12.15.
 */
var  mean;
var answerCount;
function genNumb(lenght){
    var x = Math.round(Math.random()* Math.pow(10, lenght));
    if(x){
        return x;
    }
    return ++x;
}
function startGame(){
    $('.time').html('Время в секундах <br>');
    $('.exercise').html('Пример<br>');
    $('.mean').html(' ');
    $(".main").css('display','block');
    mean = 0;
    answerCount = 0;
    go();
}
function go(){
    var invert = $(' select#invert ')[0].selectedIndex;
    var $fNumb = $(".firstNumb");
    var $sNumb = $(".secondNumb");
    var $sign = $(".sign");
    var $answer = $('#answer');
    var digitVal = $('#digit').val();
    var $mean = $(".mean");
    var trueAnswer;
    var $time = $(".time");
    var $exercise = $(".exercise");
    $fNumb.html(genNumb(digitVal));
    $sNumb.html(genNumb(digitVal));
    var fNumbVal = + $fNumb.html(); // convert String to Number
    var sNumbVal = + $sNumb.html(); // convert String to Number
    switch ($('select')[0].selectedIndex){
        case 0: sing = 0;
            $sign.html('+');
            trueAnswer = fNumbVal + sNumbVal;
            break;
        case 1: sing = 1;
            $sign.html('-');
            trueAnswer =  fNumbVal - sNumbVal;
            if (invert) {
                if (!(fNumbVal > sNumbVal)) {
                    var temp;
                    temp = fNumbVal;
                    fNumbVal = sNumbVal;
                    sNumbVal = temp;
                    $fNumb.html(fNumbVal);
                    $sNumb.html(sNumbVal);
                    trueAnswer = fNumbVal - sNumbVal;
                }
            }
            break;
        case 2: sing = 2;
            $sign.html('*');
            trueAnswer = fNumbVal * sNumbVal;
            break;
        case 3: sing = 3;
            $sign.html('/');
            if (fNumbVal > sNumbVal) {
                trueAnswer =  Math.floor(fNumbVal / sNumbVal);
            } else {
                var temp;
                temp = fNumbVal;
                fNumbVal = sNumbVal;
                sNumbVal = temp;
                $fNumb.html(fNumbVal);
                $sNumb.html(sNumbVal);
                trueAnswer = Math.floor( fNumbVal / sNumbVal);
            }
            break;
        default : break;
    }
    var beginDate = new Date();
    $answer.focus();
    $answer[0].oninput = function(){
        var answer = $answer.val();
        if(answer==trueAnswer){
            ++answerCount;
            if(answerCount > 15){
                $('.time>span:first ,.time>br:first, .exercise>span:first,.exercise>br:first').remove();
            }
            var endDate = new Date();
            var exercise = '<span>'+
                fNumbVal + $sign.html() + sNumbVal +
                '=' + answer+
                '</span> <br>' ;
            $exercise.append(exercise);
            var time = (endDate - beginDate) / 1000;
            /*Переписать этот кусок говна*/
            var timeStrG = '<span class="green">' + time + '</span> <br>';
            var timeStrB = '<span >' + time + '</span> <br>';
            var timeStrR = '<span class="red">' + time + '</span> <br>';
            var timeVer = time / digitVal;
            switch (Math.floor(timeVer)){
                case 0: $time.append(timeStrG);;break;
                case 1: $time.append(timeStrB);break;
                default : $time.append(timeStrR);break;
            }
            /*вот до сюда*/
            if (answerCount -1 == 0){
                mean = time;
            }else{
                mean = ((mean * (answerCount -1)) + time)/(answerCount);
            }
            $mean.html((mean.toFixed(4)));
            $answer.val('');
            go();
        }
    }
}