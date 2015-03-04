d3p.helpers = {
  toArray: function(objects){
    if(Array.isArray(objects)) return objects;
    var a = [];
    for(var key in objects){
      a.push(objects[key]);
    }
    return a;
  }
};
