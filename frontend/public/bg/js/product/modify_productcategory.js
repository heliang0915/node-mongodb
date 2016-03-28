require(["form","upload"], function (form,upload) {
    $("#categoryPic_tip").css({
        top:9,
        left:310
    });
    setHeight();
    function setHeight(){
        var src=$("#category").attr("src");
        var height=  $('#category').height();
        $("#upload_img_group").height(height);
        var upload_img_group=$("#upload_img_group");
        src==""?upload_img_group.hide():upload_img_group.show();
    }

    var up=new upload({
        id:'categoryPic_btn',
        uploadCallback:function(path){
            $('#category').attr('src',path);
            $("#categoryPic").val(path);
            setHeight();
        }
    });


});