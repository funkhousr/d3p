var d3p = {
  slides: [],
  init: function(config){
    
    // Update Config
    for(var key in config){
      d3p.config[key] = config[key];
    }
    
    // Simplify API
    d3p.width    = d3p.config.width;
    d3p.height   = d3p.config.height;
    d3p.next     = d3p.slide.next;
    d3p.previous = d3p.slide.previous;
    d3p.x        = d3p.stage.x;
    d3p.y        = d3p.stage.y;
    
    // Print Mode
    if(d3p.print.setup()) return;
    
    // Slide Mode
    d3p.stage.setup();
    d3p.slide.setup();
    d3p.slide.locationHash();
    d3p.slide.show();
    
    // Navigation
    d3p.navigation.setup();
  }
};
