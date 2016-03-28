require(['business', 'util','lay'], function (business, util, layer) {
    var member = {};
    //分页回调
    var pageParams = {};
    pageParams.url = "/member/page?temp="+Math.random();
    pageParams.data =JSON.parse($("#data").val());
    //JSON.stringify(data);
    //浅拷贝
    member = util.extends(business, member);
    //事件回调
    var eventCallback = function () {
        var _this=this;
        //添加动作
        $('#add').on('click', function () {
            window.location.href="/member/modify";
        })
        //修改动作
        $('a[name=modify]').on('click',function(){
            var uuid=$(this).attr('data');
            window.location.href="/member/modify?uuid="+uuid;
        })
        //删除动作
        $('#del').on('click', function () {
            member.del("member",function(){
                window.location.href="/member/list";
            });
        })

        //搜索按钮注册动作
        $('#search').on('click', function () {
            var key=$("#searchInput").val();
            var keyStr="?userName="+key+"&name="+key+"&tel="+key;
            window.location.href="/member/list"+keyStr;
        });

        //重置复选框
        $("#selectAll").prop("checked",false);
        //设置复选框
        $("input[name='check']").off('click').on('click', function () {
            if($("input[name='check']").length==($("input[name='check']:checked").length)){
                $("#selectAll").prop("checked",true);
            }else{
                $("#selectAll").prop("checked",false);
            }
        })
    }

    //分页回调
    pageParams.callback = function (json) {
        var data=json.data;
        //分页回调
        var showFileds = {"userName": "", "tel": "", "rank": "", "email": "", "sex": ""}
        var html = "";
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            html += "<tr>";
            html += '<td><input type="checkbox" name="check" value="'+item.uuid+'"></td>';
            for (var file in showFileds) {
                var text="";
                html += "<td>";
                if(file=="sex"){
                    text=item[file]==1?"男":"女";
                }else{
                    text= item[file];
                }
                html += text;
                html += "</td>";
            }
            html += '<td class="opt"><a href="###" data="'+item.uuid+'" name="modify" >&#xe609;</a></td>';
            html += "</tr>";
        }
        $("#record").html(html);
        eventCallback.call(this);
    }

    console.log(pageParams);


    //初始化
    member.init(pageParams);
});

