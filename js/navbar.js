$(document).ready(function(){
    
    var img = "<img src=\"/img/navbar_icons/minimizedNavbar.png\">";
    var imgReversed = "<img src=\"/img/navbar_icons/reverseMinNav.png\">";
    
    var reverse = true;

    $(".hamburger").click(function(){
        $(".hamburger").empty();
        if(reverse){
            $(".hamburger").append(imgReversed);
            reverse = false;
            $(".mobileMenu ul").toggleClass("show");
        }else{
            $(".hamburger").append(img);
            reverse = true;
        };
    });
    
    
});