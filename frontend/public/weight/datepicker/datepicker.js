define(['text!/weight/datepicker/need/laydate.css','laydate'], function (cssText,laydate) {
    var styleEl = document.getElementById('datepicker-style');
    if (styleEl) {
        var con = $(styleEl).html();
        $(styleEl).remove();
        $('head').append('<style type="text/css" id="datepicker-style">' + con + cssText + '</style>');
    } else {
        $('head').append('<style type="text/css" id="datepicker-style">' + cssText + '</style>');
    }
    laydate.skin('../../../weight/datepicker/skins/molv');//切换皮肤，请查看skins下面皮肤库
    var Datepicker = {};
    return Datepicker;
});
