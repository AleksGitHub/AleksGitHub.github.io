jQuery(document).ready(function(){
    var i = 1;
    sliderGo();
    function sliderGo(){
        if(i = 7) i=1;
            $li(i).css("left", "-900px");
            $li(i).css("display", "inline-block");
            $li(i).animate({left: "0px"}, 1000);
            $li(i).animate({left: "0px"}, 1000);
            $li(i).animate({left: "900px"},{
                duration: 1000,
                complete: function(){
                    jQuery(this).css("display", "none");
                    ++i;
                    sliderGo()
                }
            });
    }
    function $li(numb) {
        if (numb) {
        return jQuery(' #slider > ul > li:nth-child(' + numb + ' ) ');
        }
        return jQuery(' #slider > ul > li ');
    }
});