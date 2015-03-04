d3p.theme.phd = {
  title: function(stage, text){
    return d3p.theme.phd.heading(stage, "h1 title", text);
  },
  heading: function(stage, level, text, hAlign, vAlign){
    var group  = stage.append("g"),
        hAlign = hAlign || "center",
        vAlign = vAlign || "middle",
        title  = group.append("text").text(text).attr("class", [level, hAlign, vAlign].join(" "));

    // H1 does not have a background rectangle
    //if(level.substr(0,2) === "h1") return group;

    // All others have
    var bbox   = title[0][0].getBBox(),
        w      = bbox.width * 1.04,
        h      = bbox.height * 0.8,
        bg     = group.insert("rect", ":first-child").attr("class" , level).attr("width" , w).attr("height", h);

        // Align
        if(hAlign === "left")   bg. attr("x" , -bbox.width * 0.02);
        if(hAlign === "center") bg. attr("x" , -(w/2));
        if(hAlign === "right")  bg. attr("x" , -w + bbox.width * 0.02);
        if(vAlign === "top")    bg. attr("y" , 0);
        if(vAlign === "middle") bg. attr("y" , -(h/2));
        if(vAlign === "bottom") bg. attr("y" , -h);
    
        return group;
  },
  block:{
    heading: function(stage, title, subtitle){
      var g = d3p.theme.default.group(stage, -0.95, -0.95);
      d3p.theme.phd.heading(g, "h1", title, "left", "top");
      var sub = d3p.theme.phd.heading(g, "h2", subtitle, "left", "top");
      d3p.theme.default.translate(sub, 0, 0.15);
      return g;
    }
  }

};
