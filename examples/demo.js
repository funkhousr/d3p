// Slides
d3p.slides = [
  [
    function(stage, objects, animate, next){
      objects.title = d3p.theme.default.group(stage, 0, -0.1);
      objects.title.append("text").text("d3p: D3 Present Framework").attr("class", "h1");
      
      objects.subtitle = d3p.theme.default.group(stage, 0, 0.1);
      d3p.theme.phd.heading(objects.subtitle, "h2", "Using d3.js and SVG to create animated presentations in the browser");

      objects.author = d3p.theme.default.group(stage, 0, 0.8);
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
      objects.bg = d3p.theme.default.group(stage, -1, -1);
      d3p.theme.default.image(objects.bg, "assets/background.jpg", d3p.width, d3p.height);
      
      objects.center = d3p.theme.default.group(stage, 0, 0);
      d3p.theme.phd.heading(objects.center, "h2", "Center");
      
      objects.left = d3p.theme.default.group(stage, -0.8, -0.8);
      d3p.theme.phd.heading(objects.left, "h2", "Top Left", "left", "top");
      
      objects.bottom = d3p.theme.default.group(stage, 0.8, 0.8);
      d3p.theme.phd.heading(objects.bottom, "h2", "Bottom Right", "right", "bottom");

      animate.object("fadeIn", objects.center);
      animate.async("fadeIn", [objects.left, objects.bottom]);
      next();
    },
    function(stage, objects, animate, next){
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
  

