Cupboard = function(creator, baseX, baseY, opensFrom, isFridge) {
	var sender = this;
	var _creator = creator; //Part of ZIndex hack

	var _group = new Kinetic.Group();
	var _baseX = baseX;
	var _baseY = baseY;


	//Status
	var _isOpen = false;
	var _storedItems = new Array();

	//Elements
	var _closedImageName = isFridge ? "fridge-door-closed" : ((opensFrom == "right") ? "door-right-closed" : "door-left-closed");
	var _cupboardClosedImage = new Kinetic.Image({
		x: 0 + _baseX,
		y: 0 + _baseY,
		image: resourceManager.getImage(_closedImageName),
		width: 122,
		height: 139.5,
		visible: !_isOpen
	});
	_group.add(_cupboardClosedImage);
	_cupboardClosedImage.on('click tap', function(evt) {
		evt.cancelBubble = true;
		sender.OpenDoor();
    });
    _cupboardClosedImage.on('mouseover', function() {
    	document.body.style.cursor = "pointer";
		_cupboardClosedImage.setShadow({
	      color: '#FFFF00',
	      blur: 10,
	      offset: [0, 5],
	      opacity: 0.5
	    });
	    redraw();
	});
	_cupboardClosedImage.on('mouseout', function() {
		document.body.style.cursor = "default";
		_cupboardClosedImage.setShadow({
	      color: 'transparent'
	    });
	    redraw();
	});

	var _openImageName = isFridge ? "fridge-door-open" : ((opensFrom == "right") ? "door-right-open" : "door-left-open");
	var _openWidth = (opensFrom == "right") ? 115 : 118;
	var _openOffsetX = (opensFrom == "right") ? (_openWidth - 7) : (22 - _openWidth);
    var _cupboardOpenImage = new Kinetic.Image({
		x: _openOffsetX + _baseX,
		y: 0 + _baseY,
		image: resourceManager.getImage(_openImageName),
		width: _openWidth,
		height: 178.5,
		visible: _isOpen
	});
	_group.add(_cupboardOpenImage);
	_cupboardOpenImage.on('click tap', function(evt) {
		evt.cancelBubble = true;
		sender.CloseDoor();
    });
    _cupboardOpenImage.on('mouseover', function() {
    	document.body.style.cursor = "pointer";
		_cupboardOpenImage.setShadow({
	      color: '#FFFF00',
	      blur: 10,
	      opacity: 0.5
	    });
	    redraw();
	});
	_cupboardOpenImage.on('mouseout', function() {
		document.body.style.cursor = "default";
		_cupboardOpenImage.setShadow({
	      color: 'transparent'
	    });
	    redraw();
	});

	var _arrowTransition = null;
	var _arrow = new Kinetic.Image({
		x: baseX + (_cupboardClosedImage.getWidth() / 2) - 12,
		y: (_cupboardClosedImage.getY() + 12) - (24 * 1.3),
        height: 24,
        width: 24,
        image: resourceManager.getImage("down-arrow")
	});
	_arrow.hide();

	var setStoredItemsVisibility = function(visible) {
		if(_storedItems) {
			for (var i = 0; i < _storedItems.length; i++) {
				_storedItems[i].object.setVisible(visible);
			};
		}
	}

	var _shelfLevel = _baseY + (isFridge ? 83 : 77.5);

	this.GetShelfLevel = function() {
		return _shelfLevel;
	};

	this.IsOpen = function() {
		return _isOpen;
	};

	this.SetHasArrowForStoredItem = function(storedItemId, hasArrow) {
		for (var i = 0; i < _storedItems.length; i++) {
			if(_storedItems[i].id == storedItemId) {
				_storedItems[i].hasArrow = hasArrow;
			}
		};
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
				y: (_cupboardClosedImage.getY() + 12) - (_arrow.getHeight() * 1.3),
				duration: 1,
				easing: "ease-in-out",
				callback: function() {
					if(_arrow) moveDown();
				}
			});
		};

		var moveDown = function() {
			_arrowTransition = _arrow.transitionTo({
				y: (_cupboardClosedImage.getY() + 12) - _arrow.getHeight(),
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
		for (var i = 0; i < _storedItems.length; i++) {
			if(_storedItems[i].hasArrow) {
				return true;
			}
		};
	};

	this.OpenDoor = function() {
		audioManager.Play("openCloseDoor");
		_isOpen = true;
		_cupboardClosedImage.hide();
		_cupboardOpenImage.show();
		_creator.CupboardZIndexFix();
		setStoredItemsVisibility(true);
		hideArrow();
		redraw();
	};

	this.CloseDoor = function() {
		audioManager.Play("openCloseDoor");
		_isOpen = false;
		_cupboardClosedImage.show();
		_cupboardOpenImage.hide();
		_creator.CupboardZIndexFix();
		setStoredItemsVisibility(false);
		if(shouldDisplayArrow()) showArrow();
		redraw();
	};

	this.BringToTop = function() {
		_group.moveToTop();
	};

	this.GetArrow = function() {
		return _arrow;
	};

	this.GetDropBounds = function() {
		return {
				topLeft: {
					x: _baseX,
					y: _baseY
				},
				topRight: {
					x: _baseX + _cupboardClosedImage.getWidth(),
					y: _baseY
				},
				bottomLeft: {
					x: _baseX,
					y: _baseY + _cupboardClosedImage.getHeight()
				},
				bottomRight: {
					x: _baseX + _cupboardClosedImage.getWidth(),
					y: _baseY + _cupboardClosedImage.getHeight()
				}
		};
	};

	this.StoreItem = function(id, object, hasArrow) {
		_storedItems.push({
			id: id,
			object: object,
			hasArrow: hasArrow
		});
		object.setVisible(_isOpen);
	};

	this.RemoveItem = function(id) {
		for (var i = 0; i < _storedItems.length; i++) {
			if(_storedItems[i].id == id) {
				_storedItems[i].object.setVisible(true);
				_storedItems.splice(i, 1);
			}	
		};
	};
    
	this.GetGroup = function() {
		return _group;
	};

	var redraw = function() {
		_group.getLayer().draw();
	};
};