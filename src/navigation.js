d3p.navigation = {
  setup: function(){
    d3p.navigation.keys();
  },
  keys: function(){
    document.onkeydown = function(event){
      if(event.which == 39) d3p.next();
      if(event.which == 37) d3p.previous();
    }
  }
};
