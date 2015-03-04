d3p.runner = {
  queue: [],
  add: function(f){
    d3p.runner.queue.push(f);
    if(!d3p.running) d3p.runner.process();
  },
  process: function(next){
    if(next) d3p.next();
    var f = d3p.runner.queue.shift();
    if(f){
      d3p.running = true;
      f(d3p.runner.process);
    } else{
      d3p.running = false;
    }
  }
};
