ResourceManager = function() {

	this.loader = new PxLoader({statusInterval: 1});
	this.preLoadedGraphics = new Array();
	this.preLoadedSounds = new Array();

	this.getImage = function(name) {
		for (var i = 0; i < this.preLoadedGraphics.length; i++) {
			if(this.preLoadedGraphics[i].name === name) return this.preLoadedGraphics[i].image;
		}
		return null;
	};

	this.loadGraphics = function() {
		for (var i = 0; i < this.preLoadedGraphics.length; i++) {
			this.preLoadedGraphics[i].image = this.loader.addImage(this.preLoadedGraphics[i].source);
		};
	};

	this.loadSounds = function() {
		for (var i = 0; i < this.preLoadedSounds.length; i++) {
			var url = 'audio/' + this.preLoadedSounds[i].source + '.mp3';
			if (!soundManager.canPlayURL(url)) {
				url = 'audio/' + this.preLoadedSounds[i].source + '.ogg';
				if (!soundManager.canPlayURL(url)) { 
					continue; // can't be played 
				}
			}
			this.loader.addSound(this.preLoadedSounds[i].name, url); 
		}
	};
};

PreloadedGraphic = function(name, source) {
	this.name = name;
	this.source = source;
	this.image = null;
};

PreloadedAudio = function(name, source) {
	this.name = name;
	this.source = source;
	this.sound = null;
};