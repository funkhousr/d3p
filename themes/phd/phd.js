d3p.theme.phd = {
  heading: function(stage, level, text){
    var group = stage.append("g"),
        title = group.append("text").text(text).attr("class", level),
        bbox  = title[0][0].getBBox(),
        w     = bbox.width * 1.04,
        h     = bbox.height * 0.8,
        bg    = group.insert("rect", ":first-child")
          .attr("class" , level)
          .attr("width" , w)
          .attr("height", h)
          .attr("x"     , -(w/2))
          .attr("y"     , -(h/2));
    return group;
  }
};
