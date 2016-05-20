require(["form", "upload", 'tree'], function (form, upload, mytree) {
    form.init();

    $("#categoryPic_tip").css({
        top: 9,
        left: 310
    });
    setHeight();
    function setHeight() {
        var src = $("#category").attr("src");
        var height = $('#category').height();
        $("#upload_img_group").height(height);
        var upload_img_group = $("#upload_img_group");
        src == "" ? upload_img_group.hide() : upload_img_group.show();
    }

    var up = new upload({
        id: 'categoryPic_btn',
        uploadCallback: function (path) {
            $('#category').attr('src', path);
            $("#categoryPic").val(path);
            setHeight();
        }
    });


    var tree = mytree({
        id: 'parentRankTree',
        rootNode: {id: "-1", name: "顶级分类", isParent: true},
        onClick: function (event, treeId, treeNode) {
            //alert(treeNode.id);
            //alert(JSON.stringify(treeNode));
            $("#pid").val(treeNode.id);
        },
        getUrl: function (treeId, treeNode) {
            var pid = treeNode.id;
            var uuid=$("#uuid").val();
            return "./getCategoryRankTree?pid=" + pid+"&id="+uuid;
        },
        beforeExpand: function (treeId, treeNode) {
            var pid = treeNode.id;
            console.log("beforeExpand");
            return "./getCategoryRankTree?pid=" + pid;
        },
        onAsyncSuccess: function (event, treeId, treeNode, msg) {
            expandNodes(treeNode.children);
            //alert(JSON.stringify(treeNode));
            initTreeSelected(treeId, treeNode);
            console.log("onAsyncSuccess");
        },
        onAsyncError: function (event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
            console.log("onAsyncError");

        },
        ajaxGetNodes: function (treeNode) {

            console.log("ajaxGetNodes");
        }

    });

    var treeObj = $.fn.zTree.getZTreeObj("parentRankTree");


    function expandNodes(nodes) {
        if (!nodes) return;
        for (var i = 0, l = nodes.length; i < l; i++) {

            treeObj.expandNode(nodes[i], true, false, false);

            if (nodes[i].isParent && nodes[i].zAsync) {
                expandNodes(nodes[i].children);
            }
        }
    }

    function expandAll() {
        expandNodes(treeObj.getNodes());
    }


    //function expAll() {
    //    var rootNode = treeObj.getNodeByTId("parentRankTree_1");
    //    treeObj.expandNode(rootNode, true, null, null, null);
    //}

    expandAll();
    //
    function initTreeSelected(treeId, node) {
        var pid = $("#pid").val();
        if (pid) {
            //alert("node.id>>>"+node.id);
            //alert("pid>>"+pid);
            if (node.id == pid) {
                if (node) {
                    treeObj.selectNode(node);
                }
            }
        }
    }
});