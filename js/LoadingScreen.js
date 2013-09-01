LoadingScreen = function() {
    var _layer = new Kinetic.Layer({
        id: "loadingScreen"
    });

	//Elements
	var _loadingArea = new Kinetic.Rect({
        x: 61,
        y: 600,
        width: 901,
        height: 50,
        fill: {
            start: {
                x: 0,
                y: 0
            },
            end: {
                x: 0,
                y: 49
            },
            colorStops: [0, '#f1f1f1', 0.5, '#eeeeee', 1, '#f1f1f1']
        },
        stroke: "#3b3b3b",
        cornerRadius: 25
    });
	var _loadingBar = new Kinetic.Rect({
        x: 61.5,
        y: 601,
        width: 50,
        height: 48,
        cornerRadius: 25,
        fill: {
            start: {
                x: 0,
  		        y: 0
            },
            end: {
  			   x: 0,
      		    y: 49
		 	},
            colorStops: [0, '#52b153', 0.35, '#48a648', 0.65, '#48a648', 1, '#52b153']
        }
    });

	var _loadingText = new Kinetic.Text({
        x: 0,
        y: 545,
        width: 1023,
        text: 'Loading 0%',
        align: 'center',
        fontSize: 30,
        fontFamily: 'Helvetica',
        textFill: '#3b3b3b'
    });

    var _modeSelectText = new Kinetic.Text({
        x: 0,
        y: 450,
        width: 1023,
        align: "center",
        fontFamily: 'Helvetica',
        textFill: "#363636",
        fontSize: 20,
        text: "Select a mode to start cooking",
        visible: false
    });

    var _startScreen = new StartScreen();
    
    var _guidedModeButton = new CustomButton(276.5, 530, "Guided mode", "#45ae46", "#2a772e", "#f1f1f1", function() {
        _startScreen.Show("Guided mode", "guidedMode", true, function() {
            _guidedModeButton.Reset();
        });
    });
    _guidedModeButton.Hide();

    var _blindModeButton = new CustomButton(526.5, 530, "Blind mode", "#e04444", "#bc1717", "#f1f1f1", function() {
        _startScreen.Show("Blind mode", "blindMode", false, function() {
            _blindModeButton.Reset();
        });
    });
    _blindModeButton.Hide();

    var backgroundImage = new Image();
    backgroundImage.onload = function() {
        var _background = new Kinetic.Image({
            x: 0,
            y: 0,
            width: canvasManager.GetOptimalSize().width,
            height: canvasManager.GetOptimalSize().height,
            image: backgroundImage
        });

        _layer.add(_background);
	    _layer.add(_loadingArea);
	    _layer.add(_loadingBar);
	    _layer.add(_loadingText);
        _layer.add(_modeSelectText);
        _layer.add(_guidedModeButton.GetGroup());
        _layer.add(_blindModeButton.GetGroup());
        _layer.add(_startScreen.GetGroup());
	    _layer.draw();
    };
    backgroundImage.src = "img/loading-background.jpg";

	this.GetLayer = function() {
		return _layer;
	};

	this.LoadingComplete = function() {
		_loadingArea.hide()
		_loadingBar.hide();
		_loadingText.hide();
        _modeSelectText.show();
		_guidedModeButton.Show();
        _blindModeButton.Show();
		_layer.draw();
	};

	this.UpdateProgress = function(progress) {
		try {
			var loadingBarWidth = (900 * (progress / 100));
			loadingBarWidth = loadingBarWidth < 50 ? 50 : loadingBarWidth;

			_loadingBar.transitionTo({
			 width: loadingBarWidth,
				duration: 0.5
			});

			_loadingText.setText((progress == 100 ? "Loaded " : "Loading ") + Math.floor(progress) + "%");
		}
		catch(err) {
			// Progress bar is already moving
		}
	};
};