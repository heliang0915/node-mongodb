/**
 *商品标签路由
 */
var express = require('express');
var router = express.Router();
var util=require("../../util/util");
var productTagDao = require('../../dao/product/productTagDao');
var message = require("../../util/message");
var config=require("../../config");

//访问商品标签首页
router.route('/').all(function (req, res) {
    var params=util.getParams(req);
    console.log(params);
    res.render(config.product.index, {title:config.productCategory.title,action:config.productTag.module.toLocaleLowerCase(), pageIndex:config.product.pageIndex,active:'active'});
})


//访问列表
router.route('/list').all(function (req, res) {
    //var params=util.getParams(req);
    var totalCount=10;
    console.log("商品标签-list......");
    var params = util.getParams(req, productTagDao, config.productTag.module);
    var searchText = "";
    var ary = [];
    var searchData = util.getSearchData(params);
    productTagDao.count(searchData, function (err, totalCount) {
        if (err) {
            util.showErr(res, err);
        } else {
            res.render(config.productTag.list, {
                title: '商品标签',
                data: JSON.stringify(params),
                //searchText: searchText,
                pageSize: config.pageSize,
                totalCount: totalCount
            });
        }
    });

   // res.render(config.productTag.list, {title: '商品标签', content: '商品标签'});
   // res.render(config.productTag.list, {
   //     title: '商品标签',
   //     data: JSON.stringify(params),
   //     //searchText: searchText,
   //     pageSize: config.pageSize,
   //     totalCount: totalCount
   // });
});

//ajax分页
router.route('/page').all(function (req, res) {
    var params = util.getParams(req,productTagDao,config.productTag.module);
    console.log(".......page");
    var currentPage = params.currentPage;
    var searchData = util.getSearchData(params);
    productTagDao.page(currentPage, searchData, function (err, productTags) {
        var json = {};
        json.data = productTags;
        res.send(json);
    });
});

//跳转新增页面
router.route('/modify').all(function (req, res) {
    var params = util.getParams(req,productTagDao,config.productTag.module);
    var uuid = params.uuid;
    if (uuid) {
        productTagDao.findByUUID(uuid, function (err, productTag) {
            if (err) {
                util.showErr(res, err);
            } else {
                res.render(config.productTag.modifyPage, {
                    productTag: productTag
                });
            }
        });
    } else {
        res.render(config.productTag.modifyPage, {
            productTag: {}
        });
    }
});
//保存数据
router.route('/save').all(function (req, res) {
    var modelData = util.getParams(req,productTagDao,config.productTag.module);
    var str = "";
    var state = "ok";
    var json = {};
    if (modelData.uuid) {
        productTagDao.edit(modelData.uuid, modelData, function (err) {
            if (err) {
                str = err;
                state = "err";
            } else {
                str = "商品标签修改成功！";
            }
            json = message.parseJSON(state, str);
            res.send(json);
        });
    } else {
        productTagDao.add(modelData, function (err) {
            if (err) {
                str = err;
                state = "err";
            } else {
                str = "商品标签添加成功！";
            }
            json = message.parseJSON(state, str);
            res.send(json);
        });
    }
});
//删除数据
router.route('/del').all(function (req, res) {
    var modelData = util.getParams(req,productTagDao,config.productTag.module);
    var str = "";
    var state = "ok";
    var json = {};
    var uuids = modelData.uuid;
    productTagDao.del(uuids, function (err) {
        if (err) {
            str = err;
            state = "err";
        } else {
            str = "商品标签删除成功！";
        }
        json = message.parseJSON(state, str);
        res.send(json);
    });
});



module.exports = router;