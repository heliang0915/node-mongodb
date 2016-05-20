/**
 *商品属性路由
 */
var express = require('express');
var router = express.Router();
var util = require("../../../util/util");
var productAttrDao = require('../../../dao/product/productAttrDao');
var message = require("../../../util/message");
var config = require("../../../config");

//访问商品属性首页
router.route('/').all(function (req, res) {
    var params = util.getParams(req);
    console.log("访问商品属性首页");
    console.log(params);
    res.render(config.product.index, {
        title: config.productAttr.title,
        action: config.productAttr.action.toLocaleLowerCase(),
        pageIndex: config.product.pageIndex,
        active: 'active'
    });
})

//访问列表
router.route('/list').all(function (req, res) {
    var totalCount = 10;
    console.log("商品属性-list......");
    var params = util.getParams(req, productAttrDao, config.productAttr.module);
    var searchData = util.getSearchData(params);
    var uuids=params.uuids;
    productAttrDao.count(searchData, function (err, totalCount) {
        if (err) {
            util.showErr(res, err);
        } else {
            res.render(config.productAttr.list, {
                title: '商品类型',
                data: JSON.stringify(params),
                pageSize: config.pageSize,
                uuid: uuids,
                totalCount: totalCount
            });
        }
    });
});

//ajax分页
router.route('/page').all(function (req, res) {
    var params = util.getParams(req,productAttrDao,config.productAttr.module);
    console.log(".......page");
    var currentPage = params.currentPage;
    var searchData = util.getSearchData(params);
    productAttrDao.page(currentPage, searchData, function (err, productAttr) {
        var json = {};
        json.data = productAttr;
        res.send(json);
    });
});

//保存数据
router.route('/save').all(function (req, res) {
    var modelData = util.getParams(req, productAttrDao, config.productAttr.module);
    var str = "";
    var state = "ok";
    var json = {};
    if (modelData.uuid) {
        productAttrDao.edit(modelData.uuid, modelData, function (err) {
            if (err) {
                str = err;
                state = "err";
            } else {
                str = "商品属性保存成功！";
            }
            json = message.parseJSON(state, str);
            res.send(json);
        });
    } else {
        productAttrDao.add(modelData, function (err) {
            if (err) {
                str = err;
                state = "err";
            } else {
                str = "商品属性保存成功！";
            }
            json = message.parseJSON(state, str);
            res.send(json);
        });
    }
});
//删除数据
router.route('/del').all(function (req, res) {
    var modelData = util.getParams(req, productAttrDao, config.productAttr.module);
    var str = "";
    var state = "ok";
    var json = {};
    var uuids = modelData.uuid;
    productAttrDao.del(uuids, function (err) {
        if (err) {
            str = err;
            state = "err";
        } else {
            str = "商品属性删除成功！";
        }
        json = message.parseJSON(state, str);
        res.send(json);
    });
});


module.exports = router;