require(['datepicker', 'moment'], function (datepicker, moment) {
    var birthday = $("#birthday");
    var now = moment().format('YYYY-MM-DD');
    var modify = {
        init: function () {
            this.initEvent();
            this.initBussiness();
        },
        initBussiness: function () { //业务数据初始化
            if (birthday.val() == "") {
                $('#birthday').val(now);
            }
        },
        initEvent: function () {  //初始化事件
            birthday.on('click', function () {
                laydate({elem: '#birthday'});
            })
        }
    };
    modify.init();
});