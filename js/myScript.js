/**
 * Created by Александр on 29.08.2016.
 */
var $data = $('.itemPortfolio').clone();
var $filteredDataWeb = $data.find('div[data-type="web"]');
var $filteredDataDesign = $data.find('div[data-type="design"]');
var $filteredDataAll = $data.find('div');
$('input#web').click(function(){
    $('input').removeClass('active');
    $(".itemPortfolio").quicksand($filteredDataWeb,{
        duration: 600,
        adjustHeight: 'auto'
    });
    $('input#web').addClass('active');
});
$('input#all').click(function(){

    $('input').removeClass('active');
    $(".itemPortfolio").quicksand($filteredDataAll,{
        duration: 600,
        adjustHeight: 'auto'
    });
    $('input#all').addClass('active');
});
$('input#design').click(function(){

    $('input').removeClass('active');
    $(".itemPortfolio").quicksand($filteredDataDesign,{
        duration: 600,
        adjustHeight: 'auto'
    });
    $('input#design').addClass('active');
});

$('#view').click(function () {
    $('body').animate({
        scrollTop: $('#portfolio').offset().top}, 700);
    return false;
});