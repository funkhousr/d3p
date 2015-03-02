// Transition Presets
d3p.make = {
  "appear": d3p.transitions.appear({ duration: 500 }),
  "popOut": d3p.transitions.popOut({ duration: 300 })
};

// Slides
d3p.slides = [
  [
    function(stage, objects, make, next){
      objects.title = d3p.theme.default.group(stage, 0, -0.1);
      objects.title.append("text").text("d3p: D3 Present Framework").attr("class", "h1");
      
      objects.subtitle = d3p.theme.default.group(stage, 0, 0.1);
      d3p.theme.phd.heading(objects.subtitle, "h2", "Using d3.js and SVG to create rich animated presentations in the browser");

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
    function(stage, objects, make, next){
      objects.title = stage.append("text").text("Intro").attr("x", "0").attr("y", "0");
      make.appear(objects.title, next);
    },
    function(stage, objects, make, next){
      objects.p2 = stage.append("text").text("And so on").attr("x", "0").attr("y", "10%");
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
  

