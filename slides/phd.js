// Transition Presets
d3p.make = {
  "appear": d3p.transitions.appear({ duration: 500 }),
  "popOut": d3p.transitions.popOut({ duration: 300 })
};

// Slides
d3p.slides = [
  [
    function(stage, objects, make, next){
      objects.title = stage.append("text")
        .text("Web Scaling Frameworks")
        .attr("class", "h1");

      var bbox = objects.title[0][0].getBBox();
      objects.titleBg = stage.insert("rect", ":first-child")
        .attr("class", "h1")
        .attr("width", bbox.width)
        .attr("height", bbox.height)
        .attr("x", -(bbox.width/2))
        .attr("y", -(bbox.height/2));

      make.appear(objects.titleBg, next);
    },
    function(stage, objects, make, next){
      objects.subtitle = stage.append("text")
        .text("Web Services in the Cloud")
        .attr("class", "h2")
        .attr("y", d3p.y(0.1));
      make.appear(objects.subtitle, next);
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
