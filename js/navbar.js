$(document).ready({

    $(function() {  
        var pull = $('#pull');  
        menu = $('navbar ul');  
        menuHeight  = menu.height();  

        $(pull).on('click', function(e) {  
            e.preventDefault();  
            menu.slideToggle();  
        });  
    }); 

    $(window).resize(function(){  
        var w = $(window).width();  
        if(w > 690 && menu.is(':hidden')) {menu.removeAttr('style');}  
    }); 

});