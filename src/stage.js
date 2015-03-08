d3p.stage = {
  setup: function(){
    d3p.stage.svg      = d3.select("body").append("svg").attr("class", "d3p");
    d3p.stage.position = d3p.stage.svg.append("g");
    d3p.stage.main     = d3p.stage.position.append("g");

    d3p.stage.resize();
    window.onresize = d3p.stage.resize;
  },
  resize: function(){
    d3p.stage.targetWidth  = window.innerWidth;
    d3p.stage.targetHeight = window.innerHeight;
    d3p.stage.targetHeight-=4;
    d3p.stage.scaleWidth   = d3p.stage.targetWidth/d3p.width;
    d3p.stage.scaleHeight  = d3p.stage.targetHeight/d3p.height;
    d3p.stage.scale        = d3p.stage.scaleWidth < d3p.stage.scaleHeight ? d3p.stage.scaleWidth : d3p.stage.scaleHeight;

    d3p.stage.svg.attr("width", d3p.stage.targetWidth).attr("height", d3p.stage.targetHeight);
    d3p.stage.position.attr("transform", "translate(" + d3p.stage.targetWidth/2 + ", " + d3p.stage.targetHeight/2 + ")");
    d3p.stage.main.attr("transform", "scale(" + d3p.stage.scale + ")");
  },
  clear: function(){
    for(var name in d3p.slide.current.objects){
      d3p.slide.current.objects[name].remove();
    }
  },
  x: function(relative){ return relative * (d3p.width/2); },
  y: function(relative){ return relative * (d3p.height/2); }
};
