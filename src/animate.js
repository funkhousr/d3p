// Perform Animations
d3p.animations = {
  blocks: [],
  api: {
    async: function(key, objects, params){
      var b = d3p.animations.blocks.length-1;
      if(d3p.animations.blocks.length <= 0 || d3p.animations.blocks[b].type === "sequential"){
        d3p.animations.blocks.push({
          type: "parallel",
          objects: [],
          n: 0
        });
        b++;
      }
      d3p.helpers.toArray(objects).forEach(function(object){
        d3p.animations.blocks[b].objects.push({ key: key, object: object, params: (params || {}) });
        d3p.animations.blocks[b].n++;
      });
      return d3p.animations.api;
    },
    sync: function(key, objects, params){
      d3p.helpers.toArray(objects).forEach(function(object){
        d3p.animations.blocks.push({
          type: "sequential",
          objects: [{ key: key, object: object, params: (params || {}) }],
          n: 1
        });
      });
      return d3p.animations.api;
    }
  },
  run: function(){
    d3p.animations.setup();
    d3p.animations.start();
  },
  start: function(){
    if(d3p.animations.blocks.length <= 0) return;
    var block = d3p.animations.blocks.shift(),
        finished = 0,
        check = function(){
          finished++;
          if(finished >= block.n){
            d3p.animations.start();
          }
        };

    block.objects.forEach(function(object){
        d3p.transitions[object.key].run(object.object, object.params, check);
    });
  },
  setup: function(){
    d3p.animations.blocks.forEach(function(block){
      block.objects.forEach(function(object){
        d3p.transitions[object.key].setup(object.object, object.params);
      });
    });
  }
};
