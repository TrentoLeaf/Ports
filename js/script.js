$(document).ready(function(){

    /* visualizzazione titolo 'PORTS' completo */
    $(".brandtitle").hover(function(){

        $(".brandtxt").show(400);
    },
                           function(){
        $(".brandtxt").hide(1000);
    });
<<<<<<< HEAD
    /* END visualizzazione titolo 'PORTS' completo END */

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
=======
    //END visualizzazione titolo 'PORTS' completo


    //cambio icone navbar (hover)

      $(".navelenco").hover(function() {
        $(".navelenco").find("div").css("color","white");
        var dir=$(".navelenco").find("img").attr("src");
          console.log(dir);
        var newdir = dir.replace("default", "mono_white");
        console.log(newdir);
        $(".navelenco").find("img").attr("src",newdir);
    },
                         function() {
           $(".navelenco").find("div").css("color","black");
         var dir=$(".navelenco").find("img").attr("src");
          console.log(dir);
        var newdir = dir.replace("mono_white", "default");
        console.log(newdir);
        $(".navelenco").find("img").attr("src",newdir);
    });

    $(".navmappa").hover(function() {
        $(".navmappa").find("div").css("color","white");
        var dir=$(".navmappa").find("img").attr("src");
          console.log(dir);
        var newdir = dir.replace("default", "mono_white");
        console.log(newdir);
        $(".navmappa").find("img").attr("src",newdir);
    },
                         function() {
           $(".navmappa").find("div").css("color","black");
         var dir=$(".navmappa").find("img").attr("src");
          console.log(dir);
        var newdir = dir.replace("mono_white", "default");
        console.log(newdir);
        $(".navmappa").find("img").attr("src",newdir);
    });

     $(".navcerca").hover(function() {
        $(".navcerca").find("div").css("color","white");
        var dir=$(".navcerca").find("img").attr("src");
          console.log(dir);
        var newdir = dir.replace("default", "mono_white");
        console.log(newdir);
        $(".navcerca").find("img").attr("src",newdir);
    },
                         function() {
           $(".navcerca").find("div").css("color","black");
         var dir=$(".navcerca").find("img").attr("src");
          console.log(dir);
        var newdir = dir.replace("mono_white", "default");
        console.log(newdir);
        $(".navcerca").find("img").attr("src",newdir);
    });

    $(".navorari").hover(function() {
        $(".navorari").find("div").css("color","white");
        var dir=$(".navorari").find("img").attr("src");
          console.log(dir);
        var newdir = dir.replace("default", "mono_white");
        console.log(newdir);
        $(".navorari").find("img").attr("src",newdir);
    },
                         function() {
           $(".navorari").find("div").css("color","black");
         var dir=$(".navorari").find("img").attr("src");
          console.log(dir);
        var newdir = dir.replace("mono_white", "default");
        console.log(newdir);
        $(".navorari").find("img").attr("src",newdir);
    });

    //END cambio icone navbar (hover)
>>>>>>> origin/stefano

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
