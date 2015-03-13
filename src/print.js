d3p.print = {
  setup: function(){
    d3p.print.on = window.location.hash === "#print";
    if(!d3p.print.on) return false;
    
    // A4
    d3.select("body").style("width", "297mm").style("height", "210mm");

    d3p.print.render();
    return true;
  },
  render: function(){
    d3p.slides.forEach(function(slide, i){
      d3p.stage.setup();
      d3p.slide.setup();
      slide(d3p.slide.current, d3p.animations.run);
    });
  }
};
