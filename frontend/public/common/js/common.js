define([], function () {
    /*前后台公用的js*/
    var common = {};
    //首写字母大写
    common.toFirstUpper = function (str) {
        var reg = /(\w)/;
        str = str.replace(reg, function (val) {
            return val.toUpperCase();
        })
        return str;
    }
    return common;
});