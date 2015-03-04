var d3p = {
  init: function(){
    d3p.objects  = {};
    d3p.slide    = 0;
    d3p.fragment = 0;
    d3p.width    = 1280;
    d3p.height   = 720;
    
    // Stage Setup
    var svg = d3.select("body").append("svg").attr("class", "d3p"),
        stageTranslate = svg.append("g"),
        stageScale = stageTranslate.append("g");
    d3p.stage = stageScale;

    // Stage Resize
    var stageResize = function(){
      var sx = window.innerWidth / d3p.width,
          sy = window.innerHeight / d3p.height,
          s  = sx < sy ? sx : sy;
      svg.attr("width", window.innerWidth).attr("height", window.innerHeight);
      stageTranslate.attr("transform", "translate(" + window.innerWidth/2 + ", " + window.innerHeight/2 + ")")
      stageScale.attr("transform", "scale(" + s + ")");
    };

    // Automatic Resizing
    stageResize();
    window.onresize = stageResize;
    
    // Keymapping
    document.onkeydown = function(event){
      if(event.which == 39) d3p.next();
      if(event.which == 37) d3p.previous();
    }
    
    // Hash
    d3p.show(parseInt(window.location.hash.substr(1)), 0);
  },
  show: function(slide, fragment){
    d3p.slide            = slide ? slide : 0;
    d3p.fragment         = fragment ? fragment : 0;
    window.location.hash = "#" + d3p.slide;

    d3p.runner.add(function(done){
      d3p.slides[d3p.slide][d3p.fragment](d3p.stage, d3p.objects, d3p.animate, done);
    });
    d3p.runner.add(function(done){
      d3p.animations.run();
      done();
    });
  },
  next: function(){
    // Fragment
    if(d3p.fragment < d3p.slides[d3p.slide].length-1){
      d3p.show(d3p.slide, d3p.fragment+1);
      return;
    }

    // Slide
    if(d3p.slide < d3p.slides.length-1){
      d3p.runner.add(d3p.clear);
      d3p.show(d3p.slide+1, 0);
    }
  },
  previous: function(){
    // Fragment
    if(d3p.fragment >= 1){
      d3p.runner.add(d3p.clear);
      d3p.show(d3p.slide, 0);
      return;
    }

    // Slide
    if(d3p.slide > 0){
      d3p.runner.add(d3p.clear);
      d3p.show(d3p.slide-1, 0);
    }
  },
  clear: function(done){
    for(var name in d3p.objects){
      d3p.objects[name].remove();
    }
    d3p.objects = {};
    done();
  },
  x: function(relative){ return relative * (d3p.width/2); },
  y: function(relative){ return relative * (d3p.height/2); }
};
