d3p.print = {
  setup: function(){
    d3p.print.on = window.location.hash === "#print";
    if(!d3p.print.on) return false;
    
    d3p.print.size();
    d3p.print.render();
    return true;
  },
  size: function(){
    d3.select("body").style("width", d3p.config.print.width).style("height", d3p.config.print.height);
  },
  render: function(){
    d3p.slides.forEach(function(slide, i){
      d3p.stage.setup();
      d3p.slide.setup();
      slide(d3p.slide.current, d3p.animations.run);
    });
  }
};
