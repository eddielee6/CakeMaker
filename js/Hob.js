Hob = function(baseX, baseY) {
	var sender = this;

	var _group = new Kinetic.Group();

	//Graphics
	var _base = new Kinetic.Image({
		x: baseX,
		y: baseY,
		image: resourceManager.getImage("hob-base"),
		width: 148,
		height: 62
	});
	_group.add(_base);

	var _topLeftPowerLight = new Kinetic.Image({
		x: baseX + 67.5,
		y: baseY + 48.5,
		image: resourceManager.getImage("hob-power-off"),
		width: 4,
		height: 2.5
	});
	_group.add(_topLeftPowerLight);

	var _topRightPowerLight = new Kinetic.Image({
		x: baseX + 72.5,
		y: baseY + 48.5,
		image: resourceManager.getImage("hob-power-off"),
		width: 4,
		height: 2.5
	});
	_group.add(_topRightPowerLight);

	var _bottomLeftPowerLight = new Kinetic.Image({
		x: baseX + 67.5,
		y: baseY + 52,
		image: resourceManager.getImage("hob-power-off"),
		width: 4,
		height: 2.5
	});
	_group.add(_bottomLeftPowerLight);

	var _bottomRightPowerLight = new Kinetic.Image({
		x: baseX + 72.5,
		y: baseY + 52,
		image: resourceManager.getImage("hob-power-off"),
		width: 4,
		height: 2.5
	});
	_group.add(_bottomRightPowerLight);

	var _topLeftPlateIsOn = false;
	var _topLeftPlate = new Kinetic.Image({
		x: baseX + 21,
		y: baseY + 4,
		image: resourceManager.getImage("hob-top-left-off"),
		width: 40.5,
		height: 19.5
	});
	_group.add(_topLeftPlate);
	_topLeftPlate.on('click tap dblclick dbltap', function(evt) {
		evt.cancelBubble = true;
		if(_topLeftPlateIsOn) {
			_topLeftPowerLight.setImage(resourceManager.getImage("hob-power-off"));
			this.setImage(resourceManager.getImage("hob-top-left-off"));
		} else {
			_topLeftPowerLight.setImage(resourceManager.getImage("hob-power-on"));
			this.setImage(resourceManager.getImage("hob-top-left-on"));
		}
		_topLeftPlateIsOn = !_topLeftPlateIsOn;
		redraw();
	});
	_topLeftPlate.on('mouseover', function() {
    	document.body.style.cursor = "pointer";
		_topLeftPlate.setShadow({
	      color: '#FFFF00',
	      blur: 20,
	      opacity: 0.5
	    });
	    redraw();
	});
	_topLeftPlate.on('mouseout', function() {
		document.body.style.cursor = "default";
		_topLeftPlate.setShadow({
	      color: 'transparent'
	    });
	    redraw();
	});

	var _topRightPlateIsOn = false;
	var _topRightPlate = new Kinetic.Image({
		x: baseX + 90.5,
		y: baseY + 4,
		image: resourceManager.getImage("hob-top-right-off"),
		width: 32.5,
		height: 16.5
	});
	_group.add(_topRightPlate);
	_topRightPlate.on('click tap dblclick dbltap', function(evt) {
		evt.cancelBubble = true;
		if(_topRightPlateIsOn) {
			_topRightPowerLight.setImage(resourceManager.getImage("hob-power-off"));
			this.setImage(resourceManager.getImage("hob-top-right-off"));
		} else {
			_topRightPowerLight.setImage(resourceManager.getImage("hob-power-on"));
			this.setImage(resourceManager.getImage("hob-top-right-on"));
		}
		_topRightPlateIsOn = !_topRightPlateIsOn;
		redraw();
	});
	_topRightPlate.on('mouseover', function() {
    	document.body.style.cursor = "pointer";
		_topRightPlate.setShadow({
	      color: '#FFFF00',
	      blur: 20,
	      opacity: 0.5
	    });
	    redraw();
	});
	_topRightPlate.on('mouseout', function() {
		document.body.style.cursor = "default";
		_topRightPlate.setShadow({
	      color: 'transparent'
	    });
	    redraw();
	});

	var _bottomLeftPlateIsOn = false;
	var _bottomLeftPlate = new Kinetic.Image({
		x: baseX + 15,
		y: baseY + 26.5,
		image: resourceManager.getImage("hob-bottom-left-off"),
		width: 44,
		height: 23.5
	});
	_group.add(_bottomLeftPlate);
	_bottomLeftPlate.on('click tap dblclick dbltap', function(evt) {
		evt.cancelBubble = true;
		if(_bottomLeftPlateIsOn) {
			_bottomLeftPowerLight.setImage(resourceManager.getImage("hob-power-off"));
			this.setImage(resourceManager.getImage("hob-bottom-left-off"));
		} else {
			_bottomLeftPowerLight.setImage(resourceManager.getImage("hob-power-on"));
			this.setImage(resourceManager.getImage("hob-bottom-left-on"));
		}
		_bottomLeftPlateIsOn = !_bottomLeftPlateIsOn;
		redraw();
	});
	_bottomLeftPlate.on('mouseover', function() {
    	document.body.style.cursor = "pointer";
		_bottomLeftPlate.setShadow({
	      color: '#FFFF00',
	      blur: 20,
	      opacity: 0.5
	    });
	    redraw();
	});
	_bottomLeftPlate.on('mouseout', function() {
		document.body.style.cursor = "default";
		_bottomLeftPlate.setShadow({
	      color: 'transparent'
	    });
	    redraw();
	});

	var _bottomRightPlateIsOn = false;
	var _bottomRightPlate = new Kinetic.Image({
		x: baseX + 83,
		y: baseY + 22.5,
		image: resourceManager.getImage("hob-bottom-right-off"),
		width: 51.5,
		height: 27.5
	});
	_group.add(_bottomRightPlate);
	_bottomRightPlate.on('click tap dblclick dbltap', function(evt) {
		evt.cancelBubble = true;
		if(_bottomRightPlateIsOn) {
			_bottomRightPowerLight.setImage(resourceManager.getImage("hob-power-off"));
			this.setImage(resourceManager.getImage("hob-bottom-right-off"));
		} else {
			_bottomRightPowerLight.setImage(resourceManager.getImage("hob-power-on"));
			this.setImage(resourceManager.getImage("hob-bottom-right-on"));
		}
		_bottomRightPlateIsOn = !_bottomRightPlateIsOn;
		kitchenScreen.HobStateChanged(_bottomRightPlateIsOn);
		redraw();
	});
	_bottomRightPlate.on('mouseover', function() {
    	document.body.style.cursor = "pointer";
		_bottomRightPlate.setShadow({
	      color: '#FFFF00',
	      blur: 20,
	      opacity: 0.5
	    });
	    redraw();
	});
	_bottomRightPlate.on('mouseout', function() {
		document.body.style.cursor = "default";
		_bottomRightPlate.setShadow({
	      color: 'transparent'
	    });
	    redraw();
	});

	this.IsOn = function() {
		return _bottomRightPlateIsOn;
	};

	this.GetDropDimentions = function() {
		return {
			x: _base.getX() + 40,
			y: _base.getY(),
			width: 100,
			height: 62
		};
	};

	this.GetHobLocation = function() {
		return {
			x: _base.getX() + 108,
			y: _base.getY() + 47
		}
	};

	this.GetGroup = function() {
		return _group;
	};

	var redraw = function() {
		_group.getLayer().draw();
	};
};