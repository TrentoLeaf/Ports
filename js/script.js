$(document).ready(function(){

    /* Hover icone navbar */
    var changeColor = function(element, color) {
        $(element).find("div").css("color",color); //cambio colore testo
    };

    var changeIcon = function (element, from, to) { //from, to: nome della parte di directory da cambiare
        var dir=$(element).find("img").attr("src");
        var newdir = dir.replace(from, to);
        $(element).find("img").attr("src",newdir);
    };

    $(".navelenco").hover(function() {
        changeColor(".navelenco", "white"); //cambio colore testo
        changeIcon(".navelenco", "default", "mono_white");
    },
                          function() {
        changeColor(".navelenco", "black"); //cambio colore testo
        changeIcon(".navelenco", "mono_white", "default");
    });

    $(".navmappa").hover(function() {
        changeColor(".navmappa", "white"); //cambio colore testo
        changeIcon(".navmappa", "default", "mono_white");
    },
                         function() {
        changeColor(".navmappa", "black"); //cambio colore testo
        changeIcon(".navmappa", "mono_white", "default");
    });

    $(".navcerca").hover(function() {
        changeColor(".navcerca", "white"); //cambio colore testo
        changeIcon(".navcerca", "default", "mono_white");
    },
                         function() {
        changeColor(".navcerca", "black"); //cambio colore testo
        changeIcon(".navcerca", "mono_white", "default");
    });

    $(".navorari").hover(function() {
        changeColor(".navorari", "white"); //cambio colore testo
        changeIcon(".navorari", "default", "mono_white");
    },
                         function() {
        changeColor(".navorari", "black"); //cambio colore testo
        changeIcon(".navorari", "mono_white", "default");
    });
    /* END Hover icone navbar END*/
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
