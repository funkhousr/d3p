// Slides
d3p.slides = [
  [ // Slide 1
    function(stage, objects, animate, next){
      objects.title = d3p.theme.default.group(stage, 0, -0.1);
      d3p.theme.phd.title(objects.title, "d3p: Presentation Template");
      
      objects.subtitle = d3p.theme.default.group(stage, 0, 0.1);
      d3p.theme.phd.heading(objects.subtitle, "h2", "Start your presentation from here");

      objects.author = d3p.theme.default.group(stage, 0, 0.7);
      [
        ["h3", "Your Name"],
        ["h4", "mail@provider.com"],
        ["h4", "@yourtwittername"]
      ].forEach(function(author, i){
        d3p.theme.phd.heading(objects.author, author[0], author[1]).attr("transform", "translate(0," + d3p.y(i * 0.1) + ")");
      });

      next();
    }
  ],
  [ // Slide 2
    function(stage, objects, animate, next){
      objects.heading = d3p.theme.phd.block.heading(stage, "Heading", "Subheading");
      next();
    },
    function(stage, objects, animate, next){
      objects.go = d3p.theme.default.group(stage, 0, 0);
      d3p.theme.phd.heading(objects.go, "h3", "Let's go", "center", "middle");
      next();
    }
  ],
  [ // Slide 3
    function(stage, objects, animate, next){
      objects.bg = d3p.theme.default.background.image(stage, "assets/background.jpg");
      objects.heading = d3p.theme.phd.block.heading(stage, "Image Background", "assets/background.jpg");
      
      animate.parallel("fadeIn", objects);
      next();
    }
  ]
];

// Wait for webfonts, then go!
document.addEventListener('DOMContentLoaded', function(){
  WebFont.load({
    custom: { families: ['Open Sans Condensed:n3,n7,i3'] },
    active: d3p.init
  });
});
