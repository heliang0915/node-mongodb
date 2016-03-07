/**
 * Created by helia on 2016/3/6.
 */

$(function(){

   $('#selectAll').on('click',function(){
       var _this=this;
       $('input[name="check"]').each(function(){
             $(this).prop("checked",$(_this).is(":checked"));
        })
   });

    $("tr:odd").css("background","#cdfcdf")

    $('#add').on('click',function(){
        add();
    })
    $('#edit').on('click',function(){
        edit();
    })
    $('#del').on('click',function(){
        del();
    })

    //新增
    function add(){
        var data={};
        data.userName="萧十一郎";
        data.password="123456";
        operation('/add',data);
    }

    function edit(){
        var data={};
        var uuid= $('input[name="check"]:checked').val();
        data.uuid=uuid;
        data.userName="沈璧君";
        data.password="345678";
        operation('/edit',data);
    }

    function del(){
        var data={};
        var str="";
        $('input[name="check"]:checked').each(function(i){
            var uuid=$(this).val();
            if(i==0){
                str+=uuid;
            }else{
                str+=","+uuid;
            }
            });
        data.uuid=str;
        operation('/del',data);
    }

    function  operation(url,data){
        $.ajax({
            type:'post',
            url:url,
            data:data,
            //dataType:"json",
            success:function(msg){
                alert(msg);
                window.location.reload();
            },
            error:function(){
                alert(arguments[0]);
            }

        });
    }
});