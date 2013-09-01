Shelf = function(baseX, baseY) {

	var _group = new Kinetic.Group();

	var _baseX = baseX;
	var _baseY = baseY;

	var _gravityLine = {
		start: {
			x: _baseX + 31,
			y: _baseY + 57
		},
		end: {
			x: _baseX + 367,
			y: _baseY + 57
		},
		tolerance: 24
	};

	var _shelves = new Kinetic.Image({
		x: _baseX,
		y: _baseY,
		image: resourceManager.getImage("shelf"),
		width: 434.5,
		height: 152.5
	});
	_group.add(_shelves);

	this.GetGravityLine = function() {
		return _gravityLine;
	};

	this.GetGroup = function() {
		return _group;
	};
};