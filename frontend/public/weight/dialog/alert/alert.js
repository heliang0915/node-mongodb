/*弹出消息*/
define(['dialog', 'weight'], function (dialog, weight) {

    //默认参数
    var defaultSetting = {
        title: '标题',
        width: 300,
        height: 140,
        content: '内容',
//		mode: true, //是否模态
        showBtn: true,
        button: [{
            text: '确定',
            callback: function () {
                dialog.fn.close();
            },
            className: 'simall primary'
        }]
    }


    var Alert = function (opts) {
        this.opts = weight.extend(defaultSetting, opts);
        new dialog(this.opts);
        this.setTitle();
    }
    Alert.prototype = Object.create(dialog.prototype);
    Alert.fn = Alert.prototype;
    Alert.fn.setTitle = function () {
        $('.dialog-title').children('h3').css('fontSize', 15);
    }
    //var dia=dialog({
    //    title: "登录",
    //    width:450,
    //    height:280,
    //    button: [{
    //        text: '确定',
    //        className: 'primary',
    //        callback: function() {
    //            alert(1);
    //        }
    //    }, {
    //        text: '关闭',
    //        className: '',
    //        callback: function() {
    //            alert(2);
    //        }
    //    }]
    //})

    return Alert;
})