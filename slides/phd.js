// Transition Presets
d3p.make.appear = d3p.transitions.appear({ duration: 500 });

// Slides
d3p.slides = [
  [
    function(stage, objects, done){
      objects.title = stage.append("text")
        .text("Web Scaling Frameworks")
        .attr("x", "50%")
        .attr("y", "50%");
      d3p.make.appear(objects.title, done);
    },
    function(stage, objects, done){
      objects.subtitle = stage.append("text")
        .text("Web Services in the Cloud")
        .attr("x", "50%")
        .attr("y", "60%");
      d3p.make.appear(objects.subtitle, done);
    }
  ],
  [
    function(stage, objects, done){
      objects.title = stage.append("text")
      .text("Intro")
      .attr("x", "50%")
      .attr("y", "50%");
      d3p.make.appear(objects.title, done);
    },
    function(stage, objects, done){
      objects.subtitle = stage.append("text")
      .text("This is great!")
      .attr("x", "50%")
      .attr("y", "60%");
      d3p.make.appear(objects.subtitle, done);
    }
  ]
];

// Ready, go!
document.addEventListener('DOMContentLoaded', d3p.init);
