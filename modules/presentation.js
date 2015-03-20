var
bower = require("bower"),
fs    = require("fs"),
exec  = require('child_process').exec;

exports.init = function(name){
  if(!name) throw new Error("No presentation name given");

  // Create presentation folder
  fs.mkdirSync(name);
  process.chdir(name);

  // Install from bower
  bower.commands.install(['d3p']).on('end', function(){
    // Copy template
    exec("cp -R bower_components/d3p/template/* .");
  });
};
