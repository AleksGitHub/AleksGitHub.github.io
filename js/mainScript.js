/**
 * Created by админ on 13.01.16.
 */
jQuery(document).ready(function(){

    jQuery(window).scroll(function(){
        var scr = jQuery(window).scrollTop();
        console.log(scr)
        if (scr > 400 && scr < 800 ){
            jQuery(".block2").animate({left:'0'},1000)
        }else{
            jQuery(".block2").stop(true).animate({'left':'-900px'},500);
        }
        if (scr > 800){
            jQuery(".block3").animate({left:'0'},1000)
        }else{
            jQuery(".block3").stop(true).animate({'left':'-900px'},500);
                    }
    });

});