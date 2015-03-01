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
      objects.title.append("text").text("Web Scaling Frameworks").attr("class", "h1");
      
      objects.subtitle = d3p.theme.default.group(stage, 0, 0.1);
      d3p.theme.phd.heading(objects.subtitle, "h2", "A novel class of frameworks for web services in the cloud");

      objects.authors = d3p.theme.default.group(stage, 0, 0.5);
      [
        ["h3", "Thomas Fankhauser"],
        ["h4", "Qi Wang"],
        ["h4", "Ansgar Gerlicher"],
        ["h4", "Christos Grecos"],
        ["h4", "Xinheng Wang"],
      ].forEach(function(author, i){
        d3p.theme.phd.heading(objects.authors, author[0], author[1]).attr("transform", "translate(0," + d3p.y(i * 0.1) + ")");
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
  

