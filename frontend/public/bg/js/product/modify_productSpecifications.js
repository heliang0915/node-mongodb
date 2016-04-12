require(["form", "json2", "upload", 'layer.ext'], function (form, json2, upload, lay) {
    var modifyProductSpecifications = {};
    modifyProductSpecifications.init = function () {
        this.initEvent();
        this.showSpecificationsList();
        this.initRemoveEvent();

    }
    modifyProductSpecifications.initEvent = function () {
        var self = this;
        var add_item = $('#addItem');
        var type = $('input[type="radio"]');

        //新增操作
        add_item.on('click', function () {
            var len = self.getCurrentMaxIndex();
            var index = len + 1;
            $('#itemlist').append($(self.renderHTML(index)));

            //渲染这个添加项
            self.renderItem();

        })
        //单选按钮注册
        type.on('click', function () {
            if ($(this).is(":checked")) {
                var val = $(this).val();
                if (val == 1) { //图片
                    $('.item-group').show();
                } else {
                    $('.item-group').hide();
                }
            }
        })


    }

    modifyProductSpecifications.renderHTML = function (id) {
        var templateItem = "";
        templateItem += '<tr>\n' +
            '<td>\n' +
            '<input type="text" class="item-input" id="input_' + id + '">\n' +
            '</td>\n' +
            '<td class="item-opt">\n' +
            '<span class="item-group"> \n' +
            '<img class="item-color"  src=""  id="img_' + id + '" style="background-color: #00B83F;"/>\n' +
            '<input type="file" style="display:none;"  id="uploadFile_' + id + '"  name="uploadFile_' + id + '" />\n' +
            '<a href="###" class="item-upload" ref="uploadFile_' + id + '" id="upload_' + id + '"  >上传图片</a> \n' +
            '</span>\n' +
            '<a href="###" class="item-remove">&#xe60b;</a> \n' +
            '</td>\n' +
            '</tr>\n';

        //console.log(templateItem);
        return templateItem;
    }
    modifyProductSpecifications.getCurrentMaxIndex = function () {
        var len = $('.item-input').length;
        return len;
    }

    modifyProductSpecifications.initRemoveEvent = function () {

        var item_removes = $('.item-remove');
        //删除按钮操作
        item_removes.off('click').on('click', function () {
            $(this).parent().parent().remove();
        })
    }
    //回显规格值
    modifyProductSpecifications.showSpecificationsList = function () {
        var len = this.getCurrentMaxIndex();
        var specificationsValList = $('#specificationsValList').val();
        if(specificationsValList){
            var ary = eval(specificationsValList);
            for (var i = 0; i < ary.length; i++) {
                var index = (len + i + 1);
                var json = ary[i];
                var src = json.picPath;
                var val = json.val;
                var html = this.renderHTML((index));
                $('#itemlist').append($(html));
                $('#input_' + index).val(val);
                $('#img_' + index).attr('src', src);
                //设置upload
                this.uploadFile(index);
            }
        }

        $('input[type="radio"]:checked').trigger('click');
        //注册预览事件
        this.lookupPicEvent();


    }

    modifyProductSpecifications.lookupPicEvent = function () {
        //图片项注册点击事件
        $('.item-color').off('click').on('click', function () {
            var id = $(this).attr('id');
            var src = $(this).attr('src');
            layer.photos({
                photos: {
                    "title": "预览", //相册标题
                    "id": id, //相册id
                    "start": 0, //初始显示的图片序号，默认0
                    "data": [   //相册包含的图片，数组格式
                        {
                            "alt": "",
                            "pid": id, //图片id
                            "src": src, //原图地址
                            "thumb": src //缩略图地址
                        }
                    ]
                }
            });
        })
    }

    modifyProductSpecifications.uploadFile = function (index) {
        upload({
            id: "upload_" + index,
            uploadCallback: function (path, fieldName) {
                var id = fieldName;
                var ind = id.substr(id.indexOf('uploadFile_') + 'uploadFile_'.length, id.length);
                $('#img_' + ind).attr('src', path);
            }
        });
    }


    //添加规格值后渲染
    modifyProductSpecifications.renderItem = function () {
        $('input[type="radio"]:checked').trigger('click');
        var index = this.getCurrentMaxIndex();
        this.uploadFile(index);
        //为这个添加项注册删除事件
        this.initRemoveEvent();

    }


    //保存回调 返回true代表可以保存 返回false 代表不可以保存
    modifyProductSpecifications.saveCallback = function () {
        var valAry = [];
        $(".item-input").each(function () {
            var val = $(this).val();
            var picVal = $(this).parent().next().find(".item-color").attr('src');
            var data = {val: val, picPath: picVal};
            valAry.push(data);
        })
        $("#specificationsValList").val(JSON.stringify(valAry));
        return true;
    }
    modifyProductSpecifications.init();
    form.init(modifyProductSpecifications.saveCallback);

});