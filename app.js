$(document).ready(function() {
  
  var fillOpt = "random";
  
  $("#fill-options").change(function() {
    fillOpt = $(this).val();
    if(fillOpt == "opacity") {
      $('#grid-clear').trigger('click');
    }
  });
  
  $(".options").draggable({
    start: function(event, ui){ $(".op-fs").css("box-shadow","7px 7px 5px 0px rgba(0,0,0,0.75)");},
    stop: function(event, ui){ $(".op-fs").css("box-shadow","none");}
  });
  $(".options").offset({top: 8,right: 0});
  
  $("#grid-generator").click(function() {
    var width = getFormValue("#px-row");
    var height = getFormValue("#px-col");
    var pixelSize = getPixelSize(width, height);
    //generateGrid(width,height,pixelSize);
    generateGrid(width,height,900/width,900/height);
  });
  
  $("#grid-clear").click(function() {
    $('#grid').empty();
    $('#grid-generator').trigger('click');
  });
  
  $("#grid").on("mouseenter",".pixel",function() { 
    var colOp = getNewColor(parseFloat($(this).css("opacity")),$(this).css("background-color"));
    $(this).css("background-color",colOp[0]);
    $(this).css("opacity",colOp[1]);
  });
   
  function getPixelSize(gridWidth, gridHeight) {
    var w = 900 / gridWidth;
    var h = 900 / gridHeight;
    return w < h ? w : h;
  }
  
  function getFormValue(elementId) {
    var a = $(elementId).val();
    return isNaN(a) ? 0 : parseFloat(a);
  }
  
  function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb("+r+","+g+","+b+")";
  }
  
  function generateGrid(width, height, sizeX, sizeY) {
    var grid = $("#grid");
    
    grid.empty();
    
    if(width > 0 && height > 0){
      for(var i = 1; i <= width*height; i++) {
        var color = getInitColor();
        grid.append("<div id='"+i+"' class='pixel' style='opacity:"+color[1]+"; background-color:"+color[0]+"; width:"+sizeX+"px; height:"+sizeY+"px;'></div>");
      }
    }
  }
  
  function getInitColor() {
    switch(fillOpt) {
      case "random":
        return ["rgb(255,255,255)",1];
        break;
      case "opacity":
        return ["rgb(0,0,0)",0];
        break;
      case "manual":
        return ["rgb(0,0,0)",0];
      default:
        return ["rgb(255,255,255)",1];
        break;
    }
  }
  
  function getNewColor(currOpacity,currColor) {
    switch(fillOpt) {
      case "random":
        return [getRandomColor(),1];
        break;
      case "opacity":
        return [currColor,currOpacity + 0.1];
        break;
      case "manual":
        var r = getFormValue('.r');
        var g = getFormValue('.g');
        var b = getFormValue('.b');
        var a = getFormValue('.a');
        console.log("a: " + a);
        return ["rgb("+r+","+g+","+b+")",a];
        break;
      default:
        return getRandomColor();
        break;
    }
  }
  
  function getRGBArray(str) {
    return str.match(/(\d+(\.\d+)?)/ig);
  }
  
});