d3p.slides.push(function(slide){
  slide.objects.title = slide.add.group(slide.stage, 0, -0.1);
  d3p.theme.phd.title(slide.objects.title, "d3p: D3 Present Framework");

  slide.objects.subtitle = slide.add.group(slide.stage, 0, 0.1);
  d3p.theme.phd.heading(slide.objects.subtitle, "h2", "Using d3.js and SVG to create animated presentations in the browser");

  slide.objects.author = slide.add.group(slide.stage, 0, 0.7);
  [
    ["h3", "Thomas Fankhauser"],
    ["h4", "tommy@southdesign.de"],
    ["h4", "@tommyfankhauser"]
  ].forEach(function(author, i){
    d3p.theme.phd.heading(slide.objects.author, author[0], author[1]).attr("transform", "translate(0," + d3p.y(i * 0.1) + ")");
  });
});

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
  });

  slide.objects.heading = d3p.theme.phd.block.heading(slide.stage, "Positioning of Elements", "Relative Groups and Text Align");
});

d3p.slides.push(function(slide){
  slide.objects.bg      = slide.add.background.image(slide.stage, "assets/background.jpg");
  slide.objects.heading = d3p.theme.phd.block.heading(slide.stage, "Image Loading", "assets/background.jpg");

  slide.animate.async("fadeIn", [slide.objects.bg, slide.objects.heading]);
});

d3p.slides.push(function(slide){
  slide.objects.bg      = slide.add.background.image(slide.stage, "assets/drawing.svg");
  slide.objects.heading = d3p.theme.phd.block.heading(slide.stage, "Image Loading", "assets/drawing.svg");

  slide.animate.async("fadeIn", [slide.objects.bg, slide.objects.heading]);
});

d3p.slides.push(function(slide){
  slide.objects.bg      = slide.add.background.klass(slide.stage, "color1");
  slide.objects.heading = d3p.theme.phd.block.heading(slide.stage, "Background Colors", "Color 1");

  slide.animate.async("fadeIn", [slide.objects.bg, slide.objects.heading]);
});

d3p.slides.push(function(slide){
  slide.objects.bg      = slide.add.background.klass(slide.stage, "color2");
  slide.objects.heading = d3p.theme.phd.block.heading(slide.stage, "Background Colors", "Color 2");

  slide.animate.async("fadeIn", [slide.objects.bg, slide.objects.heading]);
});

d3p.slides.push(function(slide){
  slide.objects.heading = d3p.theme.phd.block.heading(slide.stage, "Animations", "Sequential and Parallel");

  [
    ["s1", -0.7, -0.3, "This"],
    ["s2", 0, -0.3, "is"],
    ["s3", 0.7, -0.3, "Sequential"]
  ].forEach(function(b){
    slide.objects[b[0]] = slide.add.bubble(slide.stage, b[1], b[2], 80, "color3");
    slide.add.text(slide.objects[b[0]], b[3], "center middle white", "1.8em");
    slide.animate.sync("fadeIn", [slide.objects[b[0]]]);
  });

  [
    ["p1", -0.7, 0.5, "This"],
    ["p2", 0, 0.5, "is"],
    ["p3", 0.7, 0.5, "Parallel"]
  ].forEach(function(b){
    slide.objects[b[0]] = slide.add.bubble(slide.stage, b[1], b[2], 80, "color4");
    slide.add.text(slide.objects[b[0]], b[3], "center middle white", "1.8em");
    slide.animate.async("fadeIn", [slide.objects[b[0]]]);
  });
});


d3p.slides.push(function(slide, next){
    slide.objects.diagram = slide.add.group(slide.stage, -1, -1);
    slide.add.svg.image(slide.objects.diagram, "assets/diagram.svg", function(layers){
      slide.objects.info = layers.info;
      slide.objects.info.style("opacity", 0);
      slide.animate.sync("fadeIn", [layers.base, layers.arrows]);
      next();
    });

    slide.fragments.push(function(fragment){
      fragment.animate.sync("fadeIn", [slide.objects.info]);
    });

    slide.objects.heading = d3p.theme.phd.block.heading(slide.stage, "SVG Layer Import", "assets/diagram.svg");
});

d3p.slides.push(function(slide, next){
  slide.objects.heading = d3p.theme.phd.block.heading(slide.stage, "SVG Import", "assets/drawing.svg");

  slide.objects.drawing = slide.add.group(slide.stage, -1, -1);
  slide.add.svg.image(slide.objects.drawing, "assets/drawing.svg", function(layers){
    slide.animate.async("drawPaths", [layers.cube, layers.form], { duration: 2000 })
    slide.animate.sync("drawPaths", [layers.stroke1, layers.stroke2], { duration: 4000 })
    next();
  });
});

// Wait for webfonts, then go!
document.addEventListener('DOMContentLoaded', function(){
  WebFont.load({
    custom: { families: ['Open Sans Condensed:n3,n7,i3'] },
    active: d3p.init
  });
});


