/*
 * form公共js 负责新增或修改页面内部 验证表单和提交表单 等动作
 * */
define(["util","lay"],function(util,layer){
    var saveBtn = $("#save");
    var backBtn = $("#back");
    var errHTML = '<span class="form_err_tip" id="{id}"></span>';
    var formDom=$(".form");
    var reg = /\{(\w+)\}/g;
    var selectorDom = $("input[required='true'],select[required='true']");
    var formOpt = {
        init: function () {
            this.initEvent();
            this.initCheck();
        },
        initEvent: function () {
            var _this = this;
            //保存按钮事件
            saveBtn.on('click', function () {
                var flag = _this.validate();
                var url=formDom.attr("action");
                var  uuid=$("#uuid").val();
                var data=formDom.serializeObject();
                if(flag){
                    util.ajax(url,function (json) {
                        var msg=json.msg;
                        var state=json.state;
                        var icon=(state=="ok"?6:5);
                        layer.msg(msg, {time: 1200, icon:icon});
                        if(uuid!=undefined){
                            if(uuid){
                                setTimeout(function(){
                                    window.history.back();
                                },1500);
                            }else{
                                setTimeout(function() {
                                    //询问框
                                    layer.confirm('是否继续添加？', {
                                        btn: ['确认', '返回列表'] //按钮
                                    }, function () {
                                        window.location.href = window.location.href;
                                    },function(){
                                        window.history.back();
                                    });
                                },1500);
                            }
                        }
                    },data)
                }
            })
            //取消按钮
            backBtn.on('click', function () {
                window.history.back();
            });

            selectorDom.on('blur',function(){
                var flag = _this.validate();
            })
        },
        initCheck: function () {
            selectorDom.each(function () {
                var id = $(this).attr("id") + "_tip";
                var html = errHTML.replace(reg, function () {
                    return eval(arguments[1]);
                })
                $(this).parent().after($(html));
                $(this).parent().prev().append("<em class='require'>*</em>");
            });
        },
        validate: function () {
            var flag = true;
            selectorDom.each(function () {
                var temp=true;
                var dom = $(this);
                var tipId = dom.attr("id") + "_tip";
                var val = dom.val();
                var filedText = dom.attr("filedText");
                var regText = dom.attr("regText");
                if (val == "") {
                    $("#" + tipId).html(filedText + "不允许为空");
                    //flag = false;
                    flag= temp=false;
                } else {
                    if (regText) {
                        if (regText != "") {
                            if (!eval(regText).test(val)) {
                                $("#" + tipId).html(filedText + "格式错误，请重新输入");
                                flag =temp= false;
                            } else {
                                $("#" + tipId).html("");
                                temp=true;
                                flag=temp&&flag;
                            }
                        }
                    }
                }
                if(temp){
                    $("#" + tipId).html("");
                }
            })

            return flag;
        }
    }
    formOpt.init();
    return formOpt;
})

