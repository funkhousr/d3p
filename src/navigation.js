d3p.navigation = {
  setup: function(){
    d3p.navigation.keys();
    d3p.navigation.touch();
  },
  keys: function(){
    document.onkeydown = function(event){
      if(event.which == 39) d3p.next();
      if(event.which == 37) d3p.previous();
    }
  },
  touch: function(){
    var
    start,
    minDelta = window.innerWidth * 0.25;

    d3p.stage.main.node().addEventListener("touchstart", function(event){
      start = event.touches[0].clientX;
    });
    d3p.stage.main.node().addEventListener("touchmove", function(event){
      if(!start) return;
      var delta = start - event.touches[0].clientX;
      if(delta > minDelta){ 
        d3p.next();
        start = undefined;
      }
      if(delta < -minDelta){
        d3p.previous();
        start = undefined;
      }
    });
    d3p.stage.main.node().addEventListener("touchend", function(event){
      start = undefined;
    });
  }
};
