d3p.stage = {
  setup: function(){
    d3p.stage.svg      = d3.select("body").append("svg").attr("class", "d3p");
    d3p.stage.position = d3p.stage.svg.append("g");
    d3p.stage.main     = d3p.stage.position.append("g").attr("class", "stage");

    // Add Background
    d3p.theme.default.background.klass(d3p.stage.main, "stage-background");

    d3p.stage.resize();
    if(!d3p.print.on) window.onresize = d3p.stage.resize;
  },
  resize: function(){
    d3p.stage.targetWidth  = d3p.print.on ? document.body.clientWidth : window.innerWidth;
    d3p.stage.targetHeight = d3p.print.on ? document.body.clientHeight : window.innerHeight;
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
