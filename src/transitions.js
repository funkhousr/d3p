d3p.transitions = {
  fadeIn: {
    setup: function(object, params){
      object.style("opacity", 0); 
    },
    run:   function(object, params, next){
      object.transition()
        .duration(params.duration || 500)
        .style("opacity", 1)
        .each("end", next);
    }
  },
  fadeOut: {
    run:   function(object, params, next){
      object.transition()
        .duration(params.duration || 500)
        .style("opacity", 0)
        .each("end", next);
    }
  },
  popIn: {
    setup: function(object, params){
      object.style("opacity", 0).attr("transform", "scale(" + (params.scale || 4) + ")");
    },
    run: function(object, params, next){
      object.transition()
        .duration(params.duration || 500)
        .attr("transform", "scale(1)")
        .style("opacity", 1)
        .each("end", next);
    }
  },
  popOut: {
    run: function(object, params, next){
      object.transition()
        .duration(params.duration || 500)
        .attr("transform", "scale(" + (params.scale || 4) + ")")
        .style("opacity", 0)
        .each("end", next);
    }
  },
  drawPaths: {
    setup: function(object, params){
      d3p.theme.default.svg.polylineToPath(object);
      d3p.theme.default.svg.lineToPath(object);
      object.selectAll("path").each(function(){
        var l = this.getTotalLength();
        d3.select(this).attr("stroke-dasharray", l + " " + l).attr("stroke-dashoffset", l);
      });
    },
    run: function(object, params, next){
      object.selectAll("path").each(function(){
        var l = this.getTotalLength();
        d3.select(this).transition()
        .duration(params.duration || 2000)
        .attr("stroke-dashoffset", 0)
        .each("end", next);
      });
    }
  }
};
