CustomButton = function(baseX, baseY, buttonText, colour1, colour2, textColour, clickFunction) {
	var sender = this;

	var colour1 = colour1;
	var colour2 = colour2;
	var textColour = textColour;
	var clickFunction = clickFunction;

	var buttonClicked = false;

	var _group = new Kinetic.Group({
		visible: false
	});

	var _buttonBackground = new Kinetic.Rect({
        x: baseX,
        y: baseY,
        width: 220,
        height: 50,
        cornerRadius: 10,
        stroke: "#3b3b3b",
        fill: {
    		start: {
      			x: 0,
          		y: 0
            },
            end: {
      			x: 0,
          		y: 49
   		 	},
   		 	colorStops: [0, colour1, 1, colour2]
        }
    });
    _group.add(_buttonBackground);
    _group.on("mouseover touchstart", function() {
    	document.body.style.cursor = "pointer";
    	_buttonBackground.setFill({
			start: {
      			x: 0,
          		y: 0
            },
            end: {
      			x: 0,
          		y: 49
   		 	},
        	colorStops: [0, colour2, 1, colour1]
    	});
    	redraw();
    });
    _group.on("mouseout touchend", function() {
    	document.body.style.cursor = "default";
    	if(_buttonBackground) {
	    	_buttonBackground.setFill({
	    		start: {
	      			x: 0,
	          		y: 0
	            },
	            end: {
	      			x: 0,
	          		y: 49
	   		 	},
	        	colorStops: [0, colour1, 1, colour2]
	    	});
	    	redraw();
	    }
    });
    _group.on("click tap", function() {
    	if(!buttonClicked) {
    		buttonClicked = true;
    		clickFunction();
    	}
    });

	var _buttonText = new Kinetic.Text({
		x: baseX,
		y: baseY + 17,
		width: 220,
		text: buttonText,
		align: 'center',
		fontSize: 20,
		fontFamily: 'Helvetica',
		textFill: textColour
	});
	_group.add(_buttonText);

    this.Reset = function() {
    	buttonClicked = false;
    };

    this.Hide = function() {
    	_group.hide();
    };

    this.Show = function() {
    	_group.show();
    };

    this.GetGroup = function() {
		return _group;
    };

    var redraw = function() {
    	_group.getLayer().draw();
    };
};