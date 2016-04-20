/**
 * Created by админ on 19.12.15.
 */
/*объект (псевдокласс) Field (поле)*/
function Field (){
    this.numbBombs =  $(':input[name = "bombNumb"]').val(); //количество бомб
    this.height = $(':input[name = "fieldHeight"]').val(); // Линии
    this.width = $(':input[name = "fieldWidth"]').val();  // Ячейки
    this.isField = false; // Свойство хранит состояния поля (true - уже есть поле, false - поле еще не созданно)
    this.selBomb = 0;       //выбрано бомб
    this.trueSelBomb = 0;   //удачно выбрано бомб
    this.delField = function(){$('#mainField').empty();} // удаляет созданное поле
    /*генерация поля*/
    this.genField = function(){
        if(!this.height||!this.width||this.height<=0||this.width<=0){ //проверка данных на коректность
            $('div#mainField').html('Произошла ошибка! Введены не коректные данные');
            return false;
        }
        if(!this.isField){   //если поле уже существует удаляем его
            this.delField();
        }
        /*цикл генерации поля*/
        for(var x = this.height; x>0; x--){
            $('div#mainField').append('<div class="line" ></div>');
        }
        for(var y = this.width; y>0; y--){
            $('div#mainField > .line').append('<div class="cell" ></div>');
        }
        this.isField = true; // отметим что поле уже существует.
    };//(генерация поля)
    /*инициализация ячеек поля*/
    this.initCell = function (){
        for(var x=1; x <= (this.height); x++ ){
            for(var y=1; y <= (this.width); y++){
                $(gnSel(x,y))[0].cell = new Cell(x,y);
            }
        }
    };//инициализация ячеек поля
    /*генерация бомб на поле*/
    this.genBombs = function (){
        if (!this.numbBombs || this.numbBombs <= 0 || this.numbBombs >= (this.height * this.width) ){  // кол-во бомб не задано или меньше нуля или больше чем ячеек всего.
            $('#log').append('количество бомб больше чем ячеек всего или равно');
            return false;
        }
        for(var i=0; i < this.numbBombs; i++ ){
            var y = (Math.round(Math.random() * (this.width  - 1))) + 1;
            var x = (Math.round(Math.random() * (this.height - 1))) + 1;
            if(!$(gnSel(x,y))[0].cell.bomb) {       // если бомбы на этой клетке нет, минируем и идем дальше
                $(gnSel(x,y))[0].cell.bomb = true;//ставим бомбу

               // $(gnSel(x,y)).css({'background':'green'}); //выделяет поля с бомбами зеленым цветом

            }else{                            // если на этой клетке есть бомба, добовляем еще одну итерацию цикла и идем дальше
                i--;
                continue;
            }
        }
    };//(генерация бомб на поле)

    /* "считает сколько бомб вокруг ячйки"*/
        this.countBombs = function(element){
        var x = element[0].cell.coordinate.x;
        var y = element[0].cell.coordinate.y;
        element[0].cell.bombNumbAround = 0;     /*помечаем что для эелемента вызван подсчет*/

        // цикл считает сколько бомб вокруг элемента
        for(var tx = (x-1); tx<(x+2); tx++){                /*сдвиг по х относительно выбранного елемента*/
            if (tx < 1 || tx > this.height) continue;       /*проверка выхода за поле*/
            for(var ty = (y-1); ty<(y+2); ty++){            /*сдвиг по у относительно выбранного елемента*/
                if(ty < 1 || ty > this.width) continue;     /*проверка выхода за поле*/
                if($(gnSel(tx,ty))[0].cell.bomb){           /*если есть бомба */
                    element[0].cell.bombNumbAround++;       /*то увиличиваем на единицуц*/
                }
            }
        }
        if(!element[0].cell.bombNumbAround){ // если бомб вокруг елемента не обнаруженно
            //проверяем елементы вокруг выбранного елемента.
            for(var t2x = (x-1); t2x<(x+2); t2x++){                                       /*сдвиг по х относительно выбранного елемента*/
                if (t2x < 1 || t2x > this.height ) continue;                              /*проверка выхода за поле*/
                for(var t2y = (y-1); t2y<(y+2); t2y++){                                   /*сдвиг по у относительно выбранного елемента*/
                    if(t2y < 1 || t2y > this.width || (t2x == x && t2y == y)  ) continue; /*проверка выхода за поле и не проверять выбранный эелемент*/
                    if($(gnSel(t2x,t2y))[0].cell.bombNumbAround == null){                 /*если для елемента еще не вызываля подсчет, то вызываем*/
                        this.countBombs($(gnSel(t2x,t2y)));
                    }
                }
            }
        }
        if(element[0].cell.bombNumbAround) {
            element.html(element[0].cell.bombNumbAround); // пишет кол-во бомб в ячейке
            switch (element[0].cell.bombNumbAround){
                case 1:element.addClass('c1');break;
                case 2:element.addClass('c2');break;
                case 3:element.addClass('c3');break;
                case 4:element.addClass('c4');break;
                case 5:element.addClass('c5');break;
                case 6:element.addClass('c6');break;
                case 7:element.addClass('c7');break;
                case 8:element.addClass('c8');break;
                default :break;
            }
        }else{
            element.css('background','gray'); // если нет бомб вокруг елемента, то делаем фон серым
        }

        }
}//объект (псевдокласс) Field (поле)
/*объект (псевдокласс) Cell (ячейка) */
function Cell (x,y){
    this.coordinate = {};
    this.coordinate.x = x;
    this.coordinate.y = y;
    this.bombNumbAround = null; /* null используеться для того, чтоб потом можно было проверять был ли вызван подсет для этого элемента*/
    this.bomb = false;

}//объект (псевдокласс) Cell (ячейка)

/* функция принимает x,y и возвращает селектор элемента*/
function gnSel(x, y) {
    return 'div#mainField > div:nth-child(' + x + ') > div:nth-child(' + y + ')';
}//(функция принимает x,y и возвращает селектор элемента)

/*функция запускающая игру*/
function newGame() {
    /*создание поля, инициализация всех ячеек, генерация бомб на поле*/
    var field = new Field(); //
    field.genField();
    field.initCell();
    field.genBombs();
    //создание поля
/*функция проверяет кол-во кликов по ячейке*/
    $('.cell').single_double_click(
        function(){ //одинарный клик по ячейке (савит флажек)
        if($(this)[0].cell.bombNumbAround == null) {
            if ($(this)[0].cell.bomb) {        // если поставили флажек на бомбу
                if ($(this).css('background-image') == 'none') { // проверяем был ли поставлен флажек до этого
                    field.selBomb++;
                    /* если флажек не был поставлен*/
                    field.trueSelBomb++;
                    /* увеличиваем значение перменных selBomb и trueSelBomb*/
                } else {
                    field.selBomb--;
                    /*если флажек уже был поставлен*/
                    field.trueSelBomb--;
                    /*уменьшаем значение переменных*/
                }
            } else {                          // если флажек не был поставлен на бомбу
                if ($(this).css('background-image') == 'none') { // проверяем был ли поставлен флажек до этого
                    field.selBomb++;
                    /*если флажек НЕ был поставлен до этого увеличиваем значение перменной selBomb*/
                } else {
                    field.selBomb--;
                    /*если флажек был поставлен до этого увеличиваем значение перменной selBomb*/
                }
            }
            if (field.selBomb == field.trueSelBomb && field.trueSelBomb == field.numbBombs) { //проверка победы
                field.delField(); // удаляем поле
                $('div#mainField').html('<h1>You Win</h1>'); //на месте поля выводим сообщение
            }
           if($(this).css('background-image') == 'none' ){ // если флажек не стоит -> ставим
               $(this).css({'background-image': 'url(flag.png)'});    //свойсиво прописывающее флажок
               $(this).css({'background-repeat': 'no-repeat'});    //свойсиво прописывающее флажок
               $(this).css({'background-position': 'center'});    //свойсиво прописывающее флажок
            }else {                                             // если флажек есть -> убираем
               $(this).css({'background-image': 'none'});    //свойсиво убирающее флажок
           }
        }
        },
        function (){ // двойной клик
            if ($(this)[0].cell.bomb) { // если "открыли" бомбу, игра заканчивается
                field.delField(); // удаляем поле
                $('div#mainField').html('<h1>ПОТРАЧЕНО</h1>'); //на месте поля выводим сообщение
            } else { // если попали НЕ на бомбу
                if($(this).css('background-image')!='none'){
                    field.selBomb--;
                }
                $(this).css('background-image','none'); //убрать флажек

                field.countBombs($(this)); // функция подсчета бомб вокруг ячейки
            }
        },
        300
    );//функция проверяет кол-во кликов по ячейке
    return field;
}//(функция запускающая игру)
 /*функция проверяет кол-во кликов по ячейке*/ //плагин jQuery
jQuery.fn.single_double_click = function (single_click_callback, double_click_callback, timeout) {
    return this.each(function () {
        var clicks = 0, self = this;
        jQuery(this).click(function (event) {
            clicks++;
            if (clicks == 1) {
                setTimeout(function () {
                    if (clicks == 1) {
                        single_click_callback.call(self, event);
                    } else {
                        double_click_callback.call(self, event);
                    }
                    clicks = 0;
                }, timeout || 300);
            }
        });
    });
}; //функция проверяет кол-во кликов по ячейке