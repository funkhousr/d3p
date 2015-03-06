d3p.print = {
  setup: function(){
    d3p.print.on = window.location.hash === "#print";
    if(!d3p.print.on) return false;

    d3p.print.size();
    d3p.print.slides();
  
    return true;
  },
  size: function(){
    // A4
    d3.select("body").style("width", "297mm").style("height", "210mm");
  },
  slides: function(){
    d3p.slides.forEach(function(slide, i){
      d3p.stage.setup();
      d3p.show(i, 0);

      // TODO: Add fragments - check animations
    });
  }
};
