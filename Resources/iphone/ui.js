function _getTargetFile(originalPath, targetId, parent) {
    var targetFilename = Ti.Utils.sha1(originalPath + "_" + targetId) + originalPath.substr(originalPath.lastIndexOf("."));
    var targetFile = Ti.Filesystem.getFile(parent || Ti.Filesystem.applicationCacheDirectory, targetFilename);
    return targetFile;
}

function _setBackgroundImage(view, targetWidth, targetHeight) {
    var originalPath = view._backgroundImage;
    var targetId = view._backgroundTarget || targetWidth + "_" + targetHeight;
    var originalFile, targetFile = _getTargetFile(originalPath, targetId);
    "/" === originalPath.charAt(0) && (originalPath = originalPath.substr(1));
    if (targetFile.exists()) view.backgroundImage = targetFile.nativePath; else {
        if (-1 !== originalPath.indexOf("://")) {
            originalFile = _getTargetFile(originalPath, "tmp", Ti.Filesystem.tempDirectory);
            var xhr = Ti.Network.createHTTPClient({
                onload: function(e) {
                    if (!originalFile.write(this.responseData)) {
                        console.error("[UI] Could not write downloaded file to: " + originalFile.nativePath);
                        return;
                    }
                    _resizeBackgroundImage(view, targetWidth, targetHeight, originalFile, targetFile);
                },
                onerror: function(e) {
                    console.error("[UI] Could not downloaded image: " + e.error);
                }
            });
            xhr.open("GET", originalPath);
            xhr.send();
            return;
        }
        originalFile = Ti.Filesystem.getFile(originalPath);
        _resizeBackgroundImage(view, targetWidth, targetHeight, originalFile, targetFile);
    }
}

function _resizeBackgroundImage(view, targetWidth, targetHeight, originalFile, targetFile) {
    if (!originalFile.exists()) {
        console.error("[UI] backgroundImage not found: " + originalFile.nativePath);
        return;
    }
    var originalBlob = originalFile.read();
    var originalWidth = originalBlob.width;
    var originalHeight = originalBlob.height;
    var originalRatio = originalWidth / originalHeight;
    targetWidth = Ti.UI.convertUnits("" + targetWidth, Ti.UI.UNIT_PX);
    targetHeight = Ti.UI.convertUnits("" + targetHeight, Ti.UI.UNIT_PX);
    var targetRatio = targetWidth / targetHeight;
    var resizeWidth, resizeHeight;
    if (targetRatio > originalRatio) {
        resizeWidth = targetWidth;
        resizeHeight = Math.ceil(resizeWidth / originalRatio);
    } else {
        resizeHeight = targetHeight;
        resizeWidth = Math.ceil(resizeHeight * originalRatio);
    }
    (originalWidth !== resizeWidth || originalHeight !== resizeHeight) && (originalBlob = originalBlob.imageAsResized(resizeWidth, resizeHeight));
    (resizeWidth !== targetWidth || resizeHeight !== targetHeight) && (originalBlob = originalBlob.imageAsCropped({
        width: targetWidth,
        height: targetHeight
    }));
    targetFile.write(originalBlob);
    view.backgroundImage = targetFile.nativePath;
}

function _onPostLayout(e) {
    var view = e.source;
    var size = view.size;
    view._backgroundRotate ? bothOrientationImagesRendered(view, size) && view.removeEventListener("postlayout", _onPostLayout) : view.removeEventListener("postlayout", _onPostLayout);
    _setBackgroundImage(view, size.width, size.height);
}

function bothOrientationImagesRendered(view, size) {
    var targetFile = _getTargetFile(view._backgroundImage, size.width + "_" + size.height);
    var targetFile2 = _getTargetFile(view._backgroundImage, size.height + "_" + size.width);
    if (targetFile.exists() && targetFile2.exists()) return true;
    return false;
}

function _isAbsolute(dimension) {
    return dimension && dimension.toString().match(/^[1-9]+[0-9]*[a-z]*$/);
}

var _ = require("alloy")._;

exports.createButton = function(args) {
    var $button = Ti.UI.createButton(args);
    $button.executed = false;
    $button.addEventListenerSingle = function(func) {
        if (!_.isFunction(func)) {
            Ti.API.error("[XP.UI Button] ERROR: Click handler must be a function");
            return;
        }
        $button.addEventListener("click", function(e) {
            if (!e.source.executed) {
                e.source.executed = true;
                _.defer(function() {
                    func(e);
                    e.source.executed = false;
                });
            }
        });
    };
    $button.addEventListenerOnce = function(eventName, func) {
        function singularCallback(e) {
            if (!triggered) {
                triggered = true;
                _.defer(function() {
                    func(e);
                    $button.removeEventListener(eventName, singularCallback);
                });
            }
        }
        var triggered = false;
        if (!_.isFunction(func)) {
            Ti.API.error("[XP.UI Button] ERROR: Single Event Listener callback must be a function");
            return;
        }
        $button.addEventListener(eventName, singularCallback);
    };
    return $button;
};

exports.createView = function(args) {
    if (args.backgroundSize && "cover" === args.backgroundSize && args.backgroundImage && "string" == typeof args.backgroundImage) {
        args._backgroundImage = args.backgroundImage;
        delete args.backgroundImage;
        if (args.backgroundTarget) {
            args._backgroundTarget = args.backgroundTarget;
            delete args.backgroundTarget;
            var targetFile = _getTargetFile(args._backgroundImage, args._backgroundTarget);
            if (targetFile.exists()) {
                args.backgroundImage = targetFile.nativePath;
                return Ti.UI.createView(args);
            }
        }
        var view = Ti.UI.createView(args);
        if (args.backgroundRotate && "true" === args.backgroundRotate) {
            view._backgroundRotate = args.backgroundRotate;
            delete args.backgroundRotate;
        }
        _isAbsolute(args.width) && _isAbsolute(args.height) ? _setBackgroundImage(view, args.width, args.height) : view.addEventListener("postlayout", _onPostLayout);
        return view;
    }
    return Ti.UI.createView(args);
};