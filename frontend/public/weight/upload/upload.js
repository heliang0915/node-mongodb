define(["lay"], function (layer) {
    var iframeTemplate = '<iframe id="uploadIframe" style="display: none" name="uploadIframe" src="###" frameborder="0"></iframe>';
    var formTemplate = '<form action="/{action}" style="display: none" target="uploadIframe" id="{id}_form" method="post" enctype="multipart/form-data"></form>';
    var attachment;
    var callback;
    var Upload = function (options) {
        var upload = new Upload.init(options);
        upload.$init();
        return upload;
    };
    Upload.init = function (options) {
        this.id = options.id;  //上传按钮
        this.uploadId = $("#" + options.id).attr("ref"); //上传 input的真正元素
        this.action = options.action || "upload";
        this.attachment = options.attachment == true ? true : false; //是否为附件
        this.uploadCallback = options.uploadCallback; //上传回调
        attachment = this.attachment;
        callback = this.uploadCallback;
    }

    Upload.fn = Upload.prototype = Upload.init.prototype;

    //初始化动作
    Upload.fn.$init = function () {
        this.initDom();
        this.initEvent();
    }
    //初始化dom
    Upload.fn.initDom = function () {
        var self = this;
        var reg = /\{(\w+)\}/g;
        var uploadIframe = $("#uploadIframe");
        var tempTemplate = formTemplate.replace(reg, function () {
            var key = arguments[1];
            return self[key];
        });
        $("#" + this.id).after($(tempTemplate));
        $("#" + this.id + "_form").append($("#" + this.uploadId));
        if (uploadIframe.length == 0) {
            $("body").append($(iframeTemplate));
        }
    }

    //初始化动作
    Upload.fn.initEvent = function () {
        var self = this;
        $("#" + this.uploadId).on('change', function () {
            var val = $(this).val();
            if (val) {
                var form = $('#' + self.id + '_form');
                form.submit();
            }
        })
        $("#" + this.id).on("click", function () {
            $("#" + self.uploadId).trigger('click');
        })
    }

    function uploadSuccess(err, fileName, fieldName) {
        if (err) {
            layer.msg("喔呦，上传出错了" + err, {time: 12000, icon: 5});
        } else {
            var path = "/download/" + fileName + "/" + attachment;
            if (callback && typeof  callback == "function") {
                layer.msg('正在玩命上传...', {time: 2000});
                setTimeout(function () {
                    callback(path, fieldName);
                    layer.msg('上传成功了喔', {icon: 6});
                }, 2000);
            }
        }
    }

    window.uploadSuccess = uploadSuccess;
    return Upload;
});
