/**
 * Created by helia on 2016/3/6.
 */
//加载数据
$(function () {
    //全选
    $('#selectAll').on('click', function () {
        var _this = this;
        $('input[name="check"]').each(function () {
            $(this).prop("checked", $(_this).is(":checked"));
        })
    });
    $("tr:odd").css("background", "#cdfcdf")

    $('#add').on('click', function () {
        add();
    })
    $('#edit').on('click', function () {
        edit();
    })
    $('#del').on('click', function () {
        del();
    })
    $('#upload').on('click', function () {
        upload();
    });
});

//新增
function add() {
    var data = {};
    data.userName = "萧十一郎";
    data.password = "123456";
    operation('/add', data);
}

//编辑
function edit() {
    var data = {};
    var uuid = $('input[name="check"]:checked').val();
    data.uuid = uuid;
    data.userName = "沈璧君";
    data.password = "345678";
    operation('/edit', data);
}

//删除
function del() {
    var data = {};
    var str = "";
    $('input[name="check"]:checked').each(function (i) {
        var uuid = $(this).val();
        if (i == 0) {
            str += uuid;
        } else {
            str += "," + uuid;
        }
    });
    data.uuid = str;
    operation('/del', data);
}

//上传
function upload() {
    $('#upFile').trigger('click');
    $('#upFile').on('change', function () {
        var val = $(this).val();
        if (val) {
            var form = $('#form');
            form.submit();
        }
    })
}
//上传成功
function uploadSuccess(err, fileName) {
    if (err) {
        alert("上传出错"+err);
    } else {
        var  path="/download/"+fileName+"/"+true;
        $('#img').attr('src', path);
    }
}

//操作接口
function operation(url, data) {
    $.ajax({
        type: 'post',
        url: url,
        data: data,
        //dataType:"json",
        success: function (msg) {
            alert(msg);
            window.location.reload();
        },
        error: function () {
            alert(arguments[0]);
        }

    });
}