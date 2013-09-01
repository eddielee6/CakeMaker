Drawer = function(creator, baseX, baseY) {
	var sender = this;
	var _creator = creator; //Part of ZIndex hack

	var _group = new Kinetic.Group();
	var _baseX = baseX;
	var _baseY = baseY;


	//Status
	var _isOpen = false;
	var _storedItems = new Array();

	//Elements
	var _drawerClosedImage = new Kinetic.Image({
		x: 0 + _baseX,
		y: 0 + _baseY,
		image: resourceManager.getImage("drawer-closed"),
		width: 144,
		height: 35.5,
		visible: !_isOpen
	});
	_group.add(_drawerClosedImage);
	_drawerClosedImage.on('click tap', function(evt) {
		evt.cancelBubble = true;
		sender.OpenDoor();
    });
    _drawerClosedImage.on('mouseover', function() {
    	document.body.style.cursor = "pointer";
		_drawerClosedImage.setShadow({
      		color: '#FFFF00',
      		blur: 20
	    });
	    redraw();
	});
	_drawerClosedImage.on('mouseout', function() {
		document.body.style.cursor = "default";
		_drawerClosedImage.setShadow({
      		color: 'transparent'
	    });
	    redraw();
	});

    var _drawerOpenImage = new Kinetic.Image({
		x: 0 + _baseX,
		y: 0 + _baseY,
		image: resourceManager.getImage("drawer-open"),
		width: 144,
		height: 65.5,
		visible: _isOpen
	});
	_group.add(_drawerOpenImage);
	_drawerOpenImage.on('click tap', function(evt) {
		evt.cancelBubble = true;
		sender.CloseDoor();
    });
    _drawerOpenImage.on('mouseover', function() {
    	document.body.style.cursor = "pointer";
		_drawerOpenImage.setShadow({
	      color: '#FFFF00',
	      blur: 20,
	    });
	    redraw();
	});
	_drawerOpenImage.on('mouseout', function() {
		document.body.style.cursor = "default";
		_drawerOpenImage.setShadow({
	      color: 'transparent'
	    });
	    redraw();
	});

	var _arrowTransition = null;
	var _arrow = new Kinetic.Image({
		x: baseX + ((_drawerClosedImage.getWidth() / 2) - 12)-1.5,
		y: (_drawerClosedImage.getY() + 12) - (24 * 1.3),
        height: 24,
        width: 24,
        image: resourceManager.getImage("down-arrow")
	});
	_arrow.hide();

	var setStoredItemsVisibility = function(visible) {
		if(_storedItems) {
			for (var i = 0; i < _storedItems.length; i++) {
				_storedItems[i].object.setVisible(visible);
				if(visible) _storedItems[i].object.moveToTop();
			};
		}
	}

	var _shelfLevel = _baseY + 25;

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
				y: (_drawerClosedImage.getY() + 12) - (_arrow.getHeight() * 1.3),
				duration: 1,
				easing: "ease-in-out",
				callback: function() {
					if(_arrow) moveDown();
				}
			});
		};

		var moveDown = function() {
			_arrowTransition = _arrow.transitionTo({
				y: (_drawerClosedImage.getY() + 12) - _arrow.getHeight(),
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
		audioManager.Play("openDrawer");
		_isOpen = true;
		_drawerClosedImage.hide();
		_drawerOpenImage.show();
		setStoredItemsVisibility(true);
		_creator.CupboardZIndexFix();
		hideArrow();
		redraw();
	};

	this.CloseDoor = function() {
		audioManager.Play("closeDrawer");
		_isOpen = false;
		_drawerClosedImage.show();
		_drawerOpenImage.hide();
		setStoredItemsVisibility(false);
		_creator.CupboardZIndexFix();
		if(shouldDisplayArrow()) showArrow();
		redraw();
	};

	this.BringToTop = function() {
		_group.moveToTop();
		if(_isOpen) setStoredItemsVisibility(true);
	};

	this.GetDropBounds = function() {
		return {
				topLeft: {
					x: _baseX,
					y: _baseY
				},
				topRight: {
					x: _baseX + _drawerClosedImage.getWidth(),
					y: _baseY
				},
				bottomLeft: {
					x: _baseX,
					y: _baseY + _drawerClosedImage.getHeight()
				},
				bottomRight: {
					x: _baseX + _drawerClosedImage.getWidth(),
					y: _baseY + _drawerClosedImage.getHeight()
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

	this.GetArrow = function() {
		return _arrow;
	};

	var redraw = function() {
		_group.getLayer().draw();
	};
};