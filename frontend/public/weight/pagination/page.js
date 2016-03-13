define(['text!/weight/pagination/pagination.css', 'pagination'], function (cssText) {
    var styleEl = document.getElementById('pagination-style');
    if (styleEl) {
        var con = $(styleEl).html();
        $(styleEl).remove();
        $('head').append('<style type="text/css" id="pagination-style">' + con + cssText + '</style>');
    } else {
        $('head').append('<style type="text/css" id="pagination-style">' + cssText + '</style>');
    }

    var Page = function (selector, options) {
        var page = new Page.init(selector, options);
        page.$init();
        return page;
    };

    Page.init = function (selector, options) {
        this.selector = selector;
        //总页数
        this.num_entries = options.num_entries || 1;
        this.num_edge_entries = options.num_edge_entries || 1;
        this.num_display_entries = options.num_display_entries || 1;
        this.callback = options.callback || null;
        this.items_per_page = options.items_per_page || 1;
        this.prev_text = options.prev_text || "前一页";
        this.next_text = options.next_text || "后一页";
    }


    Page.fn = Page.prototype = Page.init.prototype;

    Page.fn.$init = function () {
        $("#" + this.selector).pagination(this.num_entries, {
            num_edge_entries: this.num_edge_entries, //边缘页数
            num_display_entries: this.num_display_entries, //主体页数
            callback: this.callback,
            items_per_page: this.items_per_page, //每页显示1项
            prev_text: this.prev_text, //"前一页",
            next_text: this.next_text// "后一页"
        });
    }
    return Page;
});
