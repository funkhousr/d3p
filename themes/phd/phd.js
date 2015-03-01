d3p.theme.phd = {
  heading: function(stage, level, text){
    var group = stage.append("g"),
    title = group.append("text").text(text).attr("class", level),
    bbox  = title[0][0].getBBox();
    bbox.width = bbox.width * 1;
    var bg    = group.insert("rect", ":first-child")
    .attr("class" , level)
    .attr("width" , bbox.width)
    .attr("height", bbox.height)
    .attr("x"     , -(bbox.width/2))
    .attr("y"     , -(bbox.height/2));
    return group;
  }
};
