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
  ]
];

// Ready, go!
document.addEventListener('DOMContentLoaded', function(){
  WebFont.load({
    custom: { families: ['Open Sans Condensed:n3,n7,i3'] },
    active: d3p.init
  });
});
  

