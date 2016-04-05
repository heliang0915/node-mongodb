define(['text!/weight/tree/zTreeStyle.css', 'ztree'], function (cssText, zTree) {
    var styleEl = document.getElementById('tree-style');
    var rootNode = {name: "根节点", id: "-1",isParent:true};

    if (styleEl) {
        var con = $(styleEl).html();
        $(styleEl).remove();
        $('head').append('<style type="text/css" id="tree-style">' + con + cssText + '</style>');
    } else {
        $('head').append('<style type="text/css" id="tree-style">' + cssText + '</style>');
    }

    var Tree = function (id, options) {
        var tree = new Tree.init(id, options);
        tree.$init();
        return tree;
    };

    Tree.init = function (options) {
        this.id = options.id;
        if (!this.id) {
            throw Error("tree组件必须设置ID");
            return;
        }
        this.rootNode = options.rootNode || rootNode;
        this.getUrl = options.getUrl || null;
        this.beforeExpand = options.beforeExpand || null;
        this.onAsyncSuccess = options.onAsyncSuccess || null;
        this.onClick = options.onClick || null;
        this.onAsyncError = options.onAsyncError || null;
        this.onExpand = options.onExpand || null;
    }


    Tree.fn = Tree.prototype = Tree.init.prototype;

    /*初始化树*/
    Tree.fn.$init = function () {
        var setting = this.initSetting();
        $.fn.zTree.init($("#" + this.id), setting, this.rootNode);
    }



    /*设置setting*/
    Tree.fn.initSetting = function () {
        /*定义树setting*/
        var setting = {
            async: {
                enable: true,
                url: this.getUrl
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            view: {
                expandSpeed: ""
            },
            callback: {
                beforeExpand: this.beforeExpand,
                onAsyncSuccess: this.onAsyncSuccess,
                onAsyncError: this.onAsyncError,
                onClick: this.onClick,
                onExpand:this.onExpand
            }
        };
        return setting;
    }

    return Tree;
});
