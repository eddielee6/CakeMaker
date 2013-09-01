KitchenScreen = function() {

	this.InGuidedMode = true;

	var sender = this;

	var _kitchenHasLoaded = false;

	var _layer = new Kinetic.Layer({
        id: "kitchenScreen"
    });

    var _controlLayer = new Kinetic.Layer({
    	id: "controlLayer"
    });

    var draggableObjects = new Array();
    var getDraggableObjectById = function(id) {
    	for (var i = 0; i < draggableObjects.length; i++) {
    		if(draggableObjects[i].GetId() == id) return draggableObjects[i];
    	};
    };

    var counterGravityLines = [
    	{
			start: {
				x: 0,
				y: 480
			},
			end: {
				x: 390,
				y: 480
			},
			tolerance: 40
		},
		{
			start: {
				x: 505,
				y: 480
			},
			end: {
				x: 637,
				y: 480
			},
			tolerance: 40
		},
		{
			start: {
				x: 730,
				y: 480
			},
			end: {
				x: canvasManager.GetOptimalSize().width,
				y: 480
			},
			tolerance: 40
		},
    ];

	var background = new Kinetic.Image({
		x: 0,
		y: 0,
		image: resourceManager.getImage("kitchenWall"),
		width: 1023,
		height: 768
	});
	_layer.add(background);

	var worksurface = new Kinetic.Image({
		x: 0,
		y: 438,
		image: resourceManager.getImage("worksurface"),
		width: 1023,
		height: 210.5
	});
	_layer.add(worksurface);

	var _blackboard = new Blackboard(591, 80);
	_layer.add(_blackboard.GetGroup());

	var _oven = new Oven(365, 511);
	_layer.add(_oven.GetGroup());
	_layer.add(_oven.GetArrow());

	var _hob = new Hob(365.5, 441);
	_layer.add(_hob.GetGroup());

	var _sink = new Sink(632.5, 405);
	_layer.add(_sink.GetGroup());

	var _topShelf = new Shelf(0, 70);
	_layer.add(_topShelf.GetGroup());

	var _middleShelf = new Shelf(0, 155);
	_layer.add(_middleShelf.GetGroup());

	var _bottomShelf = new Shelf(0, 240);
	_layer.add(_bottomShelf.GetGroup());

	var _cupboard3 = new Cupboard(this, 246.5, 511, "right");
	_layer.add(_cupboard3.GetGroup());
	_layer.add(_cupboard3.GetArrow());

	var _cupboard1 = new Cupboard(this, 8, 511, "left");
	_layer.add(_cupboard1.GetGroup());
	_layer.add(_cupboard1.GetArrow());

	var _cupboard2 = new Cupboard(this, 127, 511, "right");
	_layer.add(_cupboard2.GetGroup());
	_layer.add(_cupboard2.GetArrow());

	var _drawer3 = new Drawer(this, 633.5, 613);
	_layer.add(_drawer3.GetGroup());
	_layer.add(_drawer3.GetArrow());

	var _drawer2 = new Drawer(this, 633.5, 579);
	_layer.add(_drawer2.GetGroup());
	_layer.add(_drawer2.GetArrow());

	var _drawer1 = new Drawer(this, 633.5, 544.5);
	_layer.add(_drawer1.GetGroup());
	_layer.add(_drawer1.GetArrow());

	var _fridge = new Cupboard(this, 511.5, 511, "right", true);
	_layer.add(_fridge.GetGroup());
	_layer.add(_fridge.GetArrow());

	var _cupboard5 = new Cupboard(this, 777.5, 511, "left");
	_layer.add(_cupboard5.GetGroup());
	_layer.add(_cupboard5.GetArrow());

	var _cupboard6 = new Cupboard(this, 896.5, 511, "right");
	_layer.add(_cupboard6.GetGroup());
	_layer.add(_cupboard6.GetArrow());

	var _blankDrawer = new Kinetic.Image({
		x: 633.5,
		y: 510,
		image: resourceManager.getImage("blank-drawer"),
		width: 144,
		height: 35.5
	});
	_layer.add(_blankDrawer);

	var _worksurfaceEdge = new Kinetic.Image({
		x: 0,
		y: 504,
		image: resourceManager.getImage("worksurface-edge"),
		width: 1023,
		height: 10.5
	});
	_layer.add(_worksurfaceEdge);

	var resetZoomButton = new Kinetic.Image({
		x: 943,
		y: 16,
		image: resourceManager.getImage("zoom-out"),
		width: 64,
		height: 64,
		visible: false
	});
	_controlLayer.add(resetZoomButton);

	this.CupboardZIndexFix = function() {
		_cupboard3.BringToTop();
		_cupboard1.BringToTop();
		_cupboard2.BringToTop();
		_drawer3.BringToTop();
		_drawer2.BringToTop();
		_drawer1.BringToTop();
		_fridge.BringToTop();
		_cupboard5.BringToTop();
		_cupboard6.BringToTop();
		_worksurfaceEdge.moveToTop();
		_cupboard3.GetArrow().moveToTop();
		_cupboard1.GetArrow().moveToTop();
		_cupboard2.GetArrow().moveToTop();
		_drawer3.GetArrow().moveToTop();
		_drawer2.GetArrow().moveToTop();
		_drawer1.GetArrow().moveToTop();
		_fridge.GetArrow().moveToTop();
		_cupboard5.GetArrow().moveToTop();
		_cupboard6.GetArrow().moveToTop();

		for (var i = 0; i < draggableObjects.length; i++) {
			if(!draggableObjects[i].IsStored()) draggableObjects[i].GetObjectToAddToLayer().moveToTop();
		};
	}
	//Top shelf
	draggableObjects.push(new DraggableObject(this, "selfRaisingFlour", "self-raising-flour", 33.5, 55, 60, 70, "Self Raising Flour"));
	draggableObjects.push(new DraggableObject(this, "plainFlour", "plain-flour", 34, 54.5, 140, 70, "Plain Flour"));
	draggableObjects.push(new DraggableObject(this, "muscovadoSugar", "muscovado-sugar", 34, 48.5, 215, 70, "Muscovado Sugar"));
	draggableObjects.push(new DraggableObject(this, "casterSugar", "caster-sugar", 31, 48, 300, 70, "Caster Sugar"));

	//Middle shelf
	draggableObjects.push(new DraggableObject(this, "coffeejar", "coffee-jar", 33, 60.5, 55, 155, "Coffee"));
	draggableObjects.push(new DraggableObject(this, "bicarbonateOfSoda", "bicarbonate-of-soda", 28.5, 35, 125, 155, "Bicarbonate Of Soda"));
	draggableObjects.push(new DraggableObject(this, "cocoa", "cocoa", 30, 38.5, 200, 155, "Cocoa Powder"));
	draggableObjects.push(new DraggableObject(this, "chocolate", "chocolate", 80.5, 35, 260, 155, "Chocolate"));

	//On Counter top
	draggableObjects.push(new DraggableObject(this, "scales", "scales-whole", 56.5, 58, 120, 450, "Scales"));
	draggableObjects.push(new DraggableObject(this, "cloth", "cloth", 38, 32, 915, 470, "Cleaning Cloth"));

	//In Fridge
	draggableObjects.push(new DraggableObject(this, "buttermilk", "buttermilk", 22.5, 54, 515, 530, "Buttermilk"));
	draggableObjects.push(new DraggableObject(this, "butter", "butter", 49, 35, 535, 530, "Butter"));
	draggableObjects.push(new DraggableObject(this, "eggBox", "egg-box", 55, 27, 575, 530, "Egg Box"));

	//In cupboards
	draggableObjects.push(new DraggableObject(this, "caketin", "cake-tin-normal", 60.5, 42, 40, 530, "Cake Tin"));
	draggableObjects.push(new DraggableObject(this, "bigBowl", "big-bowl-normal", 71, 45, 155, 530, "Big Bowl"));
	draggableObjects.push(new DraggableObject(this, "smallBowl", "small-bowl-normal", 50.5, 33, 285, 530, "Small Bowl"));
	draggableObjects.push(new DraggableObject(this, "jug", "jug-normal", 56.5, 45.5, 805, 530, "Measuring Jug"));
	draggableObjects.push(new DraggableObject(this, "saucepan", "saucepan-normal", 94.5, 43, 915, 530, "Saucepan"));

	//In Drawers
	draggableObjects.push(new DraggableObject(this, "tablespoon", "tablespoon-normal", 63, 9.5, 650, 545, "Tablespoon"));
	draggableObjects.push(new DraggableObject(this, "knife", "knife-normal", 52, 20, 700, 545, "Knife"));
	draggableObjects.push(new DraggableObject(this, "woodenSpoon", "wooden-spoon", 74.5, 18.5, 665, 580, "Wooden Spoon"));
	draggableObjects.push(new DraggableObject(this, "whisk", "whisk", 64, 19.5, 670, 614, "Whisk"));
	

	for (var i = 0; i < draggableObjects.length; i++) {
		_layer.add(draggableObjects[i].GetObjectToAddToLayer());
	};

	var updateInterval = setInterval(function() {
    	_oven.UpdateOvenTime();
    }, 5000);
	
	this.GetControlLayer = function() {
		return _controlLayer;
	};

	this.GetLayer = function() {
		return _layer;
	};

	resetZoomButton.on("click tap", function() {
		sender.ResetZoom();
	});
	resetZoomButton.on("mouseover", function() {
		document.body.style.cursor = "pointer";
		resetZoomButton.setShadow({
			color: '#FFFF00',
			blur: 20
	    });
	    _controlLayer.draw();
	});
	resetZoomButton.on("mouseout", function() {
		document.body.style.cursor = "default";
		resetZoomButton.setShadow({
			color: 'transparent'
	    });
	    _controlLayer.draw();
	});

	this.ZoomOnOven = function() {
		_layer.transitionTo({
			x: -1229,
   			y: -1900,
			scale: { x: 4, y: 4 },
   			duration: 0.8,
   			easing: 'back-ease-out',
   			callback: function() {
   				resetZoomButton.show();
   				_controlLayer.draw();
   				_layer.on('dblclick dbltap', function(evt) {
   					evt.cancelBubble = true;
					sender.ResetZoom();
		        });

		        _blackboard.SubtaskCompleted("preheatOven", 0);
		  	}
		});
	};

	var zoomOnObject = function(object, zoomOutCallback) {
		var objectDimensions = object.GetObjectDimensions();
		_layer.transitionTo({
			x: -(((objectDimensions.x * 4) - ((objectDimensions.width * 4) / 2) * 4)),
   			y: -(((objectDimensions.y * 4) - ((objectDimensions.height * 4) / 2) * 4)),
			scale: { x: 4, y: 4 },
   			duration: 0.8,
   		 	easing: 'back-ease-out',
   			callback: function() {
   				resetZoomButton.show();
   				_controlLayer.draw();
   				_layer.on('dblclick dbltap', function(evt) {
   					if(zoomOutCallback) zoomOutCallback();
   					evt.cancelBubble = true;
					sender.ResetZoom();
		        });
		  	}
		});
	};

	this.HobStateChanged = function(turnedOn) {
		if(turnedOn) {
			var saucepan = getDraggableObjectById("saucepan");
			if(_blackboard.IsTaskComplete("prepareChocMix")) {
				_blackboard.SubtaskCompleted("meltChocMix", 0);
				if(saucepan.data.onHob) {
					_blackboard.SubtaskCompleted("meltChocMix", 1);
				}
			}

			if(saucepan.data.onHob) {
				saucepan.data.cookFunction();
			}
		} else {
			if(_blackboard.IsSubtaskComplete("meltChocMix", 2)) {
				_blackboard.SubtaskCompleted("meltChocMix", 3);
			}
		}
	};

	this.OvenStateChanged = function(turnedOn, temperature, isOpen) {
		var caketin = getDraggableObjectById("caketin");

		if(turnedOn) {
			if(_blackboard.IsTaskComplete("butterCakeTin")) {
				_blackboard.SubtaskCompleted("preheatOven", 1);
			}
		}

		if(temperature == 160) {
			if(_blackboard.IsTaskComplete("butterCakeTin")) {
				_blackboard.SubtaskCompleted("preheatOven", 2);
			}
		}

		if(caketin.IsStoredInOven() && turnedOn && temperature == 160 && !isOpen) {
			if(caketin.data.hasCakeMix) {

				if(_blackboard.IsSubtaskComplete("cookCake", 0) && !_blackboard.IsSubtaskComplete("cookCake", 1)) {
					_blackboard.SubtaskCompleted("cookCake", 1);
				}

				caketin.ShowNotification("Cooking...");
				_oven.Disable();

				setTimeout(function() {
					caketin.ShowNotification("Cake cooked");
					_oven.Enable();
					caketin.data.hasCakeMix = false;
					caketin.DisplayArrow();
					caketin.data.hasCake = true;
					caketin.SetImage("cake-tin-cake");
				}, 5000);
			}
		}
	};

	this.SetGuidedMode = function(guidedMode) {
		this.InGuidedMode = guidedMode;

		if(!this.InGuidedMode) {
			_blackboard.Disable();

			for (var i = 0; i < draggableObjects.length; i++) {
				draggableObjects[i].RemoveArrow();
			};
		}
	};

	this.ResetZoom = function() {
		_layer.transitionTo({
			x: 0,
   			y: 0,
			scale: { x: 1, y: 1 },
   			duration: 0.8,
   			easing: 'back-ease-out',
		});

		//Hack because zoomout callback is not passed to zoomout button
		smallBowl.IsZoomedOn = false;
		bigBowl.IsZoomedOn = false;

		resetZoomButton.hide();
		_controlLayer.draw();
	};

	this.GetDropStopPoint = function(posX, posY, width) {
		if(willLandOnGravityLine(_topShelf.GetGravityLine(), posX, posY, width)) return _topShelf.GetGravityLine().start.y;
		if(willLandOnGravityLine(_middleShelf.GetGravityLine(), posX, posY, width)) return _middleShelf.GetGravityLine().start.y; 
		if(willLandOnGravityLine(_bottomShelf.GetGravityLine(), posX, posY, width)) return _bottomShelf.GetGravityLine().start.y; 
		for (var i = 0; i < counterGravityLines.length; i++) {
			if(willLandOnGravityLine(counterGravityLines[i], posX, posY, width)) return counterGravityLines[i].start.y;
		};
		return 700; //Floor
	};

	var willLandOnGravityLine = function(gravityLine, posX, posY, width) {
		if(posX + (width * 0.5) < gravityLine.start.x || posX + (width * 0.5) > gravityLine.end.x) return false;
		if(posY - gravityLine.tolerance > gravityLine.start.y) return false;
		return true;
	};

	this.GetDropDetails = function(object) {
		var dimentions = object.GetObjectDimensions();
		if(_cupboard1.IsOpen() && this.IsDropInBounds(_cupboard1.GetDropBounds(), dimentions)) return {dropInContainer: true, container: _cupboard1, transitionTo: _cupboard1.GetShelfLevel()};
		if(_cupboard2.IsOpen() && this.IsDropInBounds(_cupboard2.GetDropBounds(), dimentions)) return {dropInContainer: true, container: _cupboard2, transitionTo: _cupboard2.GetShelfLevel()};
		if(_cupboard3.IsOpen() && this.IsDropInBounds(_cupboard3.GetDropBounds(), dimentions)) return {dropInContainer: true, container: _cupboard3, transitionTo: _cupboard3.GetShelfLevel()};
		if(_fridge.IsOpen() && this.IsDropInBounds(_fridge.GetDropBounds(), dimentions)) return {dropInContainer: true, container: _fridge, transitionTo: _fridge.GetShelfLevel()};
		if(_drawer1.IsOpen() && this.IsDropInBounds(_drawer1.GetDropBounds(), dimentions)) return {dropInContainer: true, container: _drawer1, transitionTo: _drawer1.GetShelfLevel()};
		if(_drawer2.IsOpen() && this.IsDropInBounds(_drawer2.GetDropBounds(), dimentions)) return {dropInContainer: true, container: _drawer2, transitionTo: _drawer2.GetShelfLevel()};
		if(_drawer3.IsOpen() && this.IsDropInBounds(_drawer3.GetDropBounds(), dimentions)) return {dropInContainer: true, container: _drawer3, transitionTo: _drawer3.GetShelfLevel()};
		if(_cupboard5.IsOpen() && this.IsDropInBounds(_cupboard5.GetDropBounds(), dimentions)) return {dropInContainer: true, container: _cupboard5, transitionTo: _cupboard5.GetShelfLevel()};
		if(_cupboard6.IsOpen() && this.IsDropInBounds(_cupboard6.GetDropBounds(), dimentions)) return {dropInContainer: true, container: _cupboard6, transitionTo: _cupboard6.GetShelfLevel()};
		if(object.GetId() == 'caketin') {
			if(_oven.IsOpen() && this.IsDropInBounds(_oven.GetDropBounds(), dimentions)) {
				return {
					dropInContainer: true,
					container: _oven,
					transitionTo: _oven.GetShelfLevel()
				};
			}
		}
		return {dropInContainer: false};
	};

	this.IsDropInBounds = function(target, object) {
		if(object.y < target.topLeft.y) return false;
		if(object.y + object.height > target.bottomLeft.y) return false;
		if(object.x + object.width > target.topRight.x) return false;
		if(object.x < target.topLeft.x) return false;
		return true;
	};

	var doObjectsCollide = function(object, target) {
		if(object.isInStorage || target.isInStorage) return false;
 		if(object.y + object.height < target.y + (target.height * 0.2)) return false;
		if(object.y > target.y + (target.height * 0.8)) return false;
		if(object.x > target.x + (target.width * 0.8)) return false;
		if(object.x + object.width < target.x + (target.width * 0.2)) return false;
		return true;
	};

	var forceGravity = function() {
		for (var i = 0; i < draggableObjects.length; i++) {
			draggableObjects[i].ForceGravity();
		};
	};

	var deleteDraggableObject = function(obj) {
		obj.GetObjectToAddToLayer().hide();
		obj.GetObjectToAddToLayer().remove();
		delete obj;
		_layer.draw();
	};

	var cleanIfHitsSink = function(object, callback) {
		if(doObjectsCollide(object.GetObjectDimensions(),	_sink.GetSinkDropDimentions())) {
			if(_sink.IsSinkFull()) {
				audioManager.Play("washingUp");
				object.Relocate(_sink.GetCleanedDropLocation());
				object.ShowNotification((!object.data.isScalesBowl ? object.GetFriendlyName() : "Scales") + " cleaned");
				if(callback) callback();
			}
		}
	};

	var measureIfHitsScales = function(object, amount, bowlImageName, collidesWith, customFunction, onCreateFunction, dragStartEvent) {
		var scales = getDraggableObjectById("scales");
		if(doObjectsCollide(object.GetObjectDimensions(), scales.GetObjectDimensions())) {
			if(!scales.data.inUse) {
				scales.data.inUse = true;
				scales.ShowNotification("Measured " + amount + " of " + object.GetFriendlyName());
				var xPos = scales.GetObjectDimensions().x - object.GetObjectDimensions().width - Math.floor((Math.random()*40)+10);
				xPos = xPos < 50 ? scales.GetObjectDimensions().x + scales.GetObjectDimensions().width + Math.floor((Math.random()*80)+40) : xPos;
				object.Relocate({
					x: xPos,
					y: scales.GetObjectDimensions().y - (object.GetObjectDimensions().height / 2)
				});

				scales.SetImage("scales-nobowl-weight");

				scales.AlterHitRegion({
					x: 0,
					y: 21,
					width: scales.GetObjectDimensions().width,
					height: scales.GetObjectDimensions().height - 21
				});

				var measuredItem = new DraggableObject(sender, "measured"+object.GetId(), bowlImageName, 56.5, 21, scales.GetObjectDimensions().x, scales.GetObjectDimensions().y, object.GetFriendlyName() + " (" + amount +")");
				measuredItem.data.isScalesBowl = true;
				measuredItem.data.isOnScales = true;
				measuredItem.data.itemType = object.GetId();
				scales.data.bowl = measuredItem;

				measuredItem.SetDragStartEvent(function() {
					measuredItem.data.isOnScales = false;
					scales.SetImage("scales-nobowl-empty");
				});
				measuredItem.SetDropEndEvent(function() {
					if(doObjectsCollide(measuredItem.GetObjectDimensions(), scales.GetObjectDimensions()) && !scales.data.dragging) {
						measuredItem.data.isOnScales = true;
						scales.SetImage("scales-nobowl-weight");
						measuredItem.Relocate({
							x: scales.GetObjectDimensions().x,
							y: scales.GetObjectDimensions().y,
							exact: true
						});
						return true;
					}

					if(customFunction) {
						if(doObjectsCollide(measuredItem.GetObjectDimensions(), collidesWith.GetObjectDimensions())) {
							if(customFunction()) {
								resetScales(measuredItem);				
							}
						}
					}

					cleanIfHitsSink(measuredItem, function() {
						resetScales(measuredItem);
					});
				});
				_layer.add(measuredItem.GetObjectToAddToLayer());

				if(onCreateFunction) {
					if(onCreateFunction()) {
						measuredItem.DisplayArrow();
					}
				}

				if(dragStartEvent) {
					measuredItem.SetDragStartEvent(function() {
						dragStartEvent();
					});
				}
			}
		}

		var resetScales = function(measuredItem) {
			scales.data.inUse = false;
			scales.ResetHitRegion();
			scales.SetImage("scales-whole");
			deleteDraggableObject(measuredItem);
			scales.data.bowl = null;
		};
	};

	//Define Required Tasks
	_blackboard.AddTask("butterCakeTin", "Using a knife butter the cake tin", null, new Array(
		{
			description: "Get the cake tin out of the cupboard",
			completeCallback: function() {
				getDraggableObjectById("caketin").RemoveArrow();
				getDraggableObjectById("butter").DisplayArrow();
			},
			calculated: function() {
				return !getDraggableObjectById("caketin").IsStored();
			}
		},
		{
			description: "Get the butter out of the fridge",
			completeCallback: function() {
				getDraggableObjectById("knife").DisplayArrow();
				getDraggableObjectById("butter").RemoveArrow();
			},
			calculated: function() {
				return !getDraggableObjectById("butter").IsStored() && _blackboard.IsSubtaskComplete("butterCakeTin", 0);
			}
		},
		{
			description: "Get the knife out of the drawer",
			completeCallback: function() {
				getDraggableObjectById("knife").RemoveArrow();
				getDraggableObjectById("butter").DisplayArrow();
			},
			calculated: function() {
				return !getDraggableObjectById("knife").IsStored() && _blackboard.IsSubtaskComplete("butterCakeTin", 1);
			}
		},
		{
			description: "Put butter on the knife",
			completeCallback: function() {
				getDraggableObjectById("butter").RemoveArrow();
				getDraggableObjectById("caketin").DisplayArrow();
			},
			calculated: function() {
				return getDraggableObjectById("knife").data.isButtered && _blackboard.IsSubtaskComplete("butterCakeTin", 2)
			}
		},
		{
			description: "Use the buttered knife to butter the cake tin",
			completeCallback: function() {
				getDraggableObjectById("caketin").RemoveArrow();

			},
			calculated: function() {
				return getDraggableObjectById("caketin").data.isButtered && _blackboard.IsSubtaskComplete("butterCakeTin", 3)
			}
		}
	));
	_blackboard.AddTask("preheatOven", "Preheat the oven to 160°C", null, new Array(
		{
			description: "Double click/tap the oven clock to zoom in",
			completeCallback: function() {
				if(_blackboard.IsTaskComplete("preheatOven")) {
					getDraggableObjectById("saucepan").DisplayArrow();
				}
			}
		},
		{
			description: "Turn the oven on",
			completeCallback: function() {
				if(_blackboard.IsTaskComplete("preheatOven")) {
					getDraggableObjectById("saucepan").DisplayArrow();
				}
			},
			calculated: function() {
				return _oven.GetOvenStatus().turnedOn && _blackboard.IsTaskComplete("butterCakeTin")
			}
		},
		{
			description: "Set the temperature to 160°C" ,
			completeCallback: function() {
				if(_blackboard.IsTaskComplete("preheatOven")) {
					getDraggableObjectById("saucepan").DisplayArrow();
				}
			},
			calculated: function() {
				return _oven.GetOvenStatus().temperature == 160 && _blackboard.IsTaskComplete("butterCakeTin")
			}
		}
	));
	_blackboard.AddTask("prepareChocMix", "Prepare chocolate mixture", new Array("butterCakeTin", "preheatOven"), new Array(
		{
			description: "Get the saucepan out of the cupboard",
			completeCallback: function() {
				var scales = getDraggableObjectById("scales");
				getDraggableObjectById("saucepan").RemoveArrow();
				getDraggableObjectById("chocolate").DisplayArrow();

				if(scales.data.bowl && scales.data.bowl.data.itemType == "chocolate") {
					scales.data.bowl.DisplayArrow();
					getDraggableObjectById("chocolate").RemoveArrow();
				}
				else if(getDraggableObjectById("saucepan").data.hasChocolate) {
					getDraggableObjectById("chocolate").RemoveArrow();
				}
			},
			calculated: function() {
				return (!getDraggableObjectById("saucepan").IsStored()) || saucepan.data.hasChocMix || bigBowl.data.hasChocMix || bigBowl.data.hasUltimateMix;
			}
		},
		{
			description: "Use the scales to measure out 200g of chocolate",
			completeCallback: function() {
				getDraggableObjectById("chocolate").RemoveArrow();
				getDraggableObjectById("scales").RemoveArrow();
			},
			calculated: function() {
				var scales = getDraggableObjectById("scales");
				return ((scales.data.bowl && scales.data.bowl.data.itemType == "chocolate") || getDraggableObjectById("saucepan").data.hasChocolate && _blackboard.IsSubtaskComplete("prepareChocMix", 0)) || saucepan.data.hasChocMix || bigBowl.data.hasChocMix || bigBowl.data.hasUltimateMix;
			}
		},
		{
			description: "Put the measured chocolate into the saucepan",
			completeCallback: function() {
				getDraggableObjectById("saucepan").RemoveArrow();
				getDraggableObjectById("butter").DisplayArrow();
			},
			calculated: function() {
				return (getDraggableObjectById("saucepan").data.hasChocolate && _blackboard.IsSubtaskComplete("prepareChocMix", 1)) || saucepan.data.hasChocMix || bigBowl.data.hasChocMix || bigBowl.data.hasUltimateMix;
			}
		},
		{ 
			description: "Measure out 200g of butter and put into the saucepan",
			completeCallback: function() {
				getDraggableObjectById("butter").RemoveArrow();
				getDraggableObjectById("jug").DisplayArrow();
			},
			calculated: function() {
				return (getDraggableObjectById("saucepan").data.hasButter && _blackboard.IsSubtaskComplete("prepareChocMix", 2)) || saucepan.data.hasChocMix || bigBowl.data.hasChocMix || bigBowl.data.hasUltimateMix;
			}
		},
		{
			description: "Use the sink to fill the jug with 125ml of water",
			completeCallback: function() {
				getDraggableObjectById("jug").RemoveArrow();
				getDraggableObjectById("tablespoon").DisplayArrow();
			},
			calculated: function() {
				return ((getDraggableObjectById("jug").data.hasWater || getDraggableObjectById("saucepan").data.hasCoffee) && _blackboard.IsSubtaskComplete("prepareChocMix", 3)) || saucepan.data.hasChocMix || bigBowl.data.hasChocMix || bigBowl.data.hasUltimateMix;
			}
		},
		{
			description: "Place 1tbsp of coffee into the jug",
			completeCallback: function() {
				getDraggableObjectById("tablespoon").RemoveArrow();
				getDraggableObjectById("jug").DisplayArrow();
			},
			calculated: function() {
				return ((getDraggableObjectById("jug").data.hasCoffee || getDraggableObjectById("saucepan").data.hasCoffee) && _blackboard.IsSubtaskComplete("prepareChocMix", 4)) || saucepan.data.hasChocMix || bigBowl.data.hasChocMix || bigBowl.data.hasUltimateMix;
			}
		},
		{
			description: "Pour coffee into the saucepan",
			completeCallback: function() {
				getDraggableObjectById("saucepan").RemoveArrow();
				getDraggableObjectById("jug").RemoveArrow();
			},
			calculated: function() {
				return (getDraggableObjectById("saucepan").data.hasCoffee && _blackboard.IsSubtaskComplete("prepareChocMix", 5)) || saucepan.data.hasChocMix || bigBowl.data.hasChocMix || bigBowl.data.hasUltimateMix;
			}
		}
	));
	_blackboard.AddTask("meltChocMix", "Melt chocolate mixture", new Array("butterCakeTin", "preheatOven", "prepareChocMix"), new Array(
		{
			description: "Click/Tap to turn on the bottom right hotplate",
			completeCallback: function() {
				var saucepan = getDraggableObjectById("saucepan");
				if(!saucepan.data.onHob) {
					getDraggableObjectById("saucepan").DisplayArrow();
				}
			},
			calculated: function() {
				var saucepan = getDraggableObjectById("saucepan");
				return (_hob.IsOn()) || saucepan.data.hasChocMix || bigBowl.data.hasChocMix || bigBowl.data.hasUltimateMix;
			}
		},
		{
			description: "Place the saucepan onto the hob",
			completeCallback: function() {
				getDraggableObjectById("saucepan").RemoveArrow();
			},
			calculated: function() {
				var saucepan = getDraggableObjectById("saucepan");
				return (_hob.IsOn() && saucepan.data.onHob) || saucepan.data.hasChocMix || bigBowl.data.hasChocMix || bigBowl.data.hasUltimateMix;
			}
		},
		{
			description: "When melted remove the saucepan from the hob",
			completeCallback: function() {

			},
			calculated: function() {
				var saucepan = getDraggableObjectById("saucepan");
				return (!saucepan.data.onHob && saucepan.data.hasChocMix) || bigBowl.data.hasChocMix || bigBowl.data.hasUltimateMix;
			}
		},
		{
			description: "Turn off the hob",
			completeCallback: function() {
				getDraggableObjectById("selfRaisingFlour").DisplayArrow();

				var bigBowl = getDraggableObjectById("bigBowl");
				var scales = getDraggableObjectById("scales");

				if(bigBowl.data.hasSelfRaisingFlour || bigBowl.data.fullMixture) {
					getDraggableObjectById("selfRaisingFlour").RemoveArrow();
				}

				if(!bigBowl.data.hasSelfRaisingFlour && (scales.data.bowl && scales.data.bowl.data.itemType == "selfRaisingFlour")) {
					getDraggableObjectById("selfRaisingFlour").RemoveArrow();
					getDraggableObjectById("selfRaisingFlour").data.movedForTask = true;
					scales.data.bowl.DisplayArrow();
				}
			},
			calculated: function() {
				var saucepan = getDraggableObjectById("saucepan");
				return (!_hob.IsOn() && saucepan.data.hasChocMix) || bigBowl.data.hasChocMix || bigBowl.data.hasUltimateMix;
			}
		}
	));
	_blackboard.AddTask("putInBigBowl", "Place in order into the big bowl...", new Array("butterCakeTin", "preheatOven", "prepareChocMix", "meltChocMix"), new Array(
		{
			description: "85g of Self Rasing Flour",
			completeCallback: function() {
				getDraggableObjectById("selfRaisingFlour").RemoveArrow();
				getDraggableObjectById("plainFlour").DisplayArrow();

				var bigBowl = getDraggableObjectById("bigBowl");
				var scales = getDraggableObjectById("scales");

				if(bigBowl.data.hasPlainFlour || bigBowl.data.fullMixture) {
					getDraggableObjectById("plainFlour").RemoveArrow();
				}

				if(!bigBowl.data.hasPlainFlour && (scales.data.bowl && scales.data.bowl.data.itemType == "plainFlour")) {
					getDraggableObjectById("plainFlour").RemoveArrow();
					getDraggableObjectById("plainFlour").data.movedForTask = true;
					scales.data.bowl.DisplayArrow();
				}
			},
			calculated: function() {
				var bigBowl = getDraggableObjectById("bigBowl");
				return bigBowl.data.hasSelfRaisingFlour || bigBowl.data.fullMixture || bigBowl.data.hasUltimateMix;
			}
		},
		{
			description: "85g of Plain Flour",
			completeCallback: function() {
				getDraggableObjectById("plainFlour").RemoveArrow();
				getDraggableObjectById("tablespoon").DisplayArrow();

				var bigBowl = getDraggableObjectById("bigBowl");
				var tablespoon = getDraggableObjectById("tablespoon");

				if(bigBowl.data.hasBicarbonateOfSoda || bigBowl.data.fullMixture) {
					getDraggableObjectById("tablespoon").RemoveArrow();
				}

				if(!bigBowl.data.hasBicarbonateOfSoda && tablespoon.data.hasBicarbonateOfSoda) {
					tablespoon.data.movedForTask = true;
				}
			},
			calculated: function() {
				var bigBowl = getDraggableObjectById("bigBowl");
				return bigBowl.data.hasPlainFlour || bigBowl.data.fullMixture || bigBowl.data.hasUltimateMix;
			}
		},
		{
			description: "1/4 of a tablespoon of Bicarbonate of Soda",
			completeCallback: function() {
				getDraggableObjectById("tablespoon").RemoveArrow();
				getDraggableObjectById("muscovadoSugar").DisplayArrow();

				if(bigBowl.data.hasMuscovadoSugar || bigBowl.data.fullMixture) {
					getDraggableObjectById("muscovadoSugar").RemoveArrow();
				}

				if(!bigBowl.data.hasMuscovadoSugar && (scales.data.bowl && scales.data.bowl.data.itemType == "muscovadoSugar")) {
					getDraggableObjectById("muscovadoSugar").RemoveArrow();
					getDraggableObjectById("muscovadoSugar").data.movedForTask = true;
					scales.data.bowl.DisplayArrow();
				}
			},
			calculated: function() {
				var bigBowl = getDraggableObjectById("bigBowl");
				return bigBowl.data.hasBicarbonateOfSoda || bigBowl.data.fullMixture || bigBowl.data.hasUltimateMix;
			}
		},
		{
			description: "200g of Muscovado Sugar",
			completeCallback: function() {
				getDraggableObjectById("muscovadoSugar").RemoveArrow();
				getDraggableObjectById("casterSugar").DisplayArrow();

				if(bigBowl.data.hasCasterSugar || bigBowl.data.fullMixture) {
					getDraggableObjectById("casterSugar").RemoveArrow();
				}

				if(!bigBowl.data.hasCasterSugar && (scales.data.bowl && scales.data.bowl.data.itemType == "casterSugar")) {
					getDraggableObjectById("casterSugar").RemoveArrow();
					getDraggableObjectById("casterSugar").data.movedForTask = true;
					scales.data.bowl.DisplayArrow();
				}
			},
			calculated: function() {
				var bigBowl = getDraggableObjectById("bigBowl");
				return bigBowl.data.hasMuscovadoSugar || bigBowl.data.fullMixture || bigBowl.data.hasUltimateMix;
			}
		},
		{
			description: "200g of Golden Caster Sugar",
			completeCallback: function() {
				getDraggableObjectById("casterSugar").RemoveArrow();
				getDraggableObjectById("cocoa").DisplayArrow();

				if(bigBowl.data.hasCocoa || bigBowl.data.fullMixture) {
					getDraggableObjectById("cocoa").RemoveArrow();
				}

				if(!bigBowl.data.hasCocoa && (scales.data.bowl && scales.data.bowl.data.itemType == "cocoa")) {
					getDraggableObjectById("cocoa").RemoveArrow();
					getDraggableObjectById("cocoa").data.movedForTask = true;
					scales.data.bowl.DisplayArrow();
				}
			},
			calculated: function() {
				var bigBowl = getDraggableObjectById("bigBowl");
				return bigBowl.data.hasCasterSugar || bigBowl.data.fullMixture || bigBowl.data.hasUltimateMix;
			}
		},
		{
			description: "25g of Cocoa Powder",
			completeCallback: function() {
				getDraggableObjectById("cocoa").RemoveArrow();
				getDraggableObjectById("woodenSpoon").DisplayArrow();

				if(bigBowl.data.fullMixture) {
					getDraggableObjectById("woodenSpoon").RemoveArrow();
				}
			},
			calculated: function() {
				var bigBowl = getDraggableObjectById("bigBowl");
				return bigBowl.data.hasCocoa || bigBowl.data.fullMixture || bigBowl.data.hasUltimateMix;
			}
		}
	));
	_blackboard.AddTask("mixBigBowl", "Mix the ingredients", new Array("butterCakeTin", "preheatOven", "prepareChocMix", "meltChocMix", "putInBigBowl"), new Array(
		{
			description: "Get out the wooden spoon",
			completeCallback: function() {
				getDraggableObjectById("woodenSpoon").DisplayArrow();
			},
			calculated: function() {
				return !getDraggableObjectById("woodenSpoon").IsStored() || bigBowl.data.fullMixture || bigBowl.data.hasUltimateMix;
			}
		},
		{
			description: "Mix the ingredients in the big bowl",
			completeCallback: function() {
				getDraggableObjectById("woodenSpoon").RemoveArrow();
				getDraggableObjectById("eggBox").DisplayArrow();

				var smallBowl = getDraggableObjectById("smallBowl");
				if((smallBowl.data.numberOfEggs && smallBowl.data.numberOfEggs == 3) || smallBowl.data.fullMixture) {
					getDraggableObjectById("eggBox").RemoveArrow();
				}
			},
			calculated: function() {
				return bigBowl.data.fullMixture || bigBowl.data.hasUltimateMix;
			}
		}
	));
	_blackboard.AddTask("eggMixture", "Create the egg mixture", new Array("butterCakeTin", "preheatOven", "prepareChocMix", "meltChocMix", "putInBigBowl", "mixBigBowl"), new Array(
		{
			description: "Break 3 eggs into the Small Bowl",
			completeCallback: function() {
				var tablespoon = getDraggableObjectById("tablespoon");
				tablespoon.DisplayArrow();

				if((smallBowl.data.spoonsOfMilk && smallBowl.data.spoonsOfMilk == 3) || smallBowl.data.fullMixture) {
					tablespoon.RemoveArrow();
				}
			},
			calculated: function() {
				return (smallBowl.data.numberOfEggs && smallBowl.data.numberOfEggs == 3) || smallBowl.data.fullMixture || bigBowl.data.hasEggMix || bigBowl.data.hasUltimateMix;
			}
		},
		{
			description: "Put 3 tablespoons of Buttermilk into the Big Bowl",
			completeCallback: function() {
				var smallBowl = getDraggableObjectById("smallBowl");
				var tablespoon = getDraggableObjectById("tablespoon");
				var whisk = getDraggableObjectById("whisk");
				smallBowl.RemoveArrow();
				tablespoon.RemoveArrow();

				whisk.DisplayArrow();

				if(smallBowl.data.fullMixture) {
					whisk.RemoveArrow();
				}
			},
			calculated: function() {
				return (smallBowl.data.spoonsOfMilk && smallBowl.data.spoonsOfMilk == 3) || smallBowl.data.fullMixture || bigBowl.data.hasEggMix || bigBowl.data.hasUltimateMix;
			}
		},
		{
			description: "Beat the egg mixture using the Whisk",
			completeCallback: function() {
				smallBowl.DisplayArrow();
			},
			calculated: function() {
				return smallBowl.data.fullMixture || bigBowl.data.hasEggMix || bigBowl.data.hasUltimateMix;
			}
		}
	));
	_blackboard.AddTask("cakeMixture", "Create the cake mixture", new Array("butterCakeTin", "preheatOven", "prepareChocMix", "meltChocMix", "putInBigBowl", "mixBigBowl", "eggMixture"), new Array(
		{
			description: "Put the egg mixture into the Big Bowl",
			completeCallback: function() {

			},
			calculated: function() {
				return bigBowl.data.hasEggMix || bigBowl.data.hasUltimateMix;
			}
		},
		{
			description: "Put the melted chocolate mixture into the big bowl",
			completeCallback: function() {

			},
			calculated: function() {
				return bigBowl.data.hasChocMix || bigBowl.data.hasUltimateMix;
			}
		},
		{
			description: "Mix the ingredients using the wooden spoon",
			completeCallback: function() {

			},
			calculated: function() {
				return bigBowl.data.hasUltimateMix;
			}
		}
	));
	_blackboard.AddTask("cookCake", "Cook the cake", new Array("butterCakeTin", "preheatOven", "prepareChocMix", "meltChocMix", "putInBigBowl", "mixBigBowl", "eggMixture", "cakeMixture"), new Array(
		{
			description: "Put cake mixture into the buttered cake tin",
			completeCallback: function() {

			},
			calculated: function() {
				return caketin.data.hasCakeMix;
			}
		},
		{
			description: "Put put cake tin into the oven",
			completeCallback: function() {

			},
			calculated: function() {
				return caketin.data.hasCakeMix && caketin.IsStoredInOven();
			}
		},
		{
			description: "When cooked remove cake tin from the oven",
			completeCallback: function() {

			},
			calculated: function() {
				return caketin.data.hasCake && !caketin.IsStored()
			}
		},
		{
			description: "Remove the cake from the cake tin",
			completeCallback: function() {

			},
			calculated: function() {

			}
		}
	));
	_blackboard.AddTask("allDone", "You made the perfect cake!", null, new Array({description:"Well done!"}));

	//Define Object Events
	var scales = getDraggableObjectById("scales");
	scales.SetDragStartEvent(function() {
		scales.data.dragging = true;
		if(scales.data.bowl && scales.data.bowl.data.isOnScales) {
			scales.data.bowl.data.isOnScales = false;
			scales.SetImage("scales-nobowl-empty");
			scales.data.bowl.ForceGravity();
		}
	});
	scales.SetDropEndEvent(function() {
		scales.data.dragging = false;
	});

	var knife = getDraggableObjectById("knife");
	knife.SetMoveEvent(function() {
		var knife = getDraggableObjectById("knife");
		var butter = getDraggableObjectById("butter");
		var caketin = getDraggableObjectById("caketin");

		if(_blackboard.IsSubtaskComplete("butterCakeTin", 1)) {
			_blackboard.SubtaskCompleted("butterCakeTin", 2);
		}

		if(doObjectsCollide(knife.GetObjectDimensions(), butter.GetObjectDimensions()) && !knife.data.isButtered) {
			knife.data.isButtered = true;
			knife.SetImage("knife-butter");
			
			knife.ShowNotification("Knife buttered");

			if(_blackboard.IsSubtaskComplete("butterCakeTin", 2)) {
				_blackboard.SubtaskCompleted("butterCakeTin", 3);
			}
		}

		if(doObjectsCollide(knife.GetObjectDimensions(), caketin.GetObjectDimensions())) {
			if(knife.data.isButtered && !caketin.data.isButtered) {
				caketin.data.isButtered = true;
				caketin.SetImage("cake-tin-butter");
				caketin.ShowNotification("Caketin buttered");
				
				if(_blackboard.IsSubtaskComplete("butterCakeTin", 3)) {
					_blackboard.SubtaskCompleted("butterCakeTin", 4);
				}
			}
		}
	});
	knife.SetDropEndEvent(function() {
		var knife = getDraggableObjectById("knife");
		cleanIfHitsSink(knife, function() {
			knife.SetImage("knife-normal");
			knife.data.isButtered = false;
		});
	});

	var caketin = getDraggableObjectById("caketin");
	caketin.DisplayArrow();
	caketin.SetDragStartEvent(function() {
		if(_blackboard.IsSubtaskComplete("cookCake", 0) && !_blackboard.IsSubtaskComplete("cookCake", 1)) {
			caketin.RemoveArrow();
		}
	});
	caketin.SetClickEvent(function() {
		if(caketin.data.hasCake && !caketin.IsStored()) {
			caketin.data.hasCake = false;
			caketin.data.hasCakeMix = false;
			caketin.data.isButtered = false;
			caketin.SetImage("cake-tin-normal");
			caketin.RemoveArrow();

			var posX = Math.floor((Math.random()*40)+10);
			var cake = new DraggableObject(sender, "cake", "cake", 60.5, 42, caketin.GetObjectDimensions().x + caketin.GetObjectDimensions().width + posX, caketin.GetObjectDimensions().y, "Chocolate Cake")
			_layer.add(cake.GetObjectToAddToLayer());
			cake.ForceGravity();

			cake.ShowNotification("You made the perfect cake!");

			_blackboard.SubtaskCompleted("cookCake", 3);

			// setTimeout(function() {
			// 	alert("Complete!");
			// }, 3000);
		}
	});
	caketin.SetNoneStorageDropEvent(function() {
		var caketin = getDraggableObjectById("caketin");
		var butter = getDraggableObjectById("butter");

		_blackboard.SubtaskCompleted("butterCakeTin", 0);

		if(caketin.data.hasCake) {
			_blackboard.SubtaskCompleted("cookCake", 2);
		}
	});
	caketin.SetDropEndEvent(function() {
		var caketin = getDraggableObjectById("caketin");
		cleanIfHitsSink(caketin, function() {
			caketin.SetImage("cake-tin-normal");
			caketin.data.isButtered = false;
		});
	});

	var chocolate = getDraggableObjectById("chocolate");
	chocolate.SetMoveEvent(function() {
		var chocolate = getDraggableObjectById("chocolate");
		var scales = getDraggableObjectById("scales");
		if(_blackboard.IsSubtaskComplete("prepareChocMix", 0) && !_blackboard.IsSubtaskComplete("prepareChocMix", 1) && !chocolate.data.movedForTask) {
			chocolate.data.movedForTask = true;
			chocolate.RemoveArrow();
			scales.DisplayArrow();
		}
	});
	chocolate.SetDropEndEvent(function() {
		var chocolate = getDraggableObjectById("chocolate");
		var saucepan = getDraggableObjectById("saucepan");
		var scales = getDraggableObjectById("scales");
		measureIfHitsScales(chocolate, "200g", "scales-bowl-choc", saucepan, function() {
			if(!saucepan.data.hasChocolate) {
				if(_blackboard.IsSubtaskComplete("prepareChocMix", 1) && !_blackboard.IsSubtaskComplete("prepareChocMix", 2)) {
					_blackboard.SubtaskCompleted("prepareChocMix", 2);
					saucepan.RemoveArrow();
				}

				saucepan.SetImage("saucepan-choc");
				saucepan.data.hasChocolate = true;
				saucepan.ShowNotification("Added 200g of Chocolate");
				return true;
			}
		}, function() {
			if(_blackboard.IsSubtaskComplete("prepareChocMix", 0) && !_blackboard.IsSubtaskComplete("prepareChocMix", 1)) {
				scales.RemoveArrow();
				_blackboard.SubtaskCompleted("prepareChocMix", 1);
				return true;
			}
		}, function() {
			if(_blackboard.IsSubtaskComplete("prepareChocMix", 1) && !_blackboard.IsSubtaskComplete("prepareChocMix", 2)) {
				scales.data.bowl.RemoveArrow();
				saucepan.DisplayArrow();
			}
		});
	});

	var butter = getDraggableObjectById("butter");
	butter.SetDragStartEvent(function() {
		var butter = getDraggableObjectById("butter");
		var scales = getDraggableObjectById("scales");
		if(_blackboard.IsSubtaskComplete("prepareChocMix", 2) && !_blackboard.IsSubtaskComplete("prepareChocMix", 3) && !butter.data.movedForTask) {
			butter.data.movedForTask = true;
			butter.RemoveArrow();
			scales.DisplayArrow();
		}
	});
	butter.SetDropEndEvent(function() {
		var butter = getDraggableObjectById("butter");
		var saucepan = getDraggableObjectById("saucepan");
		var scales = getDraggableObjectById("scales");
		measureIfHitsScales(butter, "200g", "scales-bowl-butter", saucepan, function() {
			if(_blackboard.IsSubtaskComplete("prepareChocMix", 2) && !_blackboard.IsSubtaskComplete("prepareChocMix", 3)) {
				saucepan.RemoveArrow();
			}

			if(saucepan.data.hasChocolate && !saucepan.data.hasButter) {
				saucepan.SetImage("saucepan-choc-butter");
				saucepan.data.hasButter = true;
				saucepan.ShowNotification("Added 200g of Butter");

				if(_blackboard.IsSubtaskComplete("prepareChocMix", 2) && !_blackboard.IsSubtaskComplete("prepareChocMix", 3)) {
					_blackboard.SubtaskCompleted("prepareChocMix", 3);
				}
				return true;
			}
		}, function() {
			if(_blackboard.IsSubtaskComplete("prepareChocMix", 2) && !_blackboard.IsSubtaskComplete("prepareChocMix", 3)) {
				scales.RemoveArrow();
				return true;
			}
		}, function() {
			if(_blackboard.IsSubtaskComplete("prepareChocMix", 2) && !_blackboard.IsSubtaskComplete("prepareChocMix", 3)) {
				saucepan.DisplayArrow();
				scales.data.bowl.RemoveArrow();
			}
		});
	});
	butter.SetNoneStorageDropEvent(function() {
		var butter = getDraggableObjectById("butter");
		var knife = getDraggableObjectById("knife");

		if(_blackboard.IsSubtaskComplete("butterCakeTin", 0)) {
			_blackboard.SubtaskCompleted("butterCakeTin", 1);
		}
	});

	var jug = getDraggableObjectById("jug");
	jug.SetDragStartEvent(function() {
		var jug = getDraggableObjectById("jug");
		var saucepan = getDraggableObjectById("saucepan");
		if(_blackboard.IsSubtaskComplete("prepareChocMix", 5) && !_blackboard.IsSubtaskComplete("prepareChocMix", 6) && jug.data.hasCoffee) {
			jug.RemoveArrow();
			saucepan.DisplayArrow();
		}
	});
	jug.SetMoveEvent(function() {
		var jug = getDraggableObjectById("jug");
		if(doObjectsCollide(jug.GetObjectDimensions(), _sink.GetTapDropDimentions())) {
			if(!jug.data.hasWater) {
				jug.SetImage("jug-water");
				jug.data.hasWater = true;
				jug.ShowNotification("Filled measuring jug with water");

				if(_blackboard.IsSubtaskComplete("prepareChocMix", 3) && !_blackboard.IsSubtaskComplete("prepareChocMix", 4)) {
					_blackboard.SubtaskCompleted("prepareChocMix", 4);
				}
			}
		}
	});
	jug.SetDropEndEvent(function() {
		var jug = getDraggableObjectById("jug");
		var saucepan = getDraggableObjectById("saucepan");
		if(doObjectsCollide(jug.GetObjectDimensions(), saucepan.GetObjectDimensions())) {
			if(saucepan.data.hasChocolate && saucepan.data.hasButter && jug.data.hasWater && jug.data.hasCoffee) {
				jug.SetImage("jug-normal");
				jug.data.hasWater = false;
				jug.data.hasCoffee = false;

				saucepan.ShowNotification("Added coffee");

				saucepan.SetImage("saucepan-choc-butter-coffee");
				saucepan.data.hasCoffee = true;

				if(_blackboard.IsSubtaskComplete("prepareChocMix", 5) && !_blackboard.IsSubtaskComplete("prepareChocMix", 6)) {
					_blackboard.SubtaskCompleted("prepareChocMix", 6);
					saucepan.RemoveArrow();
				}
			}
		}

		cleanIfHitsSink(jug, function() {
			jug.SetImage("jug-normal");
			jug.data.hasWater = false;
			jug.data.hasCoffee = false;
		});
	});

	var tablespoon = getDraggableObjectById("tablespoon");
	tablespoon.SetMoveEvent(function() {
		var tablespoon = getDraggableObjectById("tablespoon");
		var coffeejar = getDraggableObjectById("coffeejar");
		var jug = getDraggableObjectById("jug");
		var buttermilk = getDraggableObjectById("buttermilk");
		var smallBowl = getDraggableObjectById("smallBowl");
		var bicarbonateOfSoda = getDraggableObjectById("bicarbonateOfSoda");
		var bigBowl = getDraggableObjectById("bigBowl");

		if(_blackboard.IsSubtaskComplete("prepareChocMix", 4) && !_blackboard.IsSubtaskComplete("prepareChocMix", 5) && !tablespoon.data.hasCoffee) {
			tablespoon.RemoveArrow();
			coffeejar.DisplayArrow();
		} else if(_blackboard.IsSubtaskComplete("prepareChocMix", 4) && !_blackboard.IsSubtaskComplete("prepareChocMix", 5) && tablespoon.data.hasCoffee) {
			tablespoon.RemoveArrow();
			jug.DisplayArrow();
			coffeejar.RemoveArrow();
		}

		if(_blackboard.IsSubtaskComplete("eggMixture", 0) && !_blackboard.IsSubtaskComplete("eggMixture", 1) && !tablespoon.data.movedForMilkTask) {
			tablespoon.data.movedForMilkTask = true;
			tablespoon.RemoveArrow();
			buttermilk.DisplayArrow();
		}

		if(_blackboard.IsSubtaskComplete("putInBigBowl", 1) && !_blackboard.IsSubtaskComplete("putInBigBowl", 2) && !tablespoon.data.movedForTask) {
			tablespoon.data.movedForTask = true;
			tablespoon.RemoveArrow();
			bicarbonateOfSoda.DisplayArrow();
		}

		//Add Bicarbonate of Soda to Big Bowl
		if(doObjectsCollide(tablespoon.GetObjectDimensions(), bicarbonateOfSoda.GetObjectDimensions())) {
			if(!tablespoon.data.holdingSomething) {
				if(_blackboard.IsSubtaskComplete("putInBigBowl", 1) && !_blackboard.IsSubtaskComplete("putInBigBowl", 2)) {
					bicarbonateOfSoda.RemoveArrow();
					bigBowl.DisplayArrow();
				}

				tablespoon.ShowNotification("Put Bicarbonate Of Soda onto tablespoon");
				tablespoon.SetImage("tablespoon-bicarb");
				tablespoon.data.hasBicarbonateOfSoda = true;
				tablespoon.data.holdingSomething = true;
			}
		}
		if(doObjectsCollide(tablespoon.GetObjectDimensions(), bigBowl.GetObjectDimensions())) {
			if(tablespoon.data.hasBicarbonateOfSoda && bigBowl.data.hasSelfRaisingFlour && bigBowl.data.hasPlainFlour && !bigBowl.data.hasBicarbonateOfSoda) {
				if(_blackboard.IsSubtaskComplete("putInBigBowl", 1) && !_blackboard.IsSubtaskComplete("putInBigBowl", 2)) {
					bigBowl.RemoveArrow();
					_blackboard.SubtaskCompleted("putInBigBowl", 2)
				}

				bigBowl.SetImage("big-bowl-bicarb");
				bigBowl.ShowNotification("Added Bicarbonate Of Soda");
				tablespoon.SetImage("tablespoon-normal");
				bigBowl.data.hasBicarbonateOfSoda = true;
				tablespoon.data.hasBicarbonateOfSoda = false;
				tablespoon.data.holdingSomething = false;
			}
		}

		//Add Coffee to Jug
		if(doObjectsCollide(tablespoon.GetObjectDimensions(), coffeejar.GetObjectDimensions())) {
			if(!tablespoon.data.holdingSomething) {
				tablespoon.ShowNotification("Put Coffee onto tablespoon");
				tablespoon.SetImage("tablespoon-coffee");
				tablespoon.data.hasCoffee = true;
				tablespoon.data.holdingSomething = true;

				if(_blackboard.IsSubtaskComplete("prepareChocMix", 5) && !_blackboard.IsSubtaskComplete("prepareChocMix", 6)) {
					jug.DisplayArrow();
				};
			}
		}
		if(doObjectsCollide(tablespoon.GetObjectDimensions(), jug.GetObjectDimensions())) {
			if(tablespoon.data.hasCoffee && jug.data.hasWater && !jug.data.hasCoffee) {
				jug.SetImage("jug-coffee");
				tablespoon.SetImage("tablespoon-normal");
				jug.ShowNotification("Added coffee");
				jug.data.hasCoffee = true;
				tablespoon.data.hasCoffee = false;
				tablespoon.data.holdingSomething = false;

				if(_blackboard.IsSubtaskComplete("prepareChocMix", 4) && !_blackboard.IsSubtaskComplete("prepareChocMix", 5)) {
					_blackboard.SubtaskCompleted("prepareChocMix", 5);
				}
			}
		}

		//Add milk to small bowl
		if(doObjectsCollide(tablespoon.GetObjectDimensions(), buttermilk.GetObjectDimensions())) {
			if(!tablespoon.data.holdingSomething) {
				tablespoon.ShowNotification("Put Buttermilk onto tablespoon");
				tablespoon.SetImage("tablespoon-milk");
				tablespoon.data.hasMilk = true;
				tablespoon.data.holdingSomething = true;

				if(_blackboard.IsSubtaskComplete("eggMixture", 0) && !_blackboard.IsSubtaskComplete("eggMixture", 1)) {
					buttermilk.RemoveArrow();
					smallBowl.DisplayArrow();
				}
			}
		}
		if(doObjectsCollide(tablespoon.GetObjectDimensions(), smallBowl.GetObjectDimensions())) {
			if((smallBowl.data.numberOfEggs && smallBowl.data.numberOfEggs == 3) && (!smallBowl.data.spoonsOfMilk || smallBowl.data.spoonsOfMilk < 3) && tablespoon.data.hasMilk) {
				smallBowl.data.spoonsOfMilk = !smallBowl.data.spoonsOfMilk ? 1 : smallBowl.data.spoonsOfMilk + 1;
				tablespoon.SetImage("tablespoon-normal");
				tablespoon.data.hasMilk = false;
				tablespoon.data.holdingSomething = false;
				smallBowl.SetImage("small-three-eggs-buttermilk-" + smallBowl.data.spoonsOfMilk);
				smallBowl.ShowNotification("Added 1 tablespoon of buttermilk");

				if(_blackboard.IsSubtaskComplete("eggMixture", 0) && !_blackboard.IsSubtaskComplete("eggMixture", 1) && smallBowl.data.spoonsOfMilk < 3) {
					tablespoon.data.movedForMilkTask = false;
					smallBowl.RemoveArrow();
					tablespoon.DisplayArrow();
				} else if(_blackboard.IsSubtaskComplete("eggMixture", 0) && !_blackboard.IsSubtaskComplete("eggMixture", 1) && smallBowl.data.spoonsOfMilk == 3) {
					smallBowl.RemoveArrow();
					_blackboard.SubtaskCompleted("eggMixture", 1);
				}
			}
		}
	});
	tablespoon.SetDropEndEvent(function() {
		var tablespoon = getDraggableObjectById("tablespoon");
		cleanIfHitsSink(tablespoon, function() {
			tablespoon.SetImage("tablespoon-normal");
			tablespoon.data.hasCoffee = false;
			tablespoon.data.hasMilk = false;
			tablespoon.data.hasBicarbonateOfSoda = false;
			tablespoon.data.holdingSomething = false;
		});
	});

	var saucepan = getDraggableObjectById("saucepan");
	saucepan.data.cookFunction = function() {
		var saucepan = getDraggableObjectById("saucepan");
		if(saucepan.data.hasChocolate && saucepan.data.hasButter && saucepan.data.hasCoffee && _hob.IsOn()) {
			saucepan.SetIsDraggable(false);
			saucepan.SetHasHoverState(false);
			setTimeout(function() {
				saucepan.data.hasChocolate = false;
				saucepan.data.hasButter = false;
				saucepan.data.hasCoffee = false;
				saucepan.data.hasChocMix = true;
				saucepan.SetImage("saucepan-melted-mix");

				saucepan.ShowNotification("Chocolate mixture melted");

				if(_blackboard.IsSubtaskComplete("meltChocMix", 1)) {
					saucepan.DisplayArrow();
					saucepan.data.removeArrowOnNextDrop = true;
				}
				
				saucepan.SetIsDraggable(true);
				saucepan.SetHasHoverState(true);
			}, 3000);
		}
	};
	saucepan.SetNoneStorageDropEvent(function() {
		var saucepan = getDraggableObjectById("saucepan");
		if(_blackboard.IsTaskComplete("preheatOven")) {
			_blackboard.SubtaskCompleted("prepareChocMix", 0);
		}

		if(saucepan.data.hasChocMix) {
			_blackboard.SubtaskCompleted("meltChocMix", 2);
		}
	});
	saucepan.SetDragStartEvent(function() {
		saucepan.data.onHob = false;

		if(_blackboard.IsSubtaskComplete("cakeMixture", 0) && !_blackboard.IsSubtaskComplete("cakeMixture", 1)) {
			saucepan.RemoveArrow();
			bigBowl.DisplayArrow();
		}
	});
	saucepan.SetDropEndEvent(function() {
		var saucepan = getDraggableObjectById("saucepan");
		var bigBowl = getDraggableObjectById("bigBowl");
		var woodenSpoon = getDraggableObjectById("woodenSpoon");

		cleanIfHitsSink(saucepan, function() {
			saucepan.SetImage("saucepan-normal");
			saucepan.data.hasChocolate = false;
			saucepan.data.hasButter = false;
			saucepan.data.hasCoffee = false;
			saucepan.data.hasChocMix = false;
		});

		if(doObjectsCollide(saucepan.GetObjectDimensions(), bigBowl.GetObjectDimensions())) {
			if(bigBowl.data.fullMixture && bigBowl.data.hasEggMix && saucepan.data.hasChocMix && !bigBowl.data.hasChocMix) {
				saucepan.data.hasChocMix = false;
				saucepan.SetImage("saucepan-normal");

				bigBowl.data.hasChocMix = true;
				bigBowl.SetImage("big-bowl-mixed-choc");

				if(_blackboard.IsSubtaskComplete("cakeMixture", 0) && !_blackboard.IsSubtaskComplete("cakeMixture", 1)) {
					_blackboard.SubtaskCompleted("cakeMixture", 1);
					bigBowl.RemoveArrow();
					woodenSpoon.DisplayArrow();
				}

				bigBowl.ShowNotification("Added chocolate mixture");
			}
		}

		if(doObjectsCollide(saucepan.GetObjectDimensions(), _hob.GetDropDimentions())) {
			saucepan.data.onHob = true;
			var location = _hob.GetHobLocation();
			location.offsetX = 24;
			location.offsetY = saucepan.GetObjectDimensions().height;
			location.smooth = true;
			saucepan.Relocate(location, function() {
				saucepan.data.cookFunction();
				_blackboard.SubtaskCompleted("meltChocMix", 1);
			});
			return true;
		}
	});

	var eggBox = getDraggableObjectById("eggBox");
	eggBox.data.availableEggs = new Array();
	eggBox.SetClickEvent(function() {
		var eggBox = getDraggableObjectById("eggBox");

		if(!eggBox.IsStored()) {
			var posX = Math.floor((Math.random()*40)+10);

			var newEgg = new DraggableObject(sender, "egg", "egg", 15.5, 19.5, eggBox.GetObjectDimensions().x + eggBox.GetObjectDimensions().width + posX, eggBox.GetObjectDimensions().y, "Egg")
			eggBox.data.availableEggs.push(newEgg);
			newEgg.SetCustomDropParameters({
				easing: 'ease-in',
				accelerator: '0.5',
				callbackDistanceLimit: 100,
				callback: function() {
					newEgg.SetImage("smashed-egg");
					newEgg.SetObjectX(newEgg.GetObjectDimensions().x - 6.25);
					newEgg.SetObjectY(newEgg.GetObjectDimensions().y - 2);
					newEgg.SetObjectWidth(28);
					newEgg.SetObjectHeight(21.5);
					newEgg.SetIsDraggable(false);
					newEgg.data.isCracked = true;
					newEgg.SetObjectName("Smashed Egg");

					audioManager.Play("eggSplat");

					_layer.draw();
				}
			});
			newEgg.SetDragStartEvent(function() {
				var smallBowl = getDraggableObjectById("smallBowl");
				if(_blackboard.IsTaskComplete("mixBigBowl") && !_blackboard.IsSubtaskComplete("eggMixture", 0) 
					&& (!smallBowl.data.numberOfEggs || smallBowl.data.numberOfEggs < 3)) {
					newEgg.RemoveArrow();
					smallBowl.DisplayArrow();
				}
			});
			newEgg.SetMoveEvent(function() {
				var smallBowl = getDraggableObjectById("smallBowl");
				if(!newEgg.data.isCracked) {
					if(doObjectsCollide(newEgg.GetObjectDimensions(), smallBowl.GetObjectDimensions())) {
						if(!newEgg.data.touchingSmallBowl) {
							newEgg.data.touchingSmallBowl = true;
							newEgg.data.bangedTimes = !newEgg.data.bangedTimes ? 1 : newEgg.data.bangedTimes + 1;
							audioManager.Play("hitMetal", true);
							if(newEgg.data.bangedTimes == 3) {
								newEgg.data.isCracked = true;
								newEgg.SetObjectX(newEgg.GetObjectDimensions().x - 6.25);
								newEgg.SetObjectY(newEgg.GetObjectDimensions().y - 2);
								newEgg.SetObjectWidth(28);
								newEgg.SetObjectHeight(21.5);
								newEgg.SetImage("smashed-egg");
							}
						}
					} else {
						newEgg.data.touchingSmallBowl = false;
					}
				}
			});

			newEgg.SetDropEndEvent(function() {
				if(newEgg.data.isCracked) {
					newEgg.SetIsDraggable(false);
					newEgg.SetClickEvent(function() {
						deleteDraggableObject(newEgg);
					});
				}

				var smallBowl = getDraggableObjectById("smallBowl");
				if(doObjectsCollide(newEgg.GetObjectDimensions(), smallBowl.GetObjectDimensions())) {
					if((!smallBowl.data.numberOfEggs || smallBowl.data.numberOfEggs < 3) && newEgg.data.isCracked) {
						smallBowl.data.numberOfEggs = !smallBowl.data.numberOfEggs ? 1 : smallBowl.data.numberOfEggs + 1;
						deleteDraggableObject(newEgg);
						smallBowl.SetImage("small-" + smallBowl.data.numberOfEggs + "-egg");

						if(_blackboard.IsTaskComplete("mixBigBowl") && !_blackboard.IsSubtaskComplete("eggMixture", 0)) {
							smallBowl.RemoveArrow();

							if(smallBowl.data.numberOfEggs == 3) {
								_blackboard.SubtaskCompleted("eggMixture", 0);

								for (var i = 0; i < eggBox.data.availableEggs.length; i++) {
									eggBox.data.availableEggs[i].RemoveArrow();
								};
							}
						}
					}
				}
			});

			_layer.add(newEgg.GetObjectToAddToLayer());

			if(_blackboard.IsTaskComplete("mixBigBowl") && !_blackboard.IsSubtaskComplete("eggMixture", 0) && (!smallBowl.data.numberOfEggs || smallBowl.data.numberOfEggs < 3)) {
				eggBox.RemoveArrow();
				newEgg.DisplayArrow();
			}

			newEgg.ForceGravity();
		}
	});

	var cloth = getDraggableObjectById("cloth");
	cloth.SetClickEvent(function() {
		_blackboard.PrintTaskDebugInfo();
	});
	cloth.SetMoveEvent(function() {
		var eggBox = getDraggableObjectById("eggBox");
		if(eggBox.data.availableEggs) {
			for (var i = 0; i < eggBox.data.availableEggs.length; i++) {
				if(doObjectsCollide(cloth.GetObjectDimensions(), eggBox.data.availableEggs[i].GetObjectDimensions()) && eggBox.data.availableEggs[i].data.isCracked) {
					cloth.ShowNotification("Cleaned up smashed egg");
					deleteDraggableObject(eggBox.data.availableEggs[i]);
					eggBox.data.availableEggs.splice(i, 1);
				}
			};
		}
	});

	var smallBowl = getDraggableObjectById("smallBowl");
	smallBowl.SetDragStartEvent(function() {
		var bigBowl = getDraggableObjectById("bigBowl");
		var smallBowl = getDraggableObjectById("smallBowl");
		if(_blackboard.IsTaskComplete("eggMixture") && !_blackboard.IsSubtaskComplete("cakeMixture", 0)) {
			smallBowl.RemoveArrow();
			bigBowl.DisplayArrow();
		}
	});
	smallBowl.SetDropEndEvent(function() {
		var smallBowl = getDraggableObjectById("smallBowl");
		var bigBowl = getDraggableObjectById("bigBowl");
		var saucepan = getDraggableObjectById("saucepan");
		cleanIfHitsSink(smallBowl, function() {
			smallBowl.SetImage("small-bowl-normal");
			smallBowl.data.beatTimes = 0;
			smallBowl.data.numberOfEggs = 0;
			smallBowl.data.spoonsOfMilk = 0;
			smallBowl.data.fullMixture = false;
		});

		if(doObjectsCollide(smallBowl.GetObjectDimensions(), bigBowl.GetObjectDimensions())) {
			if(bigBowl.data.fullMixture && smallBowl.data.fullMixture) {

				if(_blackboard.IsTaskComplete("eggMixture") && !_blackboard.IsSubtaskComplete("cakeMixture", 0)) {
					_blackboard.SubtaskCompleted("cakeMixture", 0);
					bigBowl.RemoveArrow();
					saucepan.DisplayArrow();
				}

				smallBowl.data.fullMixture = false;
				smallBowl.SetImage("small-bowl-normal");

				bigBowl.data.hasEggMix = true;
				bigBowl.SetImage("big-bowl-mixed-egg");

				bigBowl.ShowNotification("Added egg mixture");
			}
		}
	});

	var bigBowl = getDraggableObjectById("bigBowl");
	bigBowl.SetDragStartEvent(function() {
		var bigBowl = getDraggableObjectById("bigBowl");
		if(_blackboard.IsTaskComplete("cakeMixture") && !_blackboard.IsSubtaskComplete("cookCake", 0)) {
			bigBowl.RemoveArrow();
			getDraggableObjectById("caketin").DisplayArrow();
		}
	});
	bigBowl.SetDropEndEvent(function() {
		var bigBowl = getDraggableObjectById("bigBowl");
		var caketin = getDraggableObjectById("caketin");
		cleanIfHitsSink(bigBowl, function() {
			bigBowl.SetImage("big-bowl-normal");
			bigBowl.data.hasSelfRaisingFlour = false;
			bigBowl.data.hasPlainFlour = false;
			bigBowl.data.hasBicarbonateOfSoda = false;
			bigBowl.data.hasMuscovadoSugar = false;
			bigBowl.data.hasCasterSugar = false;
		});

		if(doObjectsCollide(bigBowl.GetObjectDimensions(), caketin.GetObjectDimensions())) {
			if(bigBowl.data.hasUltimateMix && caketin.data.isButtered) {
				bigBowl.SetImage("big-bowl-normal");
				bigBowl.data.hasUltimateMix = false;
				caketin.data.hasCakeMix = true;
				caketin.SetImage("cake-tin-mix");

				caketin.ShowNotification("Added cake mix");

				if(_blackboard.IsTaskComplete("cakeMixture") && !_blackboard.IsSubtaskComplete("cookCake", 0)) {
					_blackboard.SubtaskCompleted("cookCake", 0);
					caketin.RemoveArrow();
				}
			}
		}
	});

	var woodenSpoon = getDraggableObjectById("woodenSpoon");
	woodenSpoon.SetMoveEvent(function() {
		var woodenSpoon = getDraggableObjectById("woodenSpoon");
		var bigBowl = getDraggableObjectById("bigBowl");
		if(_blackboard.IsTaskComplete("putInBigBowl") && !_blackboard.IsSubtaskComplete("mixBigBowl", 0)) {
			_blackboard.IsSubtaskComplete("mixBigBowl", 0);
			woodenSpoon.RemoveArrow();
			bigBowl.DisplayArrow();
		}
	});
	woodenSpoon.SetDragStartEvent(function() {
		//Position upright
		if(woodenSpoon.data.rotation != 30) {
			woodenSpoon.SetOffset(32, 9.75);
			woodenSpoon.data.rotation = 30;
			woodenSpoon.SetRotation(30);
		}
	});
	woodenSpoon.SetDropEndEvent(function() {
		var woodenSpoon = getDraggableObjectById("woodenSpoon");
		var bigBowl = getDraggableObjectById("bigBowl");

		//Laydown
		if(woodenSpoon.data.rotation == 30) {
			woodenSpoon.data.rotation = 0;
			woodenSpoon.SetRotation(-30);
			woodenSpoon.SetOffset(0, 0);
		}

		if(woodenSpoon.data.playingBeat) {
			woodenSpoon.data.playingBeat = false;
			audioManager.Stop("mixBowl");
		}

		if((bigBowl.data.IsZoomedOn && bigBowl.data.fullMixture) 
			|| bigBowl.data.IsZoomedOn && bigBowl.data.hasUltimateMix) {
			sender.ResetZoom();
		}

		if(doObjectsCollide(woodenSpoon.GetObjectDimensions(), bigBowl.GetObjectDimensions())) {
			if(bigBowl.data.fullMixture && bigBowl.data.hasEggMix && bigBowl.data.hasChocMix) {

				if(_blackboard.IsSubtaskComplete("cakeMixture", 1) && !_blackboard.IsSubtaskComplete("cakeMixture", 2)) {
					bigBowl.RemoveArrow();
				}

				bigBowl.SetIsDraggable(false);
				bigBowl.SetHasHoverState(false);
				woodenSpoon.SetHasHoverState(false);

				woodenSpoon.SetMoveEvent(function() {
					if(doObjectsCollide(woodenSpoon.GetObjectDimensions(), bigBowl.GetObjectDimensions()) && bigBowl.data.IsZoomedOn) {
						bigBowl.data.beatTimes = !bigBowl.data.beatTimes ? 1 : bigBowl.data.beatTimes + 1;
						if(bigBowl.data.beatTimes > 100) {
							bigBowl.data.beatTimes = 0;

							bigBowl.data.fullMixture = false;
							bigBowl.data.hasEggMix = false;
							bigBowl.data.hasChocMix = false;

							bigBowl.data.hasUltimateMix = true;
							bigBowl.SetImage("big-bowl-mixed-full");

							bigBowl.ShowNotification("All ingredients have been mixed");

							if(_blackboard.IsSubtaskComplete("cakeMixture", 1) && !_blackboard.IsSubtaskComplete("cakeMixture", 2)) {
								_blackboard.SubtaskCompleted("cakeMixture", 2);
							}

							if(_blackboard.IsTaskComplete("cakeMixture") && !_blackboard.IsSubtaskComplete("cookCake", 0)) {
								getDraggableObjectById("bigBowl").DisplayArrow();
							}

							if(woodenSpoon.data.playingBeat) {
								woodenSpoon.data.playingBeat = false;
								audioManager.Stop("mixBowl");
							}

							bigBowl.SetIsDraggable(true);
							bigBowl.SetHasHoverState(true);
							woodenSpoon.SetHasHoverState(true);

							//Setup for next use...
							woodenSpoon.SetMoveEvent(null);
						} else {
							if(!woodenSpoon.data.playingBeat) {
								woodenSpoon.data.playingBeat = true;
								audioManager.LoopPlay("mixBowl");
							}
						}
					} else {
						if(woodenSpoon.data.playingBeat) {
							woodenSpoon.data.playingBeat = false;
							audioManager.Stop("mixBowl");
						}
					}
				});

				bigBowl.data.IsZoomedOn = true;
				zoomOnObject(bigBowl, function() {
					bigBowl.data.IsZoomedOn = false;
					bigBowl.SetIsDraggable(true);
					bigBowl.SetHasHoverState(true);
					woodenSpoon.SetHasHoverState(true);
					woodenSpoon.SetMoveEvent(null);
				});
			}

			if(bigBowl.data.hasSelfRaisingFlour && bigBowl.data.hasPlainFlour && bigBowl.data.hasBicarbonateOfSoda && bigBowl.data.hasMuscovadoSugar && bigBowl.data.hasCasterSugar && bigBowl.data.hasCocoa) {
				
				if(_blackboard.IsSubtaskComplete("mixBigBowl", 0) && !_blackboard.IsSubtaskComplete("mixBigBowl", 1)) {
					bigBowl.RemoveArrow();
				}

				bigBowl.SetIsDraggable(false);
				bigBowl.SetHasHoverState(false);
				woodenSpoon.SetHasHoverState(false);


				woodenSpoon.SetMoveEvent(function() {
					if(doObjectsCollide(woodenSpoon.GetObjectDimensions(), bigBowl.GetObjectDimensions()) && bigBowl.data.IsZoomedOn) {
						bigBowl.data.beatTimes = !bigBowl.data.beatTimes ? 1 : bigBowl.data.beatTimes + 1;
						if(bigBowl.data.beatTimes > 100) {
							bigBowl.data.beatTimes = 0;


							bigBowl.data.hasSelfRaisingFlour = false;
							bigBowl.data.hasPlainFlour = false;
							bigBowl.data.hasBicarbonateOfSoda = false;
							bigBowl.data.hasMuscovadoSugar = false;
							bigBowl.data.hasCasterSugar = false;
							bigBowl.data.hasCocoa = false;

							bigBowl.data.fullMixture = true;
							bigBowl.SetImage("big-bowl-mixed");

							bigBowl.ShowNotification("Ingredients have been mixed");

							if(_blackboard.IsSubtaskComplete("mixBigBowl", 0) && !_blackboard.IsSubtaskComplete("mixBigBowl", 1)) {
								_blackboard.SubtaskCompleted("mixBigBowl", 1);
							}

							if(woodenSpoon.data.playingBeat) {
								woodenSpoon.data.playingBeat = false;
								audioManager.Stop("mixBowl");
							}


							bigBowl.SetIsDraggable(true);
							bigBowl.SetHasHoverState(true);
							woodenSpoon.SetHasHoverState(true);

							//Setup for next use...
							woodenSpoon.SetMoveEvent(function() {
								var woodenSpoon = getDraggableObjectById("woodenSpoon");
								var bigBowl = getDraggableObjectById("bigBowl");
								if(_blackboard.IsSubtaskComplete("cakeMixture", 1) && !_blackboard.IsSubtaskComplete("cakeMixture", 2) && !woodenSpoon.data.shownArrowForUltimateMix) {
									woodenSpoon.data.shownArrowForUltimateMix = true;
									woodenSpoon.RemoveArrow();
									bigBowl.DisplayArrow();
								}
							});
						} else {
							if(!woodenSpoon.data.playingBeat) {
								woodenSpoon.data.playingBeat = true;
								audioManager.LoopPlay("mixBowl");
							}
						}
					} else {
						if(woodenSpoon.data.playingBeat) {
							woodenSpoon.data.playingBeat = false;
							audioManager.Stop("mixBowl");
						}
					}
				});


				bigBowl.data.IsZoomedOn = true;
				zoomOnObject(bigBowl, function() {
					bigBowl.data.IsZoomedOn = false;
					bigBowl.SetIsDraggable(true);
					bigBowl.SetHasHoverState(true);
					woodenSpoon.SetHasHoverState(true);
					

					//Setup for next use...
					woodenSpoon.SetMoveEvent(function() {
						var woodenSpoon = getDraggableObjectById("woodenSpoon");
						var bigBowl = getDraggableObjectById("bigBowl");
						if(_blackboard.IsSubtaskComplete("cakeMixture", 1) && !_blackboard.IsSubtaskComplete("cakeMixture", 2) && !woodenSpoon.data.shownArrowForUltimateMix) {
							woodenSpoon.data.shownArrowForUltimateMix = true;
							woodenSpoon.RemoveArrow();
							bigBowl.DisplayArrow();
						}
					});
				});
			}
		}

		cleanIfHitsSink(woodenSpoon);
	});

	var whisk = getDraggableObjectById("whisk");
	whisk.SetDragStartEvent(function() {
		//Position upright
		if(whisk.data.rotation != 30) {
			whisk.SetOffset(32, 9.75);
			whisk.data.rotation = 30;
			whisk.SetRotation(30);
		}

		if(_blackboard.IsSubtaskComplete("eggMixture", 1) && !_blackboard.IsSubtaskComplete("eggMixture", 2) && !smallBowl.data.shownArrowForEggBeat) {
			smallBowl.data.shownArrowForEggBeat = true;
			whisk.RemoveArrow();
			smallBowl.DisplayArrow();
		}
	});
	whisk.SetDropEndEvent(function() {
		var whisk = getDraggableObjectById("whisk");
		var smallBowl = getDraggableObjectById("smallBowl");

		//Sink
		cleanIfHitsSink(whisk);

		//Laydown
		if(whisk.data.rotation == 30) {
			whisk.data.rotation = 0;
			whisk.SetRotation(-30);
			whisk.SetOffset(0, 0);
		}

		if(whisk.data.playingBeat) {
			whisk.data.playingBeat = false;
			audioManager.Stop("eggBeat");
		}

		if(smallBowl.data.IsZoomedOn && smallBowl.data.fullMixture) {
			sender.ResetZoom();
		}

		if(doObjectsCollide(whisk.GetObjectDimensions(), smallBowl.GetObjectDimensions())) {
			if(smallBowl.data.numberOfEggs == 3 && smallBowl.data.spoonsOfMilk == 3) {

				if(_blackboard.IsSubtaskComplete("eggMixture", 1) && !_blackboard.IsSubtaskComplete("eggMixture", 2)) {
					smallBowl.RemoveArrow();
				}

				smallBowl.SetIsDraggable(false);
				smallBowl.SetHasHoverState(false);
				whisk.SetHasHoverState(false);

				whisk.SetMoveEvent(function() {
					if(doObjectsCollide(whisk.GetObjectDimensions(), smallBowl.GetObjectDimensions()) && smallBowl.data.IsZoomedOn) {
						smallBowl.data.beatTimes = !smallBowl.data.beatTimes ? 1 : smallBowl.data.beatTimes + 1;
						if(smallBowl.data.beatTimes > 100) {
							smallBowl.data.beatTimes = 0;
							smallBowl.data.numberOfEggs = 0;
							smallBowl.data.spoonsOfMilk = 0;
							smallBowl.data.fullMixture = true;
							smallBowl.SetImage("small-eggmix-beat");

							if(whisk.data.playingBeat) {
								whisk.data.playingBeat = false;
								audioManager.Stop("eggBeat");
							}

							smallBowl.ShowNotification("Egg mixture has been beaten");

							if(_blackboard.IsSubtaskComplete("eggMixture", 1) && !_blackboard.IsSubtaskComplete("eggMixture", 2)) {
								_blackboard.SubtaskCompleted("eggMixture", 2);
							}

							smallBowl.SetIsDraggable(true);
							smallBowl.SetHasHoverState(true);
							whisk.SetHasHoverState(true);
							whisk.SetMoveEvent(null);
						} else {
							if(!whisk.data.playingBeat) {
								whisk.data.playingBeat = true;
								audioManager.LoopPlay("eggBeat");
							}
						}
					} else {
						if(whisk.data.playingBeat) {
							whisk.data.playingBeat = false;
							audioManager.Stop("eggBeat");
						}
					}
				});

				smallBowl.data.IsZoomedOn = true;
				zoomOnObject(smallBowl, function() {
					smallBowl.data.IsZoomedOn = false;
					smallBowl.SetIsDraggable(true);
					smallBowl.SetHasHoverState(true);
					whisk.SetHasHoverState(true);
					whisk.SetMoveEvent(null);
				});
			}
		}
	});

	var selfRaisingFlour = getDraggableObjectById("selfRaisingFlour");
	selfRaisingFlour.SetMoveEvent(function() {
		var selfRaisingFlour = getDraggableObjectById("selfRaisingFlour");
		var scales = getDraggableObjectById("scales");
		if(_blackboard.IsTaskComplete("meltChocMix") && !_blackboard.IsSubtaskComplete("putInBigBowl", 0) && !selfRaisingFlour.data.movedForTask) {
			selfRaisingFlour.data.movedForTask = true;
			selfRaisingFlour.RemoveArrow();
			scales.DisplayArrow();
		}
	});
	selfRaisingFlour.SetDropEndEvent(function() {
		var selfRaisingFlour = getDraggableObjectById("selfRaisingFlour");
		var bigBowl = getDraggableObjectById("bigBowl");

		measureIfHitsScales(selfRaisingFlour, "85g", "scales-bowl-flour", bigBowl, function() {
			var bigBowl = getDraggableObjectById("bigBowl");
			if(!bigBowl.data.hasSelfRaisingFlour) {
				if(_blackboard.IsTaskComplete("meltChocMix") && !_blackboard.IsSubtaskComplete("putInBigBowl", 0)) {
					_blackboard.SubtaskCompleted("putInBigBowl", 0);
					bigBowl.RemoveArrow();
				}

				bigBowl.data.hasSelfRaisingFlour = true;
				bigBowl.SetImage("big-bowl-flour-1");
				bigBowl.ShowNotification("Added 85g of Self Raising Flour");
				return true;
			}
		}, function() {
			var scales = getDraggableObjectById("scales");
			if(_blackboard.IsTaskComplete("meltChocMix") && !_blackboard.IsSubtaskComplete("putInBigBowl", 0)) {
				scales.RemoveArrow();
				return true;
			}
		}, function() {
			var scales = getDraggableObjectById("scales");
			var bigBowl = getDraggableObjectById("bigBowl");
			if(_blackboard.IsTaskComplete("meltChocMix") && !_blackboard.IsSubtaskComplete("putInBigBowl", 0)) {
				scales.data.bowl.RemoveArrow();
				bigBowl.DisplayArrow();
			}
		});
	});

	var plainFlour = getDraggableObjectById("plainFlour");
	plainFlour.SetMoveEvent(function() {
		var plainFlour = getDraggableObjectById("plainFlour");
		var scales = getDraggableObjectById("scales");
		if(_blackboard.IsSubtaskComplete("putInBigBowl", 0) && !_blackboard.IsSubtaskComplete("putInBigBowl", 1) && !plainFlour.data.movedForTask) {
			plainFlour.data.movedForTask = true;
			plainFlour.RemoveArrow();
			scales.DisplayArrow();
		}
	});
	plainFlour.SetDropEndEvent(function() {
		var plainFlour = getDraggableObjectById("plainFlour");
		var bigBowl = getDraggableObjectById("bigBowl");

		measureIfHitsScales(plainFlour, "85g", "scales-bowl-flour", bigBowl, function() {
			if(bigBowl.data.hasSelfRaisingFlour && !bigBowl.data.hasPlainFlour) {
				if(_blackboard.IsSubtaskComplete("putInBigBowl", 0) && !_blackboard.IsSubtaskComplete("putInBigBowl", 1)) {
					_blackboard.SubtaskCompleted("putInBigBowl", 1);
					bigBowl.RemoveArrow();
				}

				bigBowl.data.hasPlainFlour = true;
				bigBowl.SetImage("big-bowl-flour-2");
				bigBowl.ShowNotification("Added 85g of Plain Flour");
				return true;
			}
		}, function() {
			var scales = getDraggableObjectById("scales");
			if(_blackboard.IsSubtaskComplete("putInBigBowl", 0) && !_blackboard.IsSubtaskComplete("putInBigBowl", 1)) {
				scales.RemoveArrow();
				return true;
			}
		}, function() {
			var scales = getDraggableObjectById("scales");
			var bigBowl = getDraggableObjectById("bigBowl");
			if(_blackboard.IsSubtaskComplete("putInBigBowl", 0) && !_blackboard.IsSubtaskComplete("putInBigBowl", 1)) {
				scales.data.bowl.RemoveArrow();
				bigBowl.DisplayArrow();
			}
		});
	});

	var muscovadoSugar = getDraggableObjectById("muscovadoSugar");
	muscovadoSugar.SetMoveEvent(function() {
		var muscovadoSugar = getDraggableObjectById("muscovadoSugar");
		var scales = getDraggableObjectById("scales");
		if(_blackboard.IsSubtaskComplete("putInBigBowl", 2) && !_blackboard.IsSubtaskComplete("putInBigBowl", 3) && !muscovadoSugar.data.movedForTask) {
			muscovadoSugar.data.movedForTask = true;
			muscovadoSugar.RemoveArrow();
			scales.DisplayArrow();
		}
	});
	muscovadoSugar.SetDropEndEvent(function() {
		var muscovadoSugar = getDraggableObjectById("muscovadoSugar");
		var bigBowl = getDraggableObjectById("bigBowl");

		measureIfHitsScales(muscovadoSugar, "200g", "scales-bowl-mus", bigBowl, function() {
			if(bigBowl.data.hasSelfRaisingFlour && bigBowl.data.hasPlainFlour && bigBowl.data.hasBicarbonateOfSoda && !bigBowl.data.hasMuscovadoSugar) {
				if(_blackboard.IsSubtaskComplete("putInBigBowl", 2) && !_blackboard.IsSubtaskComplete("putInBigBowl", 3)) {
					_blackboard.SubtaskCompleted("putInBigBowl", 3);
					bigBowl.RemoveArrow();
				}

				bigBowl.data.hasMuscovadoSugar = true;
				bigBowl.SetImage("big-bowl-mus");
				bigBowl.ShowNotification("Added 200g of Muscovado Sugar");
				return true;
			}
		}, function() {
			var scales = getDraggableObjectById("scales");
			if(_blackboard.IsSubtaskComplete("putInBigBowl", 2) && !_blackboard.IsSubtaskComplete("putInBigBowl", 3)) {
				scales.RemoveArrow();
				return true;
			}
		}, function() {
			var scales = getDraggableObjectById("scales");
			var bigBowl = getDraggableObjectById("bigBowl");
			if(_blackboard.IsSubtaskComplete("putInBigBowl", 2) && !_blackboard.IsSubtaskComplete("putInBigBowl", 3)) {
				scales.data.bowl.RemoveArrow();
				bigBowl.DisplayArrow();
			}
		});
	});

	var casterSugar = getDraggableObjectById("casterSugar");
	casterSugar.SetMoveEvent(function() {
		var casterSugar = getDraggableObjectById("casterSugar");
		var scales = getDraggableObjectById("scales");
		if(_blackboard.IsSubtaskComplete("putInBigBowl", 3) && !_blackboard.IsSubtaskComplete("putInBigBowl", 4) && !casterSugar.data.movedForTask) {
			casterSugar.data.movedForTask = true;
			casterSugar.RemoveArrow();
			scales.DisplayArrow();
		}
	});
	casterSugar.SetDropEndEvent(function() {
		var casterSugar = getDraggableObjectById("casterSugar");
		var bigBowl = getDraggableObjectById("bigBowl");

		measureIfHitsScales(casterSugar, "200g", "scales-bowl-caster", bigBowl, function() {
			if(bigBowl.data.hasSelfRaisingFlour && bigBowl.data.hasPlainFlour && bigBowl.data.hasBicarbonateOfSoda && bigBowl.data.hasMuscovadoSugar && !bigBowl.data.hasCasterSugar) {
				if(_blackboard.IsSubtaskComplete("putInBigBowl", 3) && !_blackboard.IsSubtaskComplete("putInBigBowl", 4)) {
					_blackboard.SubtaskCompleted("putInBigBowl", 4);
					bigBowl.RemoveArrow();
				}

				bigBowl.data.hasCasterSugar = true;
				bigBowl.SetImage("big-bowl-caster");
				bigBowl.ShowNotification("Added 200g of Caster Sugar");
				return true;
			}
		}, function() {
			var scales = getDraggableObjectById("scales");
			if(_blackboard.IsSubtaskComplete("putInBigBowl", 3) && !_blackboard.IsSubtaskComplete("putInBigBowl", 4)) {
				scales.RemoveArrow();
				return true;
			}
		}, function() {
			var scales = getDraggableObjectById("scales");
			var bigBowl = getDraggableObjectById("bigBowl");
			if(_blackboard.IsSubtaskComplete("putInBigBowl", 3) && !_blackboard.IsSubtaskComplete("putInBigBowl", 4)) {
				scales.data.bowl.RemoveArrow();
				bigBowl.DisplayArrow();
			}
		});
	});

	var cocoa = getDraggableObjectById("cocoa");
	cocoa.SetMoveEvent(function() {
		var cocoa = getDraggableObjectById("cocoa");
		var scales = getDraggableObjectById("scales");
		if(_blackboard.IsSubtaskComplete("putInBigBowl", 4) && !_blackboard.IsSubtaskComplete("putInBigBowl", 5) && !cocoa.data.movedForTask) {
			cocoa.data.movedForTask = true;
			cocoa.RemoveArrow();
			scales.DisplayArrow();
		}
	});
	cocoa.SetDropEndEvent(function() {
		var cocoa = getDraggableObjectById("cocoa");
		var bigBowl = getDraggableObjectById("bigBowl");
		measureIfHitsScales(cocoa, "25g", "scales-bowl-cocoa", bigBowl, function() {
			if(bigBowl.data.hasSelfRaisingFlour && bigBowl.data.hasPlainFlour && bigBowl.data.hasBicarbonateOfSoda && bigBowl.data.hasMuscovadoSugar && bigBowl.data.hasCasterSugar && !bigBowl.data.hasCocoa) {
				if(_blackboard.IsSubtaskComplete("putInBigBowl", 4) && !_blackboard.IsSubtaskComplete("putInBigBowl", 5)) {
					_blackboard.SubtaskCompleted("putInBigBowl", 5);
					bigBowl.RemoveArrow();
				}

				bigBowl.data.hasCocoa = true;
				bigBowl.SetImage("big-bowl-cocoa");
				bigBowl.ShowNotification("Added 25g of Cocoa Powder");
				return true;
			}
		}, function() {
			var scales = getDraggableObjectById("scales");
			if(_blackboard.IsSubtaskComplete("putInBigBowl", 4) && !_blackboard.IsSubtaskComplete("putInBigBowl", 5)) {
				scales.RemoveArrow();
				return true;
			}
		}, function() {
			var scales = getDraggableObjectById("scales");
			var bigBowl = getDraggableObjectById("bigBowl");
			if(_blackboard.IsSubtaskComplete("putInBigBowl", 4) && !_blackboard.IsSubtaskComplete("putInBigBowl", 5)) {
				scales.data.bowl.RemoveArrow();
				bigBowl.DisplayArrow();
			}
		});
	});


	//Start Gravity
	_cupboard1.OpenDoor();
	_cupboard2.OpenDoor();
	_cupboard3.OpenDoor();
	_fridge.OpenDoor();
	_drawer1.OpenDoor();
	_drawer2.OpenDoor();
	_drawer3.OpenDoor();
	_cupboard5.OpenDoor();
	_cupboard6.OpenDoor();
	forceGravity();
	_cupboard1.CloseDoor();
	_cupboard2.CloseDoor();
	_cupboard3.CloseDoor();
	_fridge.CloseDoor();
	_drawer1.CloseDoor();
	_drawer2.CloseDoor();
	_drawer3.CloseDoor();
	_cupboard5.CloseDoor();
	_cupboard6.CloseDoor();

	//Show control layer
	_controlLayer.draw();

	//Enable sounds
	audioManager.SetSoundsEnabled(true);

	//Enable interactions
	_kitchenHasLoaded = true;

	//Enable blackboard
	_blackboard.StartTrackingTasks();
};