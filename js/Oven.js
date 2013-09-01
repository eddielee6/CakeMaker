Oven = function(baseX, baseY) {
	var sender = this;

	var _group = new Kinetic.Group();
	var _baseX = baseX;
	var _baseY = baseY;

	this.data = {};

	//Hack to identify oven
	this.isOven = true;

	//State
	var _isOpen = false;
	var _isTurnedOn = false;
	var _temperature = 0;
	var _tempKnobPosition = 0;

	var _isEnabled = true;

	var _storedItemId = null;
	var _storedItemOldHome = null;
	var _storedItemHasArrow = false;
	var _storedItem = null;
	var _oldStoredImage = null;

	//Graphics
	var _innerOvenImage = new Kinetic.Image({
		x: 13 + _baseX,
		y: 40 + _baseY,
		image: resourceManager.getImage("oven-inner-off"),
		width: 120,
		height: 74
	});
	_group.add(_innerOvenImage);

	var _ovenBase = new Kinetic.Image({
		x: _baseX,
		y: _baseY,
		image: resourceManager.getImage("oven-base"),
		width: 148,
		height: 140.5
	});
	_group.add(_ovenBase);

	var _ovenDoorClosedImage = new Kinetic.Image({
		x: 2 + _baseX,
		y: 26 + _baseY,
		image: resourceManager.getImage("oven-door-closed"),
		width: 141,
		height: 91.5
	});
	_group.add(_ovenDoorClosedImage);

	_ovenDoorClosedImage.on('click tap', function(evt) {
		if(!_isEnabled) return;
		evt.cancelBubble = true;
		sender.OpenDoor();
    });
    _ovenDoorClosedImage.on('mouseover', function() {
    	if(!_isEnabled) return;
    	document.body.style.cursor = "pointer";
		_ovenDoorClosedImage.setShadow({
	      color: '#FFFF00',
	      blur: 10,
	      opacity: 0.5
	    });
	    redraw();
	});
	_ovenDoorClosedImage.on('mouseout', function() {
		document.body.style.cursor = "default";
		_ovenDoorClosedImage.setShadow({
	      color: 'transparent'
	    });
	    redraw();
	});

	var _ovenDoorOpenImage = new Kinetic.Image({
		x: -4 + _baseX,
		y: 116 + _baseY,
		image: resourceManager.getImage("oven-door-open"),
		width: 164.5,
		height: 87.5,
		visible: false
	});
	_group.add(_ovenDoorOpenImage);

	_ovenDoorOpenImage.on('click tap', function(evt) {
		if(!_isEnabled) return;
		evt.cancelBubble = true;
		sender.CloseDoor();
    });
    _ovenDoorOpenImage.on('mouseover', function() {
    	if(!_isEnabled) return;
    	document.body.style.cursor = "pointer";
		_ovenDoorOpenImage.setShadow({
	      color: '#FFFF00',
	      blur: 20,
	      opacity: 0.5
	    });
	    redraw();
	});
	_ovenDoorOpenImage.on('mouseout', function() {
		document.body.style.cursor = "default";
		_ovenDoorOpenImage.setShadow({
	      color: 'transparent'
	    });
	    redraw();
	});


	var _ovenLightOffImage = new Kinetic.Image({
		x: 131.5 + _baseX,
		y: 13.5 + _baseY,
		image: resourceManager.getImage("oven-light-off"),
		width: 2.5,
		height: 2.5
	});
	_group.add(_ovenLightOffImage);


	var _ovenLightOnImage = new Kinetic.Image({
		x: 127.5 + _baseX,
		y: 9.5 + _baseY,
		image: resourceManager.getImage("oven-light-on"),
		width: 10.5,
		height: 10.5,
		visible: false
	});
	_group.add(_ovenLightOnImage);

	var _powerKnobImage = new Kinetic.Image({
		x: 30 + _baseX,
		y: 10.5 + _baseY,
		image: resourceManager.getImage("oven-knob-0"),
		width: 12.5,
		height: 12.5
	});
	_group.add(_powerKnobImage);

	var _tempKnobImage = new Kinetic.Image({
		x: 104 + _baseX,
		y: 10.5 + _baseY,
		image: resourceManager.getImage("oven-knob-0"),
		width: 12.5,
		height: 12.5
	});
	_group.add(_tempKnobImage);

	var _display = new Kinetic.Text({
        x: 57 + _baseX,
        y: 13 + _baseY,
        width: 31.5,
        height: 8.5,
        verticalAlign: "middle",
        align: "center",
        text: dateFormat(new Date(), "HH:MM"),
        fontSize: 5.8,
        fontFamily: "Courier",
    	textFill: "#ee0000",
    	fontStyle: "bold"
  	});
  	_group.add(_display);


	//Click zones
	var _controlClickArea = new Kinetic.Rect({
		x: 0 + _baseX,
		y: 0 + _baseY,
		width: 145,
		height: 25
	});
	_group.add(_controlClickArea);
	_controlClickArea.on('dblclick dbltap', function(evt) {
		evt.cancelBubble = true;
		kitchenScreen.ZoomOnOven(); //TODO: Refactor reference to parent
    });

	var _powerKnobClickArea = new Kinetic.Rect({
		x: 28 + _baseX,
		y: 4 + _baseY,
		width: 19,
		height: 19
	});
	_group.add(_powerKnobClickArea);
	_powerKnobClickArea.on('click tap', function(evt) {
		if(!_isEnabled) return;
		evt.cancelBubble = true;
		if(_isTurnedOn) {
			sender.TurnOff();
		} else {
			sender.TurnOn();
		}
    });
    _powerKnobClickArea.on('mouseover', function() {
    	if(!_isEnabled) return;
    	document.body.style.cursor = "pointer";
		_powerKnobImage.setShadow({
	      color: '#FFFF00',
	      blur: 20,
	      opacity: 1
	    });
	    redraw();
	});
	_powerKnobClickArea.on('mouseout', function() {
		document.body.style.cursor = "default";
		_powerKnobImage.setShadow({
	      color: 'transparent'
	    });
	    redraw();
	});

	var _tempKnobClickArea = new Kinetic.Rect({
		x: 97.5 + _baseX,
		y: 4 + _baseY,
		width: 24,
		height: 19
	});
	_group.add(_tempKnobClickArea);
	_tempKnobClickArea.on('mouseover', function() {
		if(!_isEnabled) return;
    	document.body.style.cursor = "pointer";
		_tempKnobImage.setShadow({
	      color: '#FFFF00',
	      blur: 20,
	      opacity: 1
	    });
	    redraw();
	});
	_tempKnobClickArea.on('mouseout', function() {
		document.body.style.cursor = "default";
		_tempKnobImage.setShadow({
	      color: 'transparent'
	    });
	    redraw();
	});
	_tempKnobClickArea.on('click tap', function(evt) {
		if(!_isEnabled) return;
		evt.cancelBubble = true;
		_tempKnobPosition = _tempKnobPosition < 270 ? _tempKnobPosition + 90 : 0;
		_tempKnobImage.setImage(resourceManager.getImage("oven-knob-" + _tempKnobPosition));
		switch(_tempKnobPosition) {
			case 0:
				_temperature = 0;
				break;
			case 90:
				_temperature = 100;
				break;
			case 180:
				_temperature = 160;
				break;
			case 270:
				_temperature = 200;
				break;
		}
		kitchenScreen.OvenStateChanged(_isTurnedOn, _temperature, _isOpen);
		redraw();
    });

    var _arrowTransition = null;
	var _arrow = new Kinetic.Image({
		x: baseX + (_ovenDoorClosedImage.getWidth() / 2) - 12,
		y: (_ovenDoorClosedImage.getY() + 12) - (24 * 1.3),
        height: 24,
        width: 24,
        image: resourceManager.getImage("down-arrow")
	});
	_arrow.hide();

    var _shelfLevel = _baseY + 90;

	this.GetShelfLevel = function() {
		return _shelfLevel;
	};

    this.GetDropBounds = function() {
		return {
				topLeft: {
					x: 13 + _baseX,
					y: 40 + _baseY
				},
				topRight: {
					x: 13 + _baseX + 120,
					y: 40 + _baseY
				},
				bottomLeft: {
					x: 13 + _baseX,
					y: 40 + _baseY + 74
				},
				bottomRight: {
					x: 13 + _baseX + 120,
					y: 40 + _baseY + 74
				}
		};
	};

	this.TurnOn = function() {
		_isTurnedOn = true;
		_ovenLightOffImage.setVisible(false);
		_ovenLightOnImage.setVisible(true);
		_powerKnobImage.setImage(resourceManager.getImage("oven-knob-90"));
		_innerOvenImage.setImage(resourceManager.getImage("oven-inner-on"));
		redraw();
		kitchenScreen.OvenStateChanged(_isTurnedOn, _temperature, _isOpen);
		
	};

	this.TurnOff = function() {
		_isTurnedOn = false;
		_ovenLightOffImage.setVisible(true);
		_ovenLightOnImage.setVisible(false);
		_powerKnobImage.setImage(resourceManager.getImage("oven-knob-0"));
		_innerOvenImage.setImage(resourceManager.getImage("oven-inner-off"));
		redraw();
		kitchenScreen.OvenStateChanged(_isTurnedOn, _temperature, _isOpen);
	};

	this.IsOpen = function() {
		return _isOpen;
	};

	this.SetHasArrowForStoredItem = function(storedItemId, hasArrow) {
		_storedItemHasArrow = hasArrow;
		if(!_isOpen) {
			if(shouldDisplayArrow()) {
				showArrow();
			} else {
				hideArrow();
			}
		}
	};

	var showArrow = function() {
		_arrow.show();
		animateArrow();
 	};

 	var hideArrow = function() {
 		_arrow.hide();
 		if(_arrowTransition) _arrowTransition.stop();
 	};

 	var animateArrow = function() {
		var moveUp = function() {
			_arrowTransition = _arrow.transitionTo({
				y: (_ovenDoorClosedImage.getY() + 12) - (_arrow.getHeight() * 1.3),
				duration: 1,
				easing: "ease-in-out",
				callback: function() {
					if(_arrow) moveDown();
				}
			});
		};

		var moveDown = function() {
			_arrowTransition = _arrow.transitionTo({
				y: (_ovenDoorClosedImage.getY() + 12) - _arrow.getHeight(),
				duration: 1,
				easing: "ease-in-out",
				callback: function() {
					if(_arrow) moveUp();
				}
			});
		};

		moveDown();
	};

	var shouldDisplayArrow = function() {
		return _storedItem && _storedItemHasArrow;
	};

	this.OpenDoor = function() {
		_isOpen = true;
		_ovenDoorClosedImage.hide();
		_ovenDoorOpenImage.show();
		hideArrow();
		
		if(_storedItem) {
			if(_storedItemHasArrow) {
				for (var i = 0; i < _storedItem.getChildren().length; i++) {
					if(_storedItem.getChildren()[i].getId() == "arrow") {
						_storedItem.getChildren()[i].show();
					}
				};
			}
			_storedItem.get('#' + _storedItemId)[0].setImage(_oldStoredImage);
		}
		redraw();

		kitchenScreen.OvenStateChanged(_isTurnedOn, _temperature, _isOpen);
	};

	this.CloseDoor = function() {
		_isOpen = false;
		_ovenDoorClosedImage.show();
		_ovenDoorClosedImage.moveToTop();
		_ovenDoorOpenImage.hide();
		if(shouldDisplayArrow()) showArrow();
		redraw();

		if(_storedItem) {
			for (var i = 0; i < _storedItem.getChildren().length; i++) {
				if(_storedItem.getChildren()[i].getId() == "arrow") {
					_storedItem.getChildren()[i].hide();
				}
			};
			_oldStoredImage = _storedItem.get('#' + _storedItemId)[0].getImage();
			_storedItem.get('#' + _storedItemId)[0].applyFilter(Kinetic.Filters.Brighten, {val:-30}, function() {
				redraw();
			});
		}

		kitchenScreen.OvenStateChanged(_isTurnedOn, _temperature, _isOpen);
	};

	this.Enable = function() {
		_isEnabled = true;
	};

	this.Disable = function() {
		_isEnabled = false;
	};

	this.GetOvenStatus = function() {
		return {
			turnedOn: _isTurnedOn,
			temperature: _temperature,
			doorOpen: _isOpen
		};
	};

	this.StoreItem = function(id, object, hasArrow) {
		_storedItemId = id;
		_storedItem = object;
		_storedItemHasArrow = hasArrow;
		_storedItemOldHome = _storedItem.getParent();
		object.moveTo(_group);
	};

	this.RemoveItem = function(id) {
		_storedItemId = null;
		_storedItemHasArrow = false;
		_storedItem.moveTo(_storedItemOldHome);
		_storedItem = null;
	};

	this.GetArrow = function() {
		return _arrow;
	};
	
	this.GetGroup = function() {
		return _group;
	};

	this.UpdateOvenTime = function() {
		_display.setText(dateFormat(new Date(), "HH:MM"));
		redraw();
	};

	var redraw = function() {
		_group.getLayer().draw();
	};
};