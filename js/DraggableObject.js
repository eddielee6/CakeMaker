DraggableObject = function(screen, id, imageName, imageWidth, imageHeight, startX, startY, friendlyName) {
	var sender = this;
	var containingScreen = screen;

	//Custom events
	var _dropEndEvent = null;
	var _clickEvent = null;
	var _moveEvent = null;
	var _dragStartEvent = null;
	var _noneStorageDropEvent = null;

	//Custom properties
	var _customDropParameters = null;
	this.data = {};

	//State
	var _objectShrunk = false;
	var gravityTransition = null;
	var storedIn = null;
	var _hasArrow = false;
	var _arrowTransition = null;
	var hasHoverState = true;
	var hitRegion = {
		x: 0,
		y: 0,
		width: imageWidth,
		height: imageHeight
	};

	//Define objects
	var objectImage = new Kinetic.Image({
		id: id,
		x: startX,
		y: startY,
		width: imageWidth,
		height: imageHeight,
		image: resourceManager.getImage(imageName),
	 	draggable: true
	});

	var _arrow = new Kinetic.Image({
		id: 'arrow',
        height: 24,
        width: 24,
        image: resourceManager.getImage("down-arrow")
	});
	_arrow.hide();

	var tooltip = new Kinetic.Group();
	var objectName = new Kinetic.Text({
     	text: friendlyName,
        fontFamily: 'Helvetica',
        textFill: "#363636",
        fontSize: 11
	});
	var tooltipBackground = new Kinetic.Rect({
		y: -8,
		x: -10,
		fill: "rgba(255,255,255,0.7)",
		width: objectName.getWidth() + 20,
		height: objectName.getHeight() + 14,
        cornerRadius: 10,
        stroke: 'rgba(50, 50, 50, 0.7)',
        strokeWidth: 1
	});
	tooltip.add(tooltipBackground);
	tooltip.add(objectName);
	tooltip.hide();

	var group = new Kinetic.Group();
	group.add(_arrow);
	group.add(objectImage);
	group.add(tooltip);

	//Prevent dragging off screen
	var defaultDragBounds = function(pos) {
		var gravityOffset = objectImage.getHeight() * canvasManager.GetScale().y;
		var maxX = canvasManager.GetCurrentSize().width - (objectImage.getWidth() * canvasManager.GetScale().x);
		var maxY = (699  * canvasManager.GetScale().y) - gravityOffset;

		return {
			x: pos.x < 0 ? 0 : pos.x > maxX ? maxX : pos.x,
			y: pos.y < 0 ? 0 : pos.y > maxY ? maxY : pos.y
		};
    };
	objectImage.setDragBoundFunc(defaultDragBounds);

	//On click / touch start event
	objectImage.on('tap click', function() {
		group.moveToTop();
		if(_clickEvent) _clickEvent();
	});

	//On mouseover event
	objectImage.on('mouseover', function() {
		if(hasHoverState) {
			document.body.style.cursor = "pointer";
			showObjectName();
			objectImage.setShadow({
		      color: '#FFFF00',
		      blur: 20,
		      opacity: 0.5
		    });
		    redraw();
		}
	});

	//On mouseout event
	objectImage.on('mouseout', function() {
		if(hasHoverState) {
			document.body.style.cursor = "default";
			hideObjectName();
			objectImage.setShadow({
		      color: 'transparent'
		    });
		    redraw();
		}
	});

	//Drag start event
	objectImage.on('dragstart', function() {
		hideArrow();
		hideObjectName();
		if(_dragStartEvent) _dragStartEvent();
		group.moveToTop();
		if(storedIn) {
			storedIn.RemoveItem(sender.GetId());
			storedIn = null;
		}
		if(gravityTransition != null) {
			gravityTransition.stop();
		}
	});

	//Drag end event
	objectImage.on('dragend', function() {
		if(_dropEndEvent) {
			var returnEarly = _dropEndEvent();
			if(returnEarly) return; //skip gravity
		}

		if(sender.data.removeArrowOnNextDrop) {
			sender.data.removeArrowOnNextDrop = false
			sender.RemoveArrow();
		}

		var dropDetails = containingScreen.GetDropDetails(sender);
		if(dropDetails.dropInContainer) {
			dropDetails.container.StoreItem(sender.GetId(), sender.GetObjectToAddToLayer(), _hasArrow);
			storedIn = dropDetails.container;
			var distance = (dropDetails.transitionTo - objectImage.getHeight()) - objectImage.getY();
			distance = distance <= 0 ? -distance : distance;
			var dropDuration = Math.sqrt(distance) / 10;
			objectImage.transitionTo({
				y: dropDetails.transitionTo - objectImage.getHeight(),
				easing: 'bounce-ease-out',
				duration: dropDuration,
				callback: function() {
					objectLanded()
				}
			});
		} else {
			if(group.isVisible()) { //For items that disapear on drop (such as cracking an egg)
				if(_noneStorageDropEvent) {
					_noneStorageDropEvent();
				}

				var trans = calculateDropTransition(containingScreen);
				if(_customDropParameters) {
					if(_customDropParameters.easing) trans.easing = _customDropParameters.easing;
					if(_customDropParameters.accelerator) trans.duration = (trans.duration * _customDropParameters.accelerator);

					var distance = (trans.y - objectImage.getHeight()) - objectImage.getY();
					if(!_customDropParameters.callbackDistanceLimit || _customDropParameters.callbackDistanceLimit <= distance) {
						if(_customDropParameters.callback) trans.callback = function() { objectLanded(_customDropParameters.callback) };
					}
				}
				objectImage.transitionTo(trans);
			}
		}
	});

	//Drag move event
	objectImage.on('dragmove', function() {
		var dropDetails = containingScreen.GetDropDetails(sender);
		if(_objectShrunk && !dropDetails.dropInContainer) growObject();
		if(!_objectShrunk && dropDetails.dropInContainer) shrinkObject();
		if(_moveEvent) _moveEvent();
	});

	var objectLanded = function(customLandedFunc) {
		if(customLandedFunc) customLandedFunc();
		if(_hasArrow) showArrow();
	};

	var growObject = function() {
		var grow = function(obj) {
			var newWidth = obj.getWidth() * 1.3;
			var newHeight = obj.getHeight() * 1.3;

			obj.setX(obj.getX() - ((newWidth - obj.getWidth()) / 2))
			obj.setY(obj.getY() - ((newHeight - obj.getHeight()) / 2))
			obj.setWidth(newWidth)
			obj.setHeight(newHeight)
		};

		if(_objectShrunk) {
			_objectShrunk = false;

			grow(objectImage, true);
			grow(_arrow);
			objectName.setFontSize(11);
			tooltipBackground.setWidth(objectName.getWidth() + 20);
			tooltipBackground.setHeight(objectName.getHeight() + 14);

			redraw();
		}
	};

	var shrinkObject = function(callback) {
		var shrink = function(obj) {
			var newWidth = obj.getWidth() / 1.3;
			var newHeight = obj.getHeight() / 1.3;

			obj.setX(obj.getX() - ((newWidth - obj.getWidth()) / 2))
			obj.setY(obj.getY() - ((newHeight - obj.getHeight()) / 2))
			obj.setWidth(newWidth)
			obj.setHeight(newHeight)
		};

		if(!_objectShrunk) {
			_objectShrunk = true;

			shrink(objectImage, true);
			shrink(_arrow);
			objectName.setFontSize(8);
			tooltipBackground.setWidth(objectName.getWidth() + 20);
			tooltipBackground.setHeight(objectName.getHeight() + 14);

			redraw();
		}
	};

	this.GetObjectDimensions = function() {
		return {
			x: objectImage.getX(),
			y: objectImage.getY(),
			width: objectImage.getWidth(),
			height: objectImage.getHeight(),
			isInStorage: storedIn != null
		};
	};


	//Hack to identify oven
	this.IsStoredInOven = function() {
		return storedIn && storedIn.isOven;
	};

	this.SetImage = function(imageName) {
		objectImage.setImage(resourceManager.getImage(imageName));
		redraw();
	};

	this.SetObjectX = function(posx) {
		objectImage.setX(posx);
	};

	this.SetObjectY = function(posy) {
		objectImage.setY(posy);
	};

	this.SetObjectWidth = function(width) {
		objectImage.setWidth(width);
	};

	this.SetObjectHeight = function(height) {
		objectImage.setHeight(height);
	};

	this.SetDragStartEvent = function(func) {
		_dragStartEvent = func;
	};

	this.SetDropEndEvent = function(func) {
		_dropEndEvent = func;
	};

	this.SetClickEvent = function(func) {
		_clickEvent = func;
	};

	this.SetOffset = function(x, y) {
		objectImage.setOffset(x, y);
	};

	this.SetCustomDragBounds = function(func) {
		objectImage.setDragBoundFunc(func);
	};

	this.ResetDragBounds = function() {
		objectImage.setDragBoundFunc(defaultDragBounds);
	};

	this.SetRotation = function(deg) {
		objectImage.rotate(deg);
		redraw();
	};

	this.SetMoveEvent = function(func) {
		_moveEvent = func;
	};

	this.SetNoneStorageDropEvent = function(func) {
		_noneStorageDropEvent = func;
	};

	this.SetFriendlyName = function(friendlyName) {
		objectName.setText(friendlyName);
		redraw();
	};

	this.GetFriendlyName = function() {
		return objectName.getText();
	};

	this.SetCustomDropParameters = function(parameters) {
		_customDropParameters = parameters;
	};

	this.GetId = function() {
		return objectImage.getId();
	};

	this.SetIsDraggable = function(isDraggable) {
		objectImage.setDraggable(isDraggable);
	};

	this.SetHasHoverState = function(state) {
		objectImage.simulate("mouseout");
		hasHoverState = state;
	};

	this.GetObjectToAddToLayer = function() {
		return group;
	};

	this.Relocate = function(location, callback) {
		if(location.smooth) {
			objectImage.transitionTo({
				x: location.x - (!location.exact ? (location.offsetX || (objectImage.getWidth() / 2)) : 0),
				y: location.y - (!location.exact ? (location.offsetY || (objectImage.getHeight() / 2)) : 0),
				duration: 0.3,
				callback: function() {
					objectLanded();
					if(callback) callback();
				}
			});
		} else {
			objectImage.setX(location.x - (!location.exact ? (location.offsetX || (objectImage.getWidth() / 2)) : 0));
			objectImage.setY(location.y - (!location.exact ? (location.offsetY || (objectImage.getHeight() / 2)) : 0));
			redraw();
			if(callback) callback();
		}
	};

	this.ResetHitRegion = function() {
		hitRegion = {
			x: 0,
			y: 0,
			width: objectImage.getWidth(),
			height: objectImage.getHeight()
		};
		objectImage.setDrawHitFunc(function(canvas) {
			var context = canvas.getContext();
			context.beginPath();
			context.rect(0, 0, objectImage.getWidth(), objectImage.getHeight());
			context.closePath();
			canvas.fillStroke(this);
  		});
	};

	this.AlterHitRegion = function(location) {
		hitRegion = location;
		objectImage.setDrawHitFunc(function(canvas) {
			var context = canvas.getContext();
			context.beginPath();
			context.rect(location.x, location.y, location.width, location.height);
			context.closePath();
			canvas.fillStroke(this);
  		});
	};

	this.ForceGravity = function() {
		objectImage.simulate("dragmove");
		objectImage.simulate("dragend");
	};

	this.SetObjectName = function(newObjName) {
		objectName.setText(newObjName);
	};

	this.ShowNotification = function(message) {
		var notificationGroup = new Kinetic.Group();
    	var message = new Kinetic.Text({
         	text: message,
	        fontFamily: 'Arial',
	        textFill: "#363636",
	        fontSize: 12
		});
		var notificationBackground = new Kinetic.Rect({
			fill: "rgba(255,255,255,0.7)",
			width: message.getWidth() + 20,
			height: message.getHeight() + 14,
	        cornerRadius: 10
		});
		notificationGroup.add(notificationBackground);
		notificationGroup.add(message);

		var xPos = (objectImage.getX() + (objectImage.getWidth() / 2))  - (message.getWidth() / 2);
		xPos = xPos < 0 ? 10 : xPos;
		xPos = (xPos + message.getWidth()) > 1023 ? (xPos - ((xPos + message.getWidth()) - 1023)) - 10 : xPos;

		message.setX(xPos);
		message.setY((objectImage.getY() + hitRegion.y) - 20 - message.getHeight());

		notificationBackground.setX(message.getX() - 10);
		notificationBackground.setY(message.getY() - 8);

    	objectImage.getLayer().add(notificationGroup);

		notificationGroup.transitionTo({
			opacity: 0,
			duration: 3,
			y: notificationGroup.getY() - 20,
			callback: function() {
				notificationGroup.remove();
				delete notificationGroup;
				delete message;
				delete notificationBackground;
			}
		});
    };

 	this.DisplayArrow = function() {
 		if(containingScreen.InGuidedMode) {
	 		if(!_hasArrow) {
	 			_hasArrow = true;
		 		showArrow();
		 		if(storedIn) storedIn.SetHasArrowForStoredItem(this.GetId(), true);
	 		}
	 	}
 	};

 	this.RemoveArrow = function() {
 		if(_hasArrow) {
	 		_hasArrow = false;
	 		_arrow.hide();
	 		_arrowTransition.stop();
	 		if(storedIn) storedIn.SetHasArrowForStoredItem(this.GetId(), false);
	 	}
 	};

 	this.IsStored = function() {
 		return storedIn != null;
 	};

 	var showArrow = function() {
 		if(_hasArrow) {
			_arrow.setX(objectImage.getX() + (objectImage.getWidth() / 2) - (_arrow.getWidth() / 2));
			_arrow.setY(objectImage.getY() - (_arrow.getHeight() * 1.3));
			_arrow.show();
			initializeArrow();
		}
 	};

 	var hideArrow = function() {
 		if(_hasArrow) {
	 		_arrow.hide();
	 		_arrowTransition.stop();
	 	}
 	};

 	var showObjectName = function() {
 		tooltipBackground.setWidth(objectName.getWidth() + 20);
		tooltipBackground.setHeight(objectName.getHeight() + 14);
		tooltip.setX(objectImage.getX() + (objectImage.getWidth() / 2) - ((tooltipBackground.getWidth() - 20) / 2));
		tooltip.setY((objectImage.getY() + hitRegion.y) - tooltipBackground.getHeight() - 5);
 		tooltip.show();
 		redraw();
 	};

 	var hideObjectName = function() {
 		tooltip.hide();
 		redraw();
 	};

 	var initializeArrow = function() {
		var moveUp = function() {
			_arrowTransition = _arrow.transitionTo({
				y: objectImage.getY() - (_arrow.getHeight() * 1.3),
				duration: 1,
				easing: "ease-in-out",
				callback: function() {
					if(_arrow) moveDown();
				}
			});
		};

		var moveDown = function() {
			_arrowTransition = _arrow.transitionTo({
				y: objectImage.getY() - _arrow.getHeight(),
				duration: 1,
				easing: "ease-in-out",
				callback: function() {
					if(_arrow) moveUp();
				}
			});
		};

		moveDown();
	};

	var calculateDropTransition = function(theScreen) {
		var baseLine = objectImage.getY() + objectImage.getHeight();
		var dropStopPoint = theScreen.GetDropStopPoint(objectImage.getX(), baseLine, objectImage.getWidth());
		var distance = (dropStopPoint - objectImage.getHeight()) - objectImage.getY();
		distance = distance <= 0 ? -distance : distance;
		var dropDuration = Math.sqrt(distance) / 10;
		return {
			y: dropStopPoint - objectImage.getHeight(),
			easing: 'bounce-ease-out',
			duration: dropDuration,
			callback: function() {
				objectLanded();
			}
		};
	};

	var redraw = function() {
		if(group.isVisible()) {
			group.getLayer().draw();
		}
	};
};