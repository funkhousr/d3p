d3p.animations = {
  queue: [],
  transaction: [],
  run: function(){
    var animation;
    d3p.animations.setup();
    while(animation = d3p.animations.queue.shift()){
      d3p.animations[animation.type](animation);
    }
    d3p.animations.commit();
  },
  setup: function(){
    d3p.animations.queue.forEach(function(animation){
      animation.objects.forEach(function(object){
        if(d3p.transitions[animation.key].setup) d3p.transitions[animation.key].setup(object, animation.params);
      });
    });
  },
  sync: function(animation){
    d3p.animations.commit();
    animation.objects.forEach(function(object){
      d3p.runner.add(function(done){
        d3p.transitions[animation.key].run(object, animation.params, done);
      });
    });
  },
  async: function(animation){
    d3p.animations.transaction.push(animation);
  },
  commit: function(){
    if(d3p.animations.transaction.length == 0) return;
    d3p.runner.add(function(done){
      var animation, n = f = 0;
      while(animation = d3p.animations.transaction.shift()){
        n += animation.objects.length;
        animation.objects.forEach(function(object){
          d3p.transitions[animation.key].run(object, animation.params, function(){
            f++;
            if(f >= n) done();
          });
        });
      }
    });
  }
};
