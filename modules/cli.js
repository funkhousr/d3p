#!/usr/bin/env node

var
presentation = require("../modules/presentation");

if(process.argv[2] === 'new') presentation.init(process.argv[3]);
