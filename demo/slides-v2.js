d3p.slides.push(function(slide){
  
  slide.objects.title = d3p.theme.default.group(slide.stage, 0, -0.1);
  d3p.theme.phd.title(slide.objects.title, "d3p: D3 Present Framework");

  slide.objects.subtitle = d3p.theme.default.group(slide.stage, 0, 0.1);
  d3p.theme.phd.heading(slide.objects.subtitle, "h2", "Using d3.js and SVG to create animated presentations in the browser");

  slide.objects.author = d3p.theme.default.group(slide.stage, 0, 0.7);
  [
    ["h3", "Thomas Fankhauser"],
    ["h4", "tommy@southdesign.de"],
    ["h4", "@tommyfankhauser"]
  ].forEach(function(author, i){
    d3p.theme.phd.heading(slide.objects.author, author[0], author[1]).attr("transform", "translate(0," + d3p.y(i * 0.1) + ")");
  });

  // Fragments
  slide.fragments.push(function(fragment){
    //fragment.anmiate.object("fadeIn", slide.objects.title);
  });

  slide.fragments.push(function(fragment){
    //fragment.anmiate("fadeIn", slide.objects.title);
  });

  //slide
  //  .animate("fadeIn", [slide.objects.title, slide.objects.subtitle])
  //  .then("fadeIn", slide.objects.author);
});

// Slide 2
d3p.slides.push(function(){
  
  this.objects.title = d3p.theme.default.group(slide.stage, 0, -0.1);
  d3p.theme.phd.title(this.objects.title, "d3p: D3 Present Framework");

  this.objects.subtitle = d3p.theme.default.group(slide.stage, 0, 0.1);
  d3p.theme.phd.heading(this.objects.subtitle, "h2", "Using d3.js and SVG to create animated presentations in the browser");

  // Fragments
  this.fragments.push(function(){
    this.anmiate.object("fadeIn", this.objects.title);
  });

  this.fragments.push(function(){
    this.anmiate.object("fadeOut", this.objects.title);
  });

});


// Wait for webfonts, then go!
document.addEventListener('DOMContentLoaded', function(){
  WebFont.load({
    custom: { families: ['Open Sans Condensed:n3,n7,i3'] },
    active: d3p.init
  });
});
  

