var d3p = {
  slides: [],
  objects: {},
  cache: {}
};

// d3p.init {{{
d3p.init = function(config){

  // Update Config
  for(var key in config){
    d3p.config[key] = config[key];
  }

  // API
  d3p.maxWidth    = d3p.config.width;
  d3p.maxHeight   = d3p.config.height;
  d3p.next        = d3p.slide.next;
  d3p.previous    = d3p.slide.previous;
  d3p.x           = d3p.stage.x;
  d3p.y           = d3p.stage.y;
  d3p.width       = d3p.stage.width;
  d3p.height      = d3p.stage.height;
  d3p.translate   = d3p.make.translate;
  d3p.group       = d3p.make.group;
  d3p.image       = d3p.make.image;
  d3p.svg         = d3p.make.svg;

  // Modes
  if(d3p.print.setup()) return;

  // Slide Mode
  d3p.stage.setup();
  d3p.slide.setup();
  d3p.slide.locationHash();
  d3p.slide.show();

  // Navigation
  d3p.navigation.setup();
};
// }}}
// d3p.config {{{
d3p.config = {
  width: 1280,
  height: 720,
  print: {
    width: "297mm",
    height: "210mm"
  }
};
// }}}
// d3p.print {{{
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
      slide(d3p.slide.current);
    });
  }
};
// }}}
// d3p.navigation {{{
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
// }}}
// d3p.stage {{{
d3p.stage = {
  setup: function(){
    d3p.stage.svg      = d3.select("body").append("svg").attr("class", "d3p");
    d3p.stage.position = d3p.stage.svg.append("g");
    d3p.stage.main     = d3p.stage.position.append("g").attr("class", "stage");
    d3p.stage.resize();
    if(!d3p.print.on) window.onresize = d3p.stage.resize;
  },
  resize: function(){
    d3p.stage.targetWidth  = d3p.print.on ? document.body.clientWidth : window.innerWidth - 1;
    d3p.stage.targetHeight = d3p.print.on ? document.body.clientHeight : window.innerHeight - 1;
    d3p.stage.scaleWidth   = d3p.stage.targetWidth/d3p.maxWidth;
    d3p.stage.scaleHeight  = d3p.stage.targetHeight/d3p.maxHeight;
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
  x: function(relative){ return relative * (d3p.maxWidth/2); },
  y: function(relative){ return relative * (d3p.maxHeight/2); },
  width: function(relative){ return relative * d3p.maxWidth; },
  height: function(relative){ return relative * d3p.maxHeight; }
};
// }}}
// d3p.slide {{{
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
      objects   : [],
      fragments : []
    };
  },
  show: function(){
    window.location.hash = "#" + d3p.slide.index;

    d3p.stage.clear();
    d3p.slide.setup();
    d3p.slides[d3p.slide.index](d3p.slide.current);
  },
  fragment: {
    show: function(){
      var fragment = d3p.slide.current.fragments.shift();
      fragment(d3p.slide.current);
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
  }
};
// }}}
// d3p.make {{{
d3p.make = {
  translate: function(object, x, y){
    object.attr("transform", "translate(" + d3p.x(x || 0) + "," + d3p.y(y || 0) + ")");
    return object;
  },
  group: function(x, y){
    var g = d3p.stage.main.append("g");
    d3p.translate(g, x, y);
    return g;
  },
  image: function(src, width, height){
    return d3p.stage.main.append("image")
      .attr("xlink:href", src)
      .attr("width", width)
      .attr("height", height);
  },
  svg: function(src, loaded) {
    d3.xml(src, "image/svg+xml", function(xml){
      var svg    = document.importNode(xml.documentElement, true),
          layers = {},
          n      = svg.children.length;

      for(var i = 0; i < n; i++){
        var l     = d3p.stage.main.node().appendChild(svg.children[0]),
            layer = d3.select(l);
        layers[layer.attr("id")] = layer;
      }
      if(loaded) loaded(layers);
    });
  }
};
// }}}
