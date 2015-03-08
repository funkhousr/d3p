d3p.slides.push(function(slide){
  
  slide.objects.title = slide.add.group(slide.stage, 0, -0.1);
  d3p.theme.phd.title(slide.objects.title, "d3p: D3 Present Framework");
    
  slide.objects.subtitle = slide.add.group(slide.stage, 0, 0.1);
  d3p.theme.phd.heading(slide.objects.subtitle, "h2", "Using d3.js and SVG to create animated presentations in the browser");

  slide.animate
    .sync("fadeIn", [slide.objects.title])
    .sync("fadeIn", [slide.objects.subtitle]);

  slide.fragments.push(function(fragment){
    slide.objects.author = slide.add.group(slide.stage, 0, 0.7);
    [
      ["h3", "Thomas Fankhauser"],
      ["h4", "tommy@southdesign.de"],
      ["h4", "@tommyfankhauser"]
    ].forEach(function(author, i){
      d3p.theme.phd.heading(slide.objects.author, author[0], author[1]).attr("transform", "translate(0," + d3p.y(i * 0.1) + ")");
    });

    fragment.animate.sync("fadeIn", [slide.objects.author]);
  });
});

// Slide 2
d3p.slides.push(function(slide){
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
    slide.objects[title] = slide.add.group(slide.stage, d[0], d[1]);
    d3p.theme.phd.heading(slide.objects[title], "h3", title, d[2], d[3]);
    slide.animate.sync("fadeIn", [slide.objects[title]], { duration: 300 });
  });
  
  slide.objects.heading = d3p.theme.phd.block.heading(slide.stage, "Positioning of Elements", "Relative Groups and Text Align");
});


// Wait for webfonts, then go!
document.addEventListener('DOMContentLoaded', function(){
  WebFont.load({
    custom: { families: ['Open Sans Condensed:n3,n7,i3'] },
    active: d3p.init
  });
});
  

