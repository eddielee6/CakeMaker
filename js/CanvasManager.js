CanvasManager = function() {

    var _optimalWidth = 1024 - 1; //Hack to fix iOS6 performance issue
    var _optimalHeight = 748;
    var _optimalAspectRatio = _optimalWidth / _optimalHeight;

    var _stage = new Kinetic.Stage({
        container: document.getElementsByTagName("body")[0],
        width: _optimalWidth,
        height: _optimalHeight
    });

    this.GetCurrentSize = function() {
        return _stage.getSize();
    };

    this.GetScale = function() {
        return _stage.getScale()
    };

    this.AddLayer = function(layer) {
        layer.setVisible(false);
        _stage.add(layer);
        this.SetOptimalSize();
    };

    this.GetLayer = function(layerId) {
        return _stage.get('#' + layerId)[0];
    };

    this.ShowLayer = function(layerId) {
        var layer =  this.GetLayer(layerId);
        layer.moveToTop();
        layer.setVisible(true);
        _stage.draw();
    };

    this.HideLayer = function(layerId) {
        var layer =  this.GetLayer(layerId);
        layer.setVisible(false);
        _stage.draw();
    };

    this.DestroyLayer = function(layerId) {
        this.GetLayer(layerId).remove();
        _stage.draw();
    };

    this.GetCurrentPosition = function() {
        var touchPos = _stage.getTouchPosition();
        var mousePos = _stage.getMousePosition();
        return {
            x: touchPos != null ? touchPos.x : mousePos.x,
            y: touchPos != null ? touchPos.y : mousePos.y
        };
    };

    this.GetOptimalSize = function() {
        return {
            width: _optimalWidth,
            height: _optimalHeight
        };
    };

    this.SetOptimalSize = function() {        
        var newWidth = $(window).width();
        var newHeight = $(window).height();

        if (_optimalAspectRatio > $(window).width() / $(window).height()) { //Too high
            newHeight = $(window).width() / _optimalAspectRatio;
        } else if (_optimalAspectRatio < $(window).width() / $(window).height()) { //Too wide
            newWidth = $(window).height() * _optimalAspectRatio;
        }

        _stage.setWidth(newWidth);
        _stage.setHeight(newHeight);

        _stage.setScale({
           x: newWidth / _optimalWidth,
           y: newHeight / _optimalHeight
        });

        _stage.draw();
    };
}