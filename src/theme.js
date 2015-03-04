d3p.theme = {
  default: {
    translate: function(object, x, y){
      object.attr("transform", "translate(" + d3p.x(x) + "," + d3p.y(y) + ")");
    },
    group: function(stage, x, y, klass){
      var g = stage.append("g");
      if(x || y) g.attr("transform", "translate(" + d3p.x(x || 0) + "," + d3p.y(y || 0) + ")");
      if(klass)  g.attr("class", klass);
      return g;
    },
    image: function(stage, src, width, height, klass){
      var img = stage.append("image").attr("xlink:href", src).attr("width", width).attr("height", height);
      if(klass)  img.attr("class", klass);
      return img;
    },
    text: function(stage, text, klass, size){
      var t = stage.append("text").text(text);
      if(klass) t.attr("class", klass);
      if(size)  t.attr("font-size", size);
      return t;
    },
    bubble: function(stage, x, y, r, klass){
      var g = d3p.theme.default.group(stage, x, y),
          b = g.append("circle").attr("r", r);
      if(klass) g.attr("class", klass);
      return g;
    },
    svg:{
      image: function(stage, src, loaded){
        d3.xml(src, "image/svg+xml", function(xml){
          var svg = document.importNode(xml.documentElement, true),
          layers = {},
          n       = svg.children.length;
          for(var i = 0; i < n; i++){
            var l = stage.node().appendChild(svg.children[0]),
            layer = d3.select(l);
            layers[layer.attr("id")] = layer;
          }
          if(loaded) loaded(layers);
        });
      return stage;
      },
    polylineToPath: function(stage){
        stage.selectAll("polyline").each(function(){
          var path = d3.select(this.parentNode).append("path"),
              poly = d3.select(this),
              a    = this.attributes.length;

          path.attr("d", "M" + poly.attr("points"));
          for(var i = 0; i < a; i++){
            if(this.attributes[i] === "points") continue;
            path.attr(this.attributes[i].name, this.attributes[i].value);
          }
          poly.remove();
        });
    },
    lineToPath: function(stage){
        stage.selectAll("line").each(function(){
          var path = d3.select(this.parentNode).append("path"),
              line = d3.select(this),
              a    = this.attributes.length;

          path.attr("d", ["M", line.attr("x1"), ",", line.attr("y1"), " ", line.attr("x2"), ",", line.attr("y2")].join(""));
          for(var i = 0; i < a; i++){
            if(["x1", "x2", "y1", "y2"].indexOf(this.attributes[i]) > -1) continue;
            path.attr(this.attributes[i].name, this.attributes[i].value);
          }
          line.remove();
        });
      }
    },
    background: {
      color: function(stage, color){
        return stage.append("rect").attr("x", d3p.x(-1)).attr("y", d3p.y(-1)).attr("width", d3p.width).attr("height", d3p.height).style("fill", color);
      },
      klass: function(stage, klass){
        return stage.append("rect").attr("x", d3p.x(-1)).attr("y", d3p.y(-1)).attr("width", d3p.width).attr("height", d3p.height).attr("class", klass);
      },
      image: function(stage, src){
        return d3p.theme.default.image(stage, src, d3p.width, d3p.height).attr("y", d3p.y(-1)).attr("x", d3p.x(-1));
      }
    }
  }
};
