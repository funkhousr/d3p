d3p.slide = {
  index: -1,
  locationHash: function(){
    var index = parseInt(window.location.hash.substr(1));
    if(!index) return;
    d3p.slide.index = index;
  },
  setup: function(){
    d3p.slide.current = {
      stage     : d3p.stage.main,
      animate   : d3p.animate,
      objects   : [],
      fragments : []
    };
  },
  show: function(){
    window.location.hash = "#" + d3p.slide.index;

    d3p.stage.clear();
    d3p.slide.setup();
    d3p.slides[d3p.slide.index](d3p.slide.current);
    d3p.animations.run();
  },
  fragment: {
    show: function(){
      // pop fragment
      // run animations
    }
  },
  next: function(){
    // Fragment
    if(d3p.slide.current.fragments.length > 0){
      d3p.slide.fragment.show();
      return;
    }

    // Slide
    if(d3p.slide.index < d3p.slides.length-1){
      d3p.slide.index++;
      d3p.slide.show();
    }
  },
  previous: function(){
    if(d3p.slide.index <= 0) return;
    
    d3p.slide.index--;
    d3p.slide.show();
  },
};
