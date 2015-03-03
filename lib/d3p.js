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
    d3p.animations.run();
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

// Helpers - TODO: input: array, single object, all objects -> output array
d3p.helpers = {
  toArray: function(objects){
    if(Array.isArray(objects)) return objects;
    var a = [];
    for(var key in objects){
      a.push(objects[key]);
    }
    return a;
  }
};

// Runner
d3p.runner = {
  queue: [],
  add: function(f){
    d3p.runner.queue.push(f);
    if(!d3p.running) d3p.runner.process();
  },
  process: function(next){
    if(next) d3p.next();
    var f = d3p.runner.queue.shift();
    if(f){
      d3p.running = true;
      f(d3p.runner.process);
    } else{
      d3p.running = false;
    }
  }
};

// Transitions
d3p.transitions = {
  fadeIn: {
    setup: function(object, params){
      object.style("opacity", 0); 
    },
    run:   function(object, params, next){
      object.transition()
        .duration(params.duration || 500)
        .style("opacity", 1)
        .each("end", next);
    }
  },
  fadeOut: {
    run:   function(object, params, next){
      object.transition()
        .duration(params.duration || 500)
        .style("opacity", 0)
        .each("end", next);
    }
  },
  popIn: {
    setup: function(object, params){
      object.style("opacity", 0).attr("transform", "scale(" + (params.scale || 4) + ")");
    },
    run: function(object, params, next){
      object.transition()
        .duration(params.duration || 500)
        .attr("transform", "scale(1)")
        .style("opacity", 1)
        .each("end", next);
    }
  },
  popOut: {
    run: function(object, params, next){
      object.transition()
        .duration(params.duration || 500)
        .attr("transform", "scale(" + (params.scale || 4) + ")")
        .style("opacity", 0)
        .each("end", next);
    }
  }
};

// Animations
d3p.animations = {
  queue: [],
  transaction: [],
  run: function(){
    var animation;
    d3p.animations.setup();
    while(animation = d3p.animations.queue.shift()){
      d3p.animations[animation.type](animation);
    }
    d3p.animations.commit();
  },
  setup: function(){
    d3p.animations.queue.forEach(function(animation){
      animation.objects.forEach(function(object){
        if(d3p.transitions[animation.key].setup) d3p.transitions[animation.key].setup(object, animation.params);
      });
    });
  },
  sync: function(animation){
    d3p.animations.commit();
    animation.objects.forEach(function(object){
      d3p.runner.add(function(done){
        d3p.transitions[animation.key].run(object, animation.params, done);
      });
    });
  },
  async: function(animation){
    d3p.animations.transaction.push(animation);
  },
  commit: function(){
    if(d3p.animations.transaction.length == 0) return;
    d3p.runner.add(function(done){
      var animation, n = f = 0;
      while(animation = d3p.animations.transaction.shift()){
        n += animation.objects.length;
        animation.objects.forEach(function(object){
          d3p.transitions[animation.key].run(object, animation.params, function(){
            f++;
            if(f >= n) done();
          });
        });
      }
    });
  }
};

// Animate API
d3p.animate = {
  sync: function(key, objects, params){
    d3p.animations.queue.push({
      type    : "sync",
      key     : key,
      objects : d3p.helpers.toArray(objects),
      params  : params || {}
    });
  },
  async: function(key, objects, params){
    d3p.animations.queue.push({
      type    : "async",
      key     : key,
      objects : d3p.helpers.toArray(objects),
      params  : params || {}
    });
  },
  object: function(key, object, params){
    d3p.animate.sync(key, [object], params);
  }
};
d3p.animate.sequence = d3p.animate.sync;
d3p.animate.parallel = d3p.animate.async;

// Themes Container
d3p.theme = {
  default: {
    translate: function(object, x, y){
      object.attr("transform", "translate(" + d3p.x(x) + "," + d3p.y(y) + ")");
    },
    group: function(stage, x, y, klass){
      var g = stage.append("g");
      if(x || y) g.attr("transform", "translate(" + d3p.x(x || 0) + "," + d3p.y(y || 0) + ")");
      if(klass)  g.attr("class", klass);
      return g;
    },
    image: function(stage, src, width, height, klass){
      var img = stage.append("image").attr("xlink:href", src).attr("width", width).attr("height", height);
      if(klass)  img.attr("class", klass);
      return img;
    },
    text: function(stage, text, klass, size){
      var t = stage.append("text").text(text);
      if(klass) t.attr("class", klass);
      if(size)  t.attr("font-size", size);
      return t;
    },
    bubble: function(stage, x, y, r, klass){
      var g = d3p.theme.default.group(stage, x, y),
          b = g.append("circle").attr("r", r);
      if(klass) g.attr("class", klass);
      return g;
    },
    background: {
      color: function(stage, color){
        return stage.append("rect").attr("x", d3p.x(-1)).attr("y", d3p.y(-1)).attr("width", d3p.width).attr("height", d3p.height).style("fill", color);
      },
      klass: function(stage, klass){
        return stage.append("rect").attr("x", d3p.x(-1)).attr("y", d3p.y(-1)).attr("width", d3p.width).attr("height", d3p.height).attr("class", klass);
      },
      image: function(stage, src){
        return d3p.theme.default.image(stage, src, d3p.width, d3p.height).attr("y", d3p.y(-1)).attr("x", d3p.x(-1));
      }
    }
  }
};
