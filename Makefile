default: update

update:
	bower install d3p
	cp ./bower_components/d3p/demo/demo.html index.html
	cp ./bower_components/d3p/demo/slides.js .
	rm ./assets/*
	cp ./bower_components/d3p/demo/assets/* assets

.PHONY: update
