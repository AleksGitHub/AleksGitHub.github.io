/**
 * Created by админ on 20.01.16.
 */
jQuery(document).ready(function($){
    $(window).scroll(function(){
        var s = $(window).scrollTop();
      //  console.log(s);

        if (s==0){
            $('.toTop').css('display', 'none');
            $('')
        }else{
            $('.toTop').css('display', 'block');
        }
    });
    $('.goto').click(function(){
        var c =  $("#work").offset().top - 65;

        $('html, body').animate({
                scrollTop:c
            }, 2000);
    });
    $('.toTop').click(function(){
        $('html, body').animate({
            scrollTop:0
        }, 2000);
    });


});