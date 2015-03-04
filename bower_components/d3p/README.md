# d3p: D3 Present Framework

**d3p** is a D3.js present tool that introduces slides, fragments and animations to D3 and allows to create presentations in the browser.

For an example, see the [d3p: Demo Presentation](http://southdesign.github.io/d3p).

## Create a Presentation

d3p does not need to be installed. Just create a folder for each new presentation, clone from `bower` and start with the provided template:

    mkdir talk && cd talk
    bower install d3p
    cp -R bower_components/d3p/template/* .
    open index.html

## Presentation

Presentations are created using JS with d3 and SVG. The default structure for slides is:

    d3p.slides = [
    	// Slide 1
    	[
    		// Fragment A
    		function(stage, objects, animate, next){ //... },
    		
    		// Fragment B
    		function(stage, objects, animate, next){ //... },
    		
    		// Fragment C
    		function(stage, objects, animate, next){ //... }
    	],
    	// Slide 2
    	[
    		// ...
    	]
    ];

For an example, see the demo presentation [slides.js](https://github.com/southdesign/d3p/blob/master/template/slides.js).

## Stage and Coordinate System

The stage automatically resizes to the best browser window size while maintaining a 720p HD resolution (1280x720). The coordinate system is centered at the stage, so a new object is positioned at the center of the stage by default.

Relative positioning is easily achieved by using the relative `d3p.x()` and `d3p.y()` functions further explained in the API.

## Themes

Themes are created from a JavaScript library and a corresponding css file.
The default [phd](https://github.com/southdesign/d3p/blob/master/themes/phd) theme introduces functions to create template blocks like a typical heading section, or typical animation presets for the theme.

So a theme is not only style, but also reusable functionality.


## API

### Slide Array

* **d3p.slides**: is an array of fragment functions. At least one fragment function needs to be present. The first fragment is displayed automatically, where the subsequent fragments are displayed via navigation.

### Navigation

* **d3p.next()**: Advances to the next slide or fragment
* **d3p.previous()**: Resumes to the previous slide

### Coordinate System

Both functions convert a relative translation to an absolute where `0,0` is the stage center.

* **d3p.x(floatValue)**: Returns the absolute translation where `-1 = left` and `1 = right`.
* **d3p.y(floatValue)**: Returns the absolute translation where `-1 = top` and `1 = bottom`.

### Fragment Function

* **function(stage, objects, animate, next){}**: Is a function that draw one fragment of a slide. 
	`stage`: Is the d3 selection of the root svg element. Append to this stage to add objects to the stage.
	
	`objects`: Is a JS object to store created objects that need to be reused in subsequent fragments.
	
	`animate`: Exposes the animate API introduced in the next section.
	
	`next`: Needs to be called when the fragment including all animations are setup and finished. If `next(true)` is called, the fragment automatically advances to the next step.

Do create a simple circle the fragment function looks like this:
    
    function(stage, objects, animate, next){
    	objects.circle = stage.append("circle").attr("r", 20);
    	next();
    }

If the next fragment should increase the size of the circle:

    function(stage, objects, animate, next){
    	objects.circle.transition().attr("r", 50);
    	next();
    }
	

### Animate API

The animation API is exposed to a fragemtn for object animation. It triggers transitions that are either included in d3p, or custom created in a theme or for this special slideset only.

* **animate.object(transition, object, params*)**: Applies the transition to the object.
* **animate.sequence(transition, [objects], params*)**: Applies the given transition to all provided objects in the array in a sequential order. This means that the animations are chained.
* **animate.parallel(transition, [objects], params*)**: Applies the given transition to all provided objects in the array in parallel and waits for the longest to finish.

All params are optional where transition implementations should provide default values. Sequence and parallel blocks can be mixed during calls, e.g.:


    function(stage, objects, animate, next){
    	// setup a-f
    	
    	animate.parallel("fadeIn", [objects.a, objects.b]);
    	animate.sequence("fadeIn", [objects.c, objects.d]);
    	animate.parallel("fadeIn", [objects.e, objects.f]);
    	next();
    }
    
This expands to 4 animation steps:

1. a+b
2. c
3. d
4. e+f

### Default Theme

The default theme provides common functionalities for all fragments and can be accessed via **d3p.theme.default.***.

* **translate(object, x, y)**: Translates an object by the relative `x` and `y` positions.
* **group(parent, x, y, klass)**: Creates a new group and translates it relatively.
* **image(parent, src, width, height, klass)**: Loads an image from a URL and sets its dimensions.
* **text(parent, text, klass, size)**: Creates text of class and size.
* **bubble(parent, x, y, r, klass)**: Creates a circle for illustrations.
* **svg.image(parent, src, loaded)**: Loads and embeds an svg graphic asynchronously. The `loaded(layers)` callback returns the individual svg image layers that can be animated step by step, or further customized.
* **background.color(parent, color)**: Sets the background color of the slide to `color`.
* **background.klass(parent, klass)**: Sets the background color of the slide according to `klass`.
* **background.image(parent, src)**: Loads an image as slide background. Dimensions should be in the HD dimensions.

## Contribute

I'm happy to accept new themes or general improvements via pull requests.


	



