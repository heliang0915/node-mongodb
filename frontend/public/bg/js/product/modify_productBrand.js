require(["form","upload"], function (form,upload) {
    $("#logo_tip").css({
        top:9,
        left:310
    });
    setHeight();
    function setHeight(){
        var src=$("#logoImg").attr("src");
        var height=  $('#logoImg').height();
        $("#upload_img_group").height(height);
        var upload_img_group=$("#upload_img_group");
        src==""?upload_img_group.hide():upload_img_group.show();
    }

    var up=new upload({
        id:'logo_btn',
        uploadCallback:function(path){
            $('#logoImg').attr('src',path);
            $("#logo").val(path);
            setHeight();
        }
    });
});