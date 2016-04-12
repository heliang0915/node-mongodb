/**
 *商品规格路由
 */
var express = require('express');
var router = express.Router();
var util=require("../../util/util");
var productSpecificationsDao = require('../../dao/product/productSpecificationsDao');
var message = require("../../util/message");
var config=require("../../config");

//访问商品规格首页
router.route('/').all(function (req, res) {
    var params=util.getParams(req);
    console.log(params);
    res.render(config.product.index, {title:config.productSpecifications.title,action:config.productSpecifications.module.toLocaleLowerCase(), pageIndex:config.product.pageIndex,active:'active'});
})


//访问列表
router.route('/list').all(function (req, res) {
    //var params=util.getParams(req);
    var totalCount=10;
    console.log("商品规格-list......");
    var params = util.getParams(req, productSpecificationsDao, config.productSpecifications.module);
    var searchText = "";
    var ary = [];
    var searchData = util.getSearchData(params);
    productSpecificationsDao.count(searchData, function (err, totalCount) {
        if (err) {
            util.showErr(res, err);
        } else {
            res.render(config.productSpecifications.list, {
                title: '商品规格',
                data: JSON.stringify(params),
                //searchText: searchText,
                pageSize: config.pageSize,
                totalCount: totalCount
            });
        }
    });
});

//ajax分页
router.route('/page').all(function (req, res) {
    var params = util.getParams(req,productSpecificationsDao,config.productSpecifications.module);
    console.log(".......page");
    var currentPage = params.currentPage;
    var searchData = util.getSearchData(params);
    productSpecificationsDao.page(currentPage, searchData, function (err, productSpecifications) {
        var json = {};
        json.data = productSpecifications;
        res.send(json);
    });
});

//跳转新增页面
router.route('/modify').all(function (req, res) {
    var params = util.getParams(req,productSpecificationsDao,config.productSpecifications.module);
    var uuid = params.uuid;
    if (uuid) {
        productSpecificationsDao.findByUUID(uuid, function (err, productSpecifications) {
            if (err) {
                util.showErr(res, err);
            } else {
                res.render(config.productSpecifications.modifyPage, {
                    productSpecifications: productSpecifications
                });
            }
        });
    } else {
        res.render(config.productSpecifications.modifyPage, {
            productSpecifications: {}
        });
    }
});
//保存数据
router.route('/save').all(function (req, res) {
    var modelData = util.getParams(req,productSpecificationsDao,config.productSpecifications.module);
    var str = "";
    var state = "ok";
    var json = {};
    if (modelData.uuid) {
        productSpecificationsDao.edit(modelData.uuid, modelData, function (err) {
            if (err) {
                str = err;
                state = "err";
            } else {
                str = "商品规格修改成功！";
            }
            json = message.parseJSON(state, str);
            res.send(json);
        });
    } else {
        productSpecificationsDao.add(modelData, function (err) {
            if (err) {
                str = err;
                state = "err";
            } else {
                str = "商品规格添加成功！";
            }
            json = message.parseJSON(state, str);
            res.send(json);
        });
    }
});
//删除数据
router.route('/del').all(function (req, res) {
    var modelData = util.getParams(req,productSpecificationsDao,config.productSpecifications.module);
    var str = "";
    var state = "ok";
    var json = {};
    var uuids = modelData.uuid;
    productSpecificationsDao.del(uuids, function (err) {
        if (err) {
            str = err;
            state = "err";
        } else {
            str = "商品规格删除成功！";
        }
        json = message.parseJSON(state, str);
        res.send(json);
    });
});



module.exports = router;