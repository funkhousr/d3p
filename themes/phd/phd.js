d3p.theme.phd = {
  heading: function(stage, level, text, hAlign, vAlign){
    var group  = stage.append("g"),
        hAlign = hAlign || "middle",
        vAlign = vAlign || "middle",
        title  = group.append("text").text(text).attr("class", [level, hAlign, vAlign].join(" ")),
        bbox   = title[0][0].getBBox(),
        w      = bbox.width * 1.04,
        h      = bbox.height * 0.8,
        bg     = group.insert("rect", ":first-child").attr("class" , level).attr("width" , w).attr("height", h);

        // Align
        if(hAlign === "left")   bg. attr("x" , -bbox.width * 0.02);
        if(hAlign === "middle") bg. attr("x" , -(w/2));
        if(hAlign === "right")  bg. attr("x" , -w + bbox.width * 0.02);
        if(vAlign === "top")    bg. attr("y" , 0);
        if(vAlign === "middle") bg. attr("y" , -(h/2));
        if(vAlign === "bottom") bg. attr("y" , -h);
    
        return group;
  }
};
