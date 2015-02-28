var d3p = {
  init: function(){
    d3p.objects  = {};
    d3p.slide    = 0;
    d3p.fragment = 0;
    d3p.width    = window.innerWidth;
    d3p.height   = window.innerHeight;
    d3p.stage    = d3.select("body")
      .append("svg")
        .attr("width", d3p.width)
        .attr("height", d3p.height)
        .attr("class", "d3p")
      .append("g")
        .attr("transform", "translate(" + d3p.width/2 + "," + d3p.height/2 + ")");
    
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
      d3p.slides[d3p.slide][d3p.fragment](d3p.stage, d3p.objects, d3p.make, done);
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
  x: function(relative){ return relative * 50 + "%"; },
  y: function(relative){ return relative * 50 + "%"; }
};

// Runner
d3p.queue = [];
d3p.runner = {
  add: function(f){
    d3p.queue.push(f);
    if(!d3p.running) d3p.runner.process();
  },
  process: function(next){
    if(next) d3p.next();
    var f = d3p.queue.shift();
    if(f){
      d3p.running = true;
      f(d3p.runner.process);
    } else{
      d3p.running = false;
    }
  }
};

// Transitions
d3p.make = {};
d3p.transitions = {
  appear: function(params){
    return function(objects, done){
      //var n = 0,
      //t = Object.keys(objects).length,
      //check = function(){ n++; if(n >= t) done(); };

      objects
      .style("opacity", 0)
      .transition()
      .duration(params.duration)
      .style("opacity", 1)
      .each("end", done);
    }
  },
  popOut: function(params){
    return function(objects, done){
      objects
      .transition()
      .duration(params.duration)
      .attr("transform", "scale(4)")
      .style("opacity", 0)
      .each("end", done);
    }
  }
};
