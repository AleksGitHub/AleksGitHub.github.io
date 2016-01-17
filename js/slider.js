/**
 * Created by админ on 17.01.16.
 */
jQuery(document).ready(function(){
    sliderGo();
    function sliderGo(){
        var i = 1;
        var intervalId = setTimeout(function slider () {
            $li(i).css("left", "-900px");
            $li(i).css("display", "inline-block");
            $li(i).animate({left: "0px"}, 1000);
            $li(i).animate({left: "0px"}, 1000);
            $li(i).animate({left: "900px"},{
                duration: 1000,
                complete: function(){jQuery(this).css("display", "none")}
            });
            if(++i > 7) i=1;
            var intervalId = setTimeout(slider (),2900);
        }, 2900);
    }
    function $li(numb) {
        if (numb) {
        return jQuery(' #slider > ul > li:nth-child(' + numb + ' ) ');
        }
        return jQuery(' #slider > ul > li ');
    }
});
