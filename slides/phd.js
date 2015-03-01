// Transition Presets
d3p.make = {
  "appear": d3p.transitions.appear({ duration: 500 }),
  "popOut": d3p.transitions.popOut({ duration: 300 })
};

// Slides
d3p.slides = [
  [
    function(stage, objects, make, next){
      objects.title    = phd.heading(stage, "h1", "Web Scaling Frameworks")
        .attr("transform", "translate(0," + d3p.y(-0.05) + ")");
      objects.subtitle = phd.heading(stage, "h2", "A novel class of frameworks for web services in the cloud")
        .attr("transform", "translate(0," + d3p.y(0.1) + ")");

      objects.authors = stage.append("g").attr("transform", "translate(0," + d3p.y(0.5) + ")");
      phd.heading(objects.authors, "h3", "Thomas Fankhauser")
      phd.heading(objects.authors, "h4", "Qi Wang").attr("transform", "translate(0," + d3p.y(0.1) + ")");
      phd.heading(objects.authors, "h4", "Ansgar Gerlicher").attr("transform", "translate(0," + d3p.y(0.2) + ")");
      phd.heading(objects.authors, "h4", "Christos Grecos").attr("transform", "translate(0," + d3p.y(0.3) + ")");
      phd.heading(objects.authors, "h4", "Xinheng Wang").attr("transform", "translate(0," + d3p.y(0.4) + ")");
    },
    function(stage, objects, make, next){
      d3p.make.popOut(objects.subtitle, function(){ next(true); });
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
document.addEventListener('DOMContentLoaded', d3p.init);

// Phd Theme Library
var phd = {};
phd.heading = function(stage, level, text){
  var group = stage.append("g"),
      title = group.append("text").text(text).attr("class", level),
      bbox  = title[0][0].getBBox(),
      bg    = group.insert("rect", ":first-child")
        .attr("class" , level)
        .attr("width" , bbox.width)
        .attr("height", bbox.height)
        .attr("x"     , -(bbox.width/2))
        .attr("y"     , -(bbox.height/2));
  return group;
};
