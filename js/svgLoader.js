$(document).ready(function(){
    //i files SVG vengono caricati nei relativi div contenuti in map.html
    $("#divSvgPovo1PT").svg({onLoad: function() {
        var svg = $("#divSvgPovo1PT").svg('get');
        svg.load('../img/mappe/Povo1PT.svg', {addTo: true,  changeSize: false});
    },settings: {}
                      });

        $("#divSvgPovo1P1").svg({onLoad: function() {
        var svg = $("#divSvgPovo1P1").svg('get');
        svg.load('../img/mappe/Povo1P1.svg', {addTo: true,  changeSize: false});
    },settings: {}
                      });

        $("#divSvgPovo2PT").svg({onLoad: function() {
        var svg = $("#divSvgPovo2PT").svg('get');
        svg.load('../img/mappe/Povo2PT.svg', {addTo: true,  changeSize: false});
    },settings: {}
                      });

        $("#divSvgPovo2P1").svg({onLoad: function() {
        var svg = $("#divSvgPovo2P1").svg('get');
        svg.load('../img/mappe/Povo2P1.svg', {addTo: true,  changeSize: false});
    },settings: {}
                      });

});
