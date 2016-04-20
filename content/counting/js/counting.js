jQuery(document).ready(function ($){
    $('button#start').click(function() {
        var entAnswer = 'input[name="enterAnswer"]';
        $(entAnswer).css('display','block');

        createNewExample();
        function createNewExample()
        {
            var example = new Example(),
                startTime = new Date(),
                endTime,
                resultTime;

            $('span#firstNumb').html(example.firstNumb);
            $('span#sign').html(example.sign);
            $('span#secondNumb').html(example.secondNumb);
            console.log(example.example);
            $(entAnswer).focus();
            $(entAnswer)[0].oninput = function () {
                if ($(entAnswer).val() == example.answer) {
                    $(entAnswer).val('');
                    endTime = new Date();
                    resultTime = endTime - startTime;

                    appendAnswer(example.example, resultTime);
                    createNewExample();
                }
            };
        }
    })
});
function appendAnswer(example, time){
    $('#tableAnswer').append(' <tr> <td>' + example +  '</td> <td>' + (time/1000) + '</td> </tr> ');
    console.log($('#tableAnswer > tr').length)
    if ($('#tableAnswer > tr').length > 10){

        var lastChild = $('#tableAnswer > tr').length  - 10  ,
            $thatLast = $('#tableAnswer  tr:nth-child(' +  lastChild + ')'); /*текущий последний элемент*/
        $thatLast.css('display', 'none');
    }

}
function Example(){
    this._genNumb = function() {
        var answer,
            digit = $('input#digit').val() ;
        answer = Math.floor(Math.random()*(Math.pow(10,digit) -Math.pow(10,(digit-1)) ))+Math.pow(10,(digit-1));
        return answer;
    };
    this._setSign = function () {
        var signNumb = $('select#selectSign')[0].selectedIndex,
            sign = '';
        switch (signNumb){
            case 0: sign = '+'; break;
            case 1: sign = '-'; break;
            case 2: sign = '*'; break;
            case 3: sign = '/'; break;
        }
        return sign;
    };
    this._setAnswer = function () {
          if($('input#negativeAnswer').prop('checked')){
              if(this.firstNumb < this.secondNumb){
                  var tmp = this.firstNumb;
                  this.firstNumb = this.secondNumb;
                  this.secondNumb = tmp;
              }
          }
        var answer;
        if (this.sign == '+'){
            answer = this.firstNumb + this.secondNumb;
        }else if(this.sign == '-'){
            answer = this.firstNumb - this.secondNumb;
        }else if(this.sign == '*'){
            answer = this.firstNumb * this.secondNumb;
        }else if(this.sign == "/"){
            answer = (this.firstNumb / this.secondNumb).toFixed(1);
        }
    return answer;
    };
    this.sign = this._setSign();
    this.firstNumb = this._genNumb();
    this.secondNumb = this._genNumb();
    this.answer = this._setAnswer();
    this.example = this.firstNumb + ' ' + this.sign + ' ' + this.secondNumb + ' = ' + this.answer;
}