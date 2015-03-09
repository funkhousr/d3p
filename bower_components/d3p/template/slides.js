d3p.slides.push(function(slide){
  slide.objects.title = slide.make.group(slide.stage, 0, -0.1);
  d3p.theme.phd.title(slide.objects.title, "d3p: Presentation Template");

  slide.objects.subtitle = slide.make.group(slide.stage, 0, 0.1);
  d3p.theme.phd.heading(slide.objects.subtitle, "h2", "Start your presentation from here");

  slide.objects.author = slide.make.group(slide.stage, 0, 0.7);
  [
    ["h3", "Your Name"],
    ["h4", "mail@provider.com"],
    ["h4", "@yourtwittername"]
  ].forEach(function(author, i){
    d3p.theme.phd.heading(slide.objects.author, author[0], author[1]).attr("transform", "translate(0," + d3p.y(i * 0.1) + ")");
  });
});

d3p.slides.push(function(slide){
  slide.objects.heading = d3p.theme.phd.block.heading(slide.stage, "Heading", "Subheading");

  slide.fragments.push(function(){
    slide.objects.go = slide.make.group(slide.stage, 0, 0);
    d3p.theme.phd.heading(slide.objects.go, "h3", "Let's go", "center", "middle");
  });
});

d3p.slides.push(function(slide){
  slide.objects.bg = slide.make.background.image(slide.stage, "assets/background.jpg");
  slide.objects.heading = d3p.theme.phd.block.heading(slide.stage, "Image Background", "assets/background.jpg");

  slide.animate.async("fadeIn", [slide.objects.bg, slide.objects.heading]);
});

// Wait for webfonts, then go!
document.addEventListener('DOMContentLoaded', function(){
  WebFont.load({
    custom: { families: ['Open Sans Condensed:n3,n7,i3'] },
    active: d3p.init
  });
});
