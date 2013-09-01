AudioManager = function() {
	var sender = this;
	var enableSounds = false;

	this.Play = function(soundId, forcePlay) {
		if(enableSounds) {
			if(forcePlay) soundManager.stop(soundId);
			soundManager.play(soundId);
		}
	};

	this.LoopPlay = function(soundId) {
		if(enableSounds) {
			soundManager.play(soundId, {
				onfinish: function() {
					sender.LoopPlay(soundId);
				}
			});
		}
	};

	this.Stop = function(soundId) {
		soundManager.stop(soundId);
	};

	this.SetSoundsEnabled = function(state) {
		enableSounds = state;
	};
};