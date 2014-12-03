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
