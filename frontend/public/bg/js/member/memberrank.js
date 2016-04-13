require(['business', 'util','lay'], function (business, util, layer) {
    var memberrank = {};
    //分页回调
    var pageParams = {};
    pageParams.url = "/memberrank/page?temp="+Math.random();
    pageParams.data ={};
    //JSON.stringify(data);
    //浅拷贝
    memberrank = util.extend(business, memberrank);
    //事件回调
    var eventCallback = function () {
        var _this=this;
        //添加动作
        $('#add').on('click', function () {
            window.location.href="/memberrank/modify";
        })
        //修改动作
        $('a[name=modify]').on('click',function(){
            var uuid=$(this).attr('data');
            window.location.href="/memberrank/modify?uuid="+uuid;
        })
        //删除动作
        $('#del').on('click', function () {
            memberrank.del("memberrank",function(){
                window.location.href="/memberrank/list";
            });
        })
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
        var showFileds = {"name": "", "score": "","percent":"","defaultRank": ""}
        var html = "";
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            html += "<tr>";
            html += '<td><input type="checkbox" name="check" value="'+item.uuid+'"></td>';
            for (var file in showFileds) {
                var text="";
                html += "<td>";
                if(file=="defaultRank"){
                    text=item[file]==true?"是":"否";
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
    memberrank.init(pageParams);
});

