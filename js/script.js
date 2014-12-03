$(document).ready(function(){

    // visualizzazione titolo 'PORTS' completo
    var mq= window.matchMedia("(min-width: 945px)");

    mq.addListener(function(changed) {
        if(changed.matches) {
            $(".brandtitle").hover(function(){

                $(".brandtxt").show(500);
            },
                                   function(){
                $(".brandtxt").hide(2000);
            });
        } else {
            $(".brandtitle").hover(function(){
            });
        }
    });
    //END visualizzazione titolo 'PORTS' completo
});


/*Smooth scroll function*/
$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});
