d3p.slides.push(function(slide){
  slide.objects.title = d3p.group(0, 0)
    .append("text")
    .text("d3p: Hello World");

  slide.fragments.push(function(slide){
    slide.objects.subtitle = d3p.group(0, 0.1)
      .append("text")
      .text("This is pretty cool");
  });
});

d3p.slides.push(function(slide){
  slide.objects.title = d3p.group(0, 0)
    .append("text")
    .text("Content");

  slide.fragments.push(function(slide){
    slide.objects.title.transition()
      .duration(500)
      .style("opacity", 0);
  });
});

// Wait for DOM, and then fire!
document.addEventListener('DOMContentLoaded', d3p.init);
