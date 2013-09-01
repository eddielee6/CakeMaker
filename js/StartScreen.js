StartScreen = function() {
	var sender = this;
	var _group = new Kinetic.Group();

	var _startWithGuidance;

	//Elements
	var startPlayScreenBackground = new Kinetic.Rect({
    	x: 511.5,
        y: 374,
        width: 45,
        height: 45,
        fill: '#FFFFFF',
        cornerRadius: 20,
        shadow: {
            color: '#000000',
            blur: 30
        },
        visible: false
    });
    _group.add(startPlayScreenBackground);

    var logoBackground = new Kinetic.Rect({
        x: 134,
        y: 57.5,
        width: 360,
        height: 60,
        fill: "#FFFFFF",
        cornerRadius: 20,
        visible: false
    });
    _group.add(logoBackground);
    var logoBack2 = new Kinetic.Rect({
        x: 464,
        y: 57.5,
        width: 60,
        height: 60,
        fill: "#FFFFFF",
        visible: false
    });
    _group.add(logoBack2);
    var logoBack3 = new Kinetic.Rect({
        x: 134,
        y: 90,
        width: 50,
        height: 40,
        fill: "#FFFFFF",
        visible: false
    });
    _group.add(logoBack3);
    var logo = new Kinetic.Image({
        x: 120,
        y: 30,
        width: 387.5,
        height: 89.5,
        visible: false
    });
    _group.add(logo);

    var playModeImage = new Kinetic.Image({
        x: 211.5,
        y: 145,
        width: 600,
        height: 439,
        stroke: 'black',
        strokeWidth: 2,
        visible: false
    });
    _group.add(playModeImage);

 	var playMode = new Kinetic.Text({
		x: 550,
        y: 130,
       	fontFamily: 'Helvetica',
        textFill: "#363636",
        fontSize: 30,
        visible: false,
        fill: "#FFFFFF"
	});
	_group.add(playMode);

    var closeButton = new Kinetic.Circle({
		x: 876.5,
        y: 70,
		radius: 30,
		fill: '#FFFFFF',
		stroke: '#000000',
		strokeWidth: 4,
		visible: false,
		shadow: {
            color: '#000000',
            blur: 10
        }
	});
	closeButton.on("mouseover touchstart", function() {
		document.body.style.cursor = "pointer";
		closeButton.setFill("#333333");
		closeText.setTextFill("#FFFFFF");
		redraw();
	});
	closeButton.on("mouseout touchend", function() {
		document.body.style.cursor = "default";
		closeButton.setFill("#FFFFFF");
		closeText.setTextFill("#000000");
		redraw();
	});
	closeButton.on("click tap", function() {
		_group.hide();

		startPlayScreenBackground.setStrokeWidth(0);
		startPlayScreenBackground.hide();
        logoBackground.hide();
        logoBack2.hide();
        logoBack3.hide();
        logo.hide();
        playModeImage.hide();
        _playButton.Hide();
        closeButton.hide();
        closeText.hide();
        playMode.hide();

        startPlayScreenBackground.setX(511.5);
        startPlayScreenBackground.setY(374);
        startPlayScreenBackground.setWidth(45);
        startPlayScreenBackground.setHeight(45);
        redraw();
	});
	var closeText = new Kinetic.Text({
		x: 866.5,
        y: 60,
        width: closeButton.getWidth(),
        height: closeButton.getHeight(),
       	text: "X",
       	fontFamily: 'Helvetica',
        textFill: "#363636",
        fontSize: 25,
        visible: false
	});
	_group.add(closeButton);
	_group.add(closeText);
	closeText.on("mouseover touchstart", function() {
		closeButton.simulate("mouseover");
	});
	closeText.on("mouseout touchend", function() {
		closeButton.simulate("mouseout");
	});
	closeText.on("click tap", function() {
		closeButton.simulate("click");
	});

    var _playButton = new CustomButton(401.5, 605, "Start cooking", "#45ae46", "#2a772e", "#f1f1f1", function() {
    	closeButton.simulate("click");
    	transitionToKitchenScreen(_startWithGuidance);
    });
    _playButton.Hide();
    _group.add(_playButton.GetGroup());

    this.Show = function(title, imageName, startWithGuidance, callback) {
    	_startWithGuidance = startWithGuidance;

    	playMode.setText(title);

    	_group.show();

    	playModeImage.setImage(resourceManager.getImage(imageName));
    	logo.setImage(resourceManager.getImage("logo"));

    	startPlayScreenBackground.show();
        startPlayScreenBackground.transitionTo({
            x: 136.5,
            y: 60,
            width: 750,
            height: 619,
            easing: "elastic-ease-out",
            duration: 1.5,
            callback: function() {
            	if(callback) callback();
            }
        });

        setTimeout(function() {
            startPlayScreenBackground.setStrokeWidth(4);
            startPlayScreenBackground.setStroke("black");
            logoBackground.show();
            logoBack2.show();
            logoBack3.show();
            logo.show();
            logo.moveToTop();
            playModeImage.show();
            _playButton.Show();
            closeButton.show();
            closeText.show();
            playMode.show();
            redraw();
        }, 1100);
    };

    this.GetGroup = function() {
    	return _group;
    };

    var redraw = function() {
    	_group.getLayer().draw();
    };
};