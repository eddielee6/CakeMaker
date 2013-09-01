Sink = function(baseX, baseY) {
	var sender = this;

	var _baseX = baseX;
	var _baseY = baseY;

	var _group = new Kinetic.Group();

	var sinkIsFull = false;

	var _empty = new Kinetic.Image({
		x: baseX,
		y: baseY,
		image: resourceManager.getImage("sink-empty"),
		width: 191,
		height: 98
	});
	_group.add(_empty);

	var _full = new Kinetic.Image({
		x: baseX,
		y: baseY,
		image: resourceManager.getImage("sink-full"),
		width: 191,
		height: 98,
		visible: false
	});
	_group.add(_full);

	var _tapClickArea = new Kinetic.Rect({
		x: baseX + 67,
        y: baseY + 0,
        width: 47,
        height: 45
	});
	_group.add(_tapClickArea);
	_tapClickArea.on('click tap', function(evt) {
		evt.cancelBubble = true;
		if(!sinkIsFull) {
			audioManager.Play("fillSink");
			showNotification("Filled the sink");
			sinkIsFull = true;
			document.body.style.cursor = "default";
			_full.show();
			_empty.hide();
		}
		redraw();
    });
    _tapClickArea.on('mouseover', function() {
    	if(!sinkIsFull) {
	    	document.body.style.cursor = "pointer";
	    }
	});
	_tapClickArea.on('mouseout', function() {
		document.body.style.cursor = "default";
	});

	var _plugClickArea = new Kinetic.Rect({
		x: baseX + 42,
        y: baseY + 74.5,
        width: 26,
        height: 15
	});
	_group.add(_plugClickArea);
	_plugClickArea.on('click tap', function(evt) {
		evt.cancelBubble = true;
		if(sinkIsFull) {
			audioManager.Play("emptySink");
			showNotification("Emptied the sink");
			sinkIsFull = false;
			document.body.style.cursor = "default";
			_full.hide();
			_empty.show();
		}
		redraw();
    });
    _plugClickArea.on('mouseover', function() {
    	if(sinkIsFull) {
    		document.body.style.cursor = "pointer";
    	}
	});
	_plugClickArea.on('mouseout', function() {
		document.body.style.cursor = "default";
	});

	this.IsSinkFull = function() {
		return sinkIsFull;
	};

	this.GetCleanedDropLocation = function() {
		return {
			x: _baseX + 140,
			y: _baseY + 20
		};
	};

	this.GetSinkDropDimentions = function() {
		return {
			x: _baseX,
			y: _baseY + 30,
			width: 100,
			height: 70
		};
	};

	this.GetTapDropDimentions = function() {
		return {
			x: baseX + 67,
	        y: baseY + 0,
	        width: 47,
	        height: 45
		};
	};

	var showNotification = function(message) {
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

		var xPos = (_empty.getX() + (_empty.getWidth() / 2))  - (message.getWidth() / 2);
		xPos = xPos < 0 ? 10 : xPos;
		xPos = (xPos + message.getWidth()) > 1023 ? (xPos - ((xPos + message.getWidth()) - 1023)) - 10 : xPos;

		message.setX(xPos);
		message.setY((_empty.getY()) - 20 - message.getHeight());

		notificationBackground.setX(message.getX() - 10);
		notificationBackground.setY(message.getY() - 8);

    	_empty.getLayer().add(notificationGroup);

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

	this.GetGroup = function() {
		return _group;
	};

	var redraw = function() {
		_group.getLayer().draw();
	};
};