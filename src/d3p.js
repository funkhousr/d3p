var d3p = {
  slides: [],
  init: function(){
    d3p.width    = 1280;
    d3p.height   = 720;
    
    d3p.stage.setup();
    d3p.slide.setup();
    d3p.slide.locationHash();
    
    // Keymapping
    document.onkeydown = function(event){
      if(event.which == 39) d3p.next();
      if(event.which == 37) d3p.previous();
    }

    // Simplify API
    d3p.next     = d3p.slide.next;
    d3p.previous = d3p.slide.previous;
    d3p.x        = d3p.stage.x;
    d3p.y        = d3p.stage.y;

    d3p.slide.next();
  }
};
