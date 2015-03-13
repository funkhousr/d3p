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
    
    // Keymapping
    document.onkeydown = function(event){
      if(event.which == 39) d3p.next();
      if(event.which == 37) d3p.previous();
    }
    
    // Print Mode
    if(d3p.print.setup()) return;

    // Slide Mode
    d3p.stage.setup();
    d3p.slide.setup();
    d3p.slide.locationHash();
    d3p.slide.show();
  }
};

// Perform Animations
d3p.animations = {
  blocks: [],
  api: {
    async: function(key, objects, params){
      var b = d3p.animations.blocks.length-1;
      if(d3p.animations.blocks.length <= 0 || d3p.animations.blocks[b].type === "sequential"){
        d3p.animations.blocks.push({
          type: "parallel",
          objects: [],
          n: 0
        });
        b++;
      }
      d3p.helpers.toArray(objects).forEach(function(object){
        d3p.animations.blocks[b].objects.push({ key: key, object: object, params: (params || {}) });
        d3p.animations.blocks[b].n++;
      });
      return d3p.animations.api;
    },
    sync: function(key, objects, params){
      d3p.helpers.toArray(objects).forEach(function(object){
        d3p.animations.blocks.push({
          type: "sequential",
          objects: [{ key: key, object: object, params: (params || {}) }],
          n: 1
        });
      });
      return d3p.animations.api;
    }
  },
  run: function(){
    d3p.animations.setup();
    d3p.animations.start();
  },
  start: function(){
    if(d3p.animations.blocks.length <= 0) return;
    var block = d3p.animations.blocks.shift(),
        finished = 0,
        check = function(){
          finished++;
          if(finished >= block.n){
            d3p.animations.start();
          }
        };

    block.objects.forEach(function(object){
        d3p.transitions[object.key].run(object.object, object.params, check);
    });
  },
  setup: function(){
    d3p.animations.blocks.forEach(function(block){
      block.objects.forEach(function(object){
        d3p.transitions[object.key].setup(object.object, object.params);
      });
    });
  }
};

d3p.config = {
  width: 1280,
  height: 720,
  print: {
    width: "297mm",
    height: "210mm"
  }
};

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

d3p.slide = {
  index: 0,
  locationHash: function(){
    var index = parseInt(window.location.hash.substr(1));
    if(!index) return;
    d3p.slide.index = index;
  },
  setup: function(){
    d3p.slide.current = {
      stage     : d3p.stage.main,
      animate   : d3p.animations.api,
      make      : d3p.theme.default,
      objects   : [],
      fragments : []
    };
  },
  show: function(){
    window.location.hash = "#" + d3p.slide.index;

    d3p.stage.clear();
    d3p.slide.setup();
    d3p.slides[d3p.slide.index](d3p.slide.current, d3p.animations.run);
    if(d3p.slides[d3p.slide.index].length <= 1) d3p.animations.run();
  },
  fragment: {
    show: function(){
      var fragment = d3p.slide.current.fragments.shift();
      fragment(d3p.slide.current, d3p.animations.run);
      if(fragment.length <= 1) d3p.animations.run();
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

d3p.stage = {
  setup: function(){
    d3p.stage.svg      = d3.select("body").append("svg").attr("class", "d3p");
    d3p.stage.position = d3p.stage.svg.append("g");
    d3p.stage.main     = d3p.stage.position.append("g").attr("class", "stage");

    // Add Background
    d3p.theme.default.background.klass(d3p.stage.main, "stage-background");

    d3p.stage.resize();
    if(!d3p.print.on) window.onresize = d3p.stage.resize;
  },
  resize: function(){
    d3p.stage.targetWidth  = d3p.print.on ? document.body.clientWidth : window.innerWidth;
    d3p.stage.targetHeight = d3p.print.on ? document.body.clientHeight : window.innerHeight;
    d3p.stage.scaleWidth   = d3p.stage.targetWidth/d3p.width;
    d3p.stage.scaleHeight  = d3p.stage.targetHeight/d3p.height;
    d3p.stage.scale        = d3p.stage.scaleWidth < d3p.stage.scaleHeight ? d3p.stage.scaleWidth : d3p.stage.scaleHeight;

    d3p.stage.svg.attr("width", d3p.stage.targetWidth).attr("height", d3p.stage.targetHeight);
    d3p.stage.position.attr("transform", "translate(" + d3p.stage.targetWidth/2 + ", " + d3p.stage.targetHeight/2 + ")");
    d3p.stage.main.attr("transform", "scale(" + d3p.stage.scale + ")");
  },
  clear: function(){
    for(var name in d3p.slide.current.objects){
      d3p.slide.current.objects[name].remove();
    }
  },
  x: function(relative){ return relative * (d3p.width/2); },
  y: function(relative){ return relative * (d3p.height/2); }
};

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
    svg:{
      image: function(stage, src, loaded){
        d3.xml(src, "image/svg+xml", function(xml){
          var svg = document.importNode(xml.documentElement, true),
          layers = {},
          n       = svg.children.length;
          for(var i = 0; i < n; i++){
            var l = stage.node().appendChild(svg.children[0]),
            layer = d3.select(l);
            layers[layer.attr("id")] = layer;
          }
          if(loaded) loaded(layers);
        });
      return stage;
      },
    polylineToPath: function(stage){
        stage.selectAll("polyline").each(function(){
          var path = d3.select(this.parentNode).append("path"),
              poly = d3.select(this),
              a    = this.attributes.length;

          path.attr("d", "M" + poly.attr("points"));
          for(var i = 0; i < a; i++){
            if(this.attributes[i] === "points") continue;
            path.attr(this.attributes[i].name, this.attributes[i].value);
          }
          poly.remove();
        });
    },
    lineToPath: function(stage){
        stage.selectAll("line").each(function(){
          var path = d3.select(this.parentNode).append("path"),
              line = d3.select(this),
              a    = this.attributes.length;

          path.attr("d", ["M", line.attr("x1"), ",", line.attr("y1"), " ", line.attr("x2"), ",", line.attr("y2")].join(""));
          for(var i = 0; i < a; i++){
            if(["x1", "x2", "y1", "y2"].indexOf(this.attributes[i]) > -1) continue;
            path.attr(this.attributes[i].name, this.attributes[i].value);
          }
          line.remove();
        });
      }
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
  },
  drawPaths: {
    setup: function(object, params){
      d3p.theme.default.svg.polylineToPath(object);
      d3p.theme.default.svg.lineToPath(object);
      object.selectAll("path").each(function(){
        var l = this.getTotalLength();
        d3.select(this).attr("stroke-dasharray", l + " " + l).attr("stroke-dashoffset", l);
      });
    },
    run: function(object, params, next){
      object.selectAll("path").each(function(){
        var l = this.getTotalLength();
        d3.select(this).transition()
        .duration(params.duration || 2000)
        .attr("stroke-dashoffset", 0)
        .each("end", next);
      });
    }
  }
};
