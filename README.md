# d3p: D3 Present Framework

**d3p** is a D3.js present tool that introduces slides, fragments and animations to D3 and allows to create presentations in the browser.

For an example, see the [d3p: Demo Presentation](http://southdesign.github.io/d3p).

## Create a Presentation

Install **d3p** with npm:

    npm install d3p -g

Create a new presentation:

    d3p new talk

This will create a folder named `talk`, install d3p using bower and copy the basic presentation template for you.

## Presentation

Presentations are created in a `slides.js` with d3 and SVG. `d3p.slides` is an array of slide functions:

    // Slide 1
    d3p.slides.push(function(slide){
      // d3 objects
      // animations
      
      // fragment
      slide.fragments.push(function(fragment){
        // d3 objects
        // animations
      });
      
      // fragment
      slide.fragments.push(function(fragment){
        // d3 objects
        // animations
      });
    });

    // Slide 2
    d3p.slides.push(function(slide){
      // d3 objects
      // animations
      
      // ...
    });


For an example, see the demo presentation [slides.js](https://github.com/southdesign/d3p/blob/master/template/slides.js).

## Stage and Coordinate System

The stage automatically resizes to the best browser window size while maintaining a 720p HD resolution (1280x720). The coordinate system is centered at the stage, so a new object is positioned at the center of the stage by default.

Relative positioning is easily achieved by using the relative `d3p.x()` and `d3p.y()` functions further explained in the API.

## Themes

Themes are created from a JavaScript library and a corresponding css file.
The default [phd](https://github.com/southdesign/d3p/blob/master/themes/phd) theme introduces functions to create template blocks like a typical heading section, or typical animation presets for the theme.

So a theme is not only style, but also reusable functionality.

## Configuration

By default, slides are in 16:9 which is configurable from the `init` method:

    d3p.init({
      width: 1280,
      height: 720,
      // ...
    });

For all configuration options see the default [config](https://github.com/southdesign/d3p/blob/master/src/config.js).

## Print / PDF Export

Open the presentation with `#print` to see a print preview of all slides.
The exported document size can be configured with `d3p.config.print.width` and `d3p.config.print.height`.
Make sure it is set to the same page size as your printer and print without margins.


## API

### Slide Array

* **d3p.slides**: is an array of slide functions.

### Navigation

* **d3p.next()**: Advances to the next slide or fragment
* **d3p.previous()**: Resumes to the previous slide

### Coordinate System

Both functions convert a relative translation to an absolute where `0,0` is the stage center.

* **d3p.x(floatValue)**: Returns the absolute translation where `-1 = left` and `1 = right`.
* **d3p.y(floatValue)**: Returns the absolute translation where `-1 = top` and `1 = bottom`.

### Slide and Fragment Function

The slide and fragment function `function(slide, callback*){}` are equal and get passed a slide object and an optional callback that has to be consumed if injected.

The slide object has the following attributes:

* **slide.stage**: Is the d3 selection of the root svg element. Append to this stage to add objects to the stage.
* **slide.objects**: Is a object to store created objects that need to be reused in subsequent fragments.
* **slide.fragments**: Is an array to store fragment functions for the slide.
* **slide.animate**: Exposes the animate API introduced in the next section.
* **slide.make**: Exposes the default theme to easily add groups, backgrounds, images, etc.


To create a simple circle the fragment function looks like this:
    
    function(slide){
    	slide.objects.circle = slide.stage.append("circle").attr("r", 20);
    	
    	// If the next fragment should increase the size of the circle
    	slide.fragments.push(function(fragment){
    		fragment.objects.circle.transition().attr("r", 50);
    	});
    }
	

### Animate API

The animation API is exposed to `slide.animate`. It triggers transitions that are either included in d3p, or custom created in a theme or for this special slideset only.

* **animate.sync(transition, [objects], params*)**: Adds a blocking (sequential) animation
* **animate.async(transition, [objects], params*)**: Adds a non-blocking (parallel) animation

Animations can be added stepwise or chained:

    function(slide){
    	// setup a-f
    	
    	// stepwise
    	slide.animate.async("fadeIn", [objects.a, objects.b]);
    	slide.animate.sync("fadeIn", [objects.c, objects.d]);
    	slide.animate.async("fadeIn", [objects.e, objects.f]);
    	
    	// or chained
    	slide.animate
    		.async("fadeIn", [objects.a, objects.b])
    		.sync("fadeIn", [objects.c, objects.d])
    		.async("fadeIn", [objects.e, objects.f]);
    }
    
This expands to 4 animation steps:

1. a+b
2. c
3. d
4. e+f

### Default Theme

The default theme provides common functionalities for all fragments and can be accessed via `slide.make`:

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


	



