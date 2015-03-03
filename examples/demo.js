// Slides
d3p.slides = [
  [
    function(stage, objects, animate, next){
      objects.title = d3p.theme.default.group(stage, 0, -0.1);
      d3p.theme.phd.title(objects.title, "d3p: D3 Present Framework");
      
      objects.subtitle = d3p.theme.default.group(stage, 0, 0.1);
      d3p.theme.phd.heading(objects.subtitle, "h2", "Using d3.js and SVG to create animated presentations in the browser");

      objects.author = d3p.theme.default.group(stage, 0, 0.7);
      [
        ["h3", "Thomas Fankhauser"],
        ["h4", "tommy@southdesign.de"],
        ["h4", "@tommyfankhauser"]
      ].forEach(function(author, i){
        d3p.theme.phd.heading(objects.author, author[0], author[1]).attr("transform", "translate(0," + d3p.y(i * 0.1) + ")");
      });

      next();
    }
  ],
  [
    function(stage, objects, animate, next){
      [
        [1, -1, "right", "top"],
        [1, 0, "right", "middle"],
        [1, 1, "right", "bottom"],

        [0, -1, "center", "top"],
        [0, 0, "center", "middle"],
        [0, 1, "center", "bottom"],
        
        [-1, -1, "left", "top"],
        [-1, 0, "left", "middle"],
        [-1, 1, "left", "bottom"]
      ].forEach(function(d){
        var title = d[2] + "-" + d[3];
        objects[title] = d3p.theme.default.group(stage, d[0], d[1]);
        d3p.theme.phd.heading(objects[title], "h3", title, d[2], d[3]);
      });

      objects.heading = d3p.theme.phd.block.heading(stage, "Positioning of Elements", "Relative Groups and Text Align");

      next();
    }
  ],
  [
    function(stage, objects, animate, next){
      objects.bg      = d3p.theme.default.background.image(stage, "assets/background.jpg");
      objects.heading = d3p.theme.phd.block.heading(stage, "Image Loading", "assets/background.jpg");
      
      animate.parallel("fadeIn", [objects.bg, objects.heading]);
      next();
    }
  ],
  [
    function(stage, objects, animate, next){
      objects.bg      = d3p.theme.default.background.image(stage, "assets/drawing.svg");
      objects.heading = d3p.theme.phd.block.heading(stage, "Image Loading", "assets/drawing.svg");
      
      animate.parallel("fadeIn", [objects.bg, objects.heading]);
      next();
    }
  ],
  [
    function(stage, objects, animate, next){
      objects.bg      = d3p.theme.default.background.klass(stage, "color1");
      objects.heading = d3p.theme.phd.block.heading(stage, "Background Colors", "Color 1");
      
      animate.parallel("fadeIn", [objects.bg, objects.heading]);
      next();
    }
  ],
  [
    function(stage, objects, animate, next){
      objects.bg      = d3p.theme.default.background.klass(stage, "color2");
      objects.heading = d3p.theme.phd.block.heading(stage, "Background Colors", "Color 2");
      
      animate.parallel("fadeIn", [objects.bg, objects.heading]);
      next();
    }
  ],
  [
    function(stage, objects, animate, next){
      objects.heading = d3p.theme.phd.block.heading(stage, "Animations", "Sequential and Parallel");
      
      [
        ["s1", -0.7, -0.3, "This"],
        ["s2", 0, -0.3, "is"],
        ["s3", 0.7, -0.3, "Sequential"]
      ].forEach(function(b){
        objects[b[0]] = d3p.theme.default.bubble(stage, b[1], b[2], 80, "color3");
        d3p.theme.default.text(objects[b[0]], b[3], "center middle white", "1.8em");
      });
      
      [
        ["p1", -0.7, 0.5, "This"],
        ["p2", 0, 0.5, "is"],
        ["p3", 0.7, 0.5, "Parallel"]
      ].forEach(function(b){
        objects[b[0]] = d3p.theme.default.bubble(stage, b[1], b[2], 80, "color4");
        d3p.theme.default.text(objects[b[0]], b[3], "center middle white", "1.8em");
      });

      animate.sequence("fadeIn", [objects.s1, objects.s2, objects.s3]);
      animate.parallel("fadeIn", [objects.p1, objects.p2, objects.p3]);
      
      next();
    }
  ],

  // TODO: Create convenient API that maps animations to layers and fragments
  // consider: parallel animations for layer selections
  // consider: sequential animations for layer selections from svgs
  [
    function(stage, objects, animate, next){
      objects.heading = d3p.theme.phd.block.heading(stage, "SVG Layer Import", "assets/diagram.svg");
      
      objects.diagram = d3p.theme.default.group(stage, -1, -1);
      d3p.theme.default.svg(objects.diagram, "assets/diagram.svg", function(){
        objects.base   = objects.diagram.selectAll("#base > g");
        objects.arrows = objects.diagram.selectAll("#arrows > g");
        objects.arrows.style("opacity", 0);

        animate.object("fadeIn", objects.base);
        next();
      });
    },
    function(stage, objects, animate, next){
      animate.sequence("fadeIn", objects.arrows);
      //animate.object("fadeIn", d3.select(objects.arrows[0][0]));
      next();
    },
    function(stage, objects, animate, next){
      animate.object("fadeIn", d3.select(objects.arrows[0][1]));
      next();
    },
    function(stage, objects, animate, next){
      animate.object("fadeIn", d3.select(objects.arrows[0][2]));
      next();
    }
  ],
  [
    function(stage, objects, animate, next){
      objects.heading = d3p.theme.phd.block.heading(stage, "SVG Import", "assets/drawing.svg");

      var lineLength = function(line){
        var dx = Math.abs(line.attr("x1") - line.attr("x2")),
            dy = Math.abs(line.y1 - line.y2);
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      };
      
      objects.svg = d3p.theme.default.group(stage, -0.2, -0.6);
      d3p.theme.default.svg(objects.svg, "assets/house.svg", function(){
        var paths = objects.svg.selectAll("path, line, polyline");
        paths.each(function(){
          var l = 0;
          if(this.nodeName === "path") l = this.getTotalLength();
          if(this.nodeName === "line") l = lineLength(d3.select(this));
          d3.select(this).attr("stroke-dasharray", l + " " + l)
            .attr("stroke-dashoffset", l)
            .transition().duration(2000)
              .attr("stroke-dashoffset", 0);
        }),

        
            //animate.object("fadeIn", p);
        next();
      });
    }
  ],
];

// Ready, go!
document.addEventListener('DOMContentLoaded', function(){
  WebFont.load({
    custom: { families: ['Open Sans Condensed:n3,n7,i3'] },
    active: d3p.init
  });
});
  

