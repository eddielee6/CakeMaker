var resourceManager = new ResourceManager();
var canvasManager = null;
var kitchenScreen = null;
var loadingScreen = null;
var audioManager = new AudioManager();


(function() {
    Kinetic.Filters.ReColour = function(imageData, config) {
        var red = config.red || 0;
        var green = config.green || 0;
        var blue = config.blue || 0;

        var data = imageData.data;
        for(var i = 0; i < data.length; i += 4) {
            // red
            data[i] += red;
            // green
            data[i + 1] += green;
            // blue
            data[i + 2] += blue;
        }
    };
})();


$(window).resize(function() {
    canvasManager.SetOptimalSize();
});

function preventMobileScroll() {
    document.addEventListener("touchstart", function(e) { e.preventDefault(); });
    document.addEventListener("touchmove", function(e) { e.preventDefault(); });
}

function preloadingComplete() {
    kitchenScreen = new KitchenScreen();
    setTimeout(function() {
        loadingScreen.LoadingComplete();
    }, 1000);
}

function preloadingProgressChanged(e) {
    loadingScreen.UpdateProgress((e.completedCount / e.totalCount) * 100);
}

function transitionToKitchenScreen(guidedMode) {
    kitchenScreen.SetGuidedMode(guidedMode);
    canvasManager.AddLayer(kitchenScreen.GetLayer());
    canvasManager.AddLayer(kitchenScreen.GetControlLayer());
    canvasManager.ShowLayer("kitchenScreen");
    canvasManager.ShowLayer("controlLayer");
    canvasManager.ShowLayer("loadingScreen");
    loadingScreen.GetLayer().transitionTo({
        opacity: 0,
        duration: 1,
        callback: function() {
            canvasManager.DestroyLayer("loadingScreen");
            loadingScreen = null;
        }
    });
}

function initSoundManager() {
    soundManager.setup({
        url: 'js/libraries/soundmanager',
        useHighPerformance: true,
        flashLoadTimeout: 500,
        useHTML5Audio: true,
        preferFlash: false,
        debugMode: false,
        onready: function() { 
            preloadResources();
        }
    });
}

$(function() {
	preventMobileScroll();

    canvasManager = new CanvasManager();
    loadingScreen = new LoadingScreen();
    
    canvasManager.AddLayer(loadingScreen.GetLayer());    
    canvasManager.ShowLayer("loadingScreen");

    initSoundManager();
});