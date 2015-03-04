d3p.animate = {
  sync: function(key, objects, params){
    d3p.animations.queue.push({
      type    : "sync",
      key     : key,
      objects : d3p.helpers.toArray(objects),
      params  : params || {}
    });
  },
  async: function(key, objects, params){
    d3p.animations.queue.push({
      type    : "async",
      key     : key,
      objects : d3p.helpers.toArray(objects),
      params  : params || {}
    });
  },
  object: function(key, object, params){
    d3p.animate.sync(key, [object], params);
  }
};
d3p.animate.sequence = d3p.animate.sync;
d3p.animate.parallel = d3p.animate.async;
