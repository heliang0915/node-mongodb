/**
 *商品品牌路由
 */
var express = require('express');
var router = express.Router();
var util = require("../../../util/util");
var productBrandDao = require('../../../dao/product/productBrandDao');
var message = require("../../../util/message");
var config = require("../../../config");

//访问商品品牌首页
router.route('/').all(function (req, res) {
    var params = util.getParams(req);
    console.log(params);
    res.render(config.product.index, {title:config.productBrand.title,action:config.productBrand.action.toLocaleLowerCase(), pageIndex: config.product.pageIndex, active: 'active'});
})


//访问列表
router.route('/list').all(function (req, res) {
    var totalCount = 10;
    console.log("商品品牌-list......");
    var params = util.getParams(req, productBrandDao, config.productBrand.module);
    var searchText = "";
    var ary = [];
    var searchData = util.getSearchData(params);
    productBrandDao.count(searchData, function (err, totalCount) {
        if (err) {
            util.showErr(res, err);
        } else {
            res.render(config.productBrand.list, {
                title: '商品品牌',
                data: JSON.stringify(params),
                pageSize: config.pageSize,
                totalCount: totalCount
            });
        }
    });
});

//ajax分页
router.route('/page').all(function (req, res) {
    var params = util.getParams(req, productBrandDao, config.productBrand.module);
    console.log(".......page");
    var currentPage = params.currentPage;
    var searchData = util.getSearchData(params);
    console.log(searchData)

    productBrandDao.page(currentPage, searchData, function (err, productBrands) {
        if(err){
            console.log(err);

        }else{
            console.log("productBrands"+productBrands.length);
            var json = {};
            json.data = productBrands;
            res.send(json);
        }

    });
});

//跳转新增页面
router.route('/modify').all(function (req, res) {
    var params = util.getParams(req, productBrandDao, config.productBrand.module);
    var uuid = params.uuid;
    if (uuid) {
        productBrandDao.findByUUID(uuid, function (err, productBrand) {
            if (err) {
                util.showErr(res, err);
            } else {
                res.render(config.productBrand.modifyPage, {
                    productBrand: productBrand
                });
            }
        });
    } else {
        res.render(config.productBrand.modifyPage, {
            productBrand: {}
        });
    }
});
//保存数据
router.route('/save').all(function (req, res) {
    var modelData = util.getParams(req, productBrandDao, config.productBrand.module);
    var str = "";
    var state = "ok";
    var json = {};
    if (modelData.uuid) {
        productBrandDao.edit(modelData.uuid, modelData, function (err) {
            if (err) {
                str = err;
                state = "err";
            } else {
                str = "商品品牌修改成功！";
            }
            json = message.parseJSON(state, str);
            res.send(json);
        });
    } else {
        productBrandDao.add(modelData, function (err) {
            if (err) {
                str = err;
                state = "err";
            } else {
                str = "商品品牌添加成功！";
            }
            json = message.parseJSON(state, str);
            res.send(json);
        });
    }
});
//删除数据
router.route('/del').all(function (req, res) {
    var modelData = util.getParams(req, productBrandDao, config.productBrand.module);
    var str = "";
    var state = "ok";
    var json = {};
    var uuids = modelData.uuid;
    productBrandDao.del(uuids, function (err) {
        if (err) {
            str = err;
            state = "err";
        } else {
            str = "商品品牌删除成功！";
        }
        json = message.parseJSON(state, str);
        res.send(json);
    });
});
module.exports = router;