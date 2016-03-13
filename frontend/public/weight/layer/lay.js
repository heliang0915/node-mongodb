define(['text!/weight/layer/skin/layer.css', 'layer'], function (cssText,layer) {
    var styleEl = document.getElementById('layer-style');
    if (styleEl) {
        var con = $(styleEl).html();
        $(styleEl).remove();
        $('head').append('<style type="text/css" id="layer-style">' + con + cssText + '</style>');
    } else {
        $('head').append('<style type="text/css" id="layer-style">' + cssText + '</style>');
    }
    return layer;
});
