/**
 *商品类型路由
 */
var express = require('express');
var router = express.Router();
var util = require("../../util/util");
var productTypeDao = require('../../dao/product/productTypeDao');
//品牌dao
var productBrandDao = require('../../dao/product/productBrandDao');
//var productBrandDao = require('../../dao/product/productBrandDao');


var message = require("../../util/message");
var config = require("../../config");

//访问商品类型首页
router.route('/').all(function (req, res) {
    var params = util.getParams(req);
    res.render(config.product.index, {
        title: config.productType.title,
        action: config.productType.module.toLocaleLowerCase(),
        pageIndex: config.product.pageIndex,
        active: 'active'
    });
})


//访问列表
router.route('/list').all(function (req, res) {
    //var params=util.getParams(req);
    var totalCount = 10;
    console.log("商品类型-list......");
    var params = util.getParams(req, productTypeDao, config.productType.module);
    var searchText = "";
    var ary = [];
    var searchData = util.getSearchData(params);
    productTypeDao.count(searchData, function (err, totalCount) {
        if (err) {
            util.showErr(res, err);
        } else {
            res.render(config.productType.list, {
                title: '商品类型',
                data: JSON.stringify(params),
                pageSize: config.pageSize,
                totalCount: totalCount
            });
        }
    });
});

//ajax分页
router.route('/page').all(function (req, res) {
    var params = util.getParams(req, productTypeDao, config.productType.module);
    console.log(".......page");
    var currentPage = params.currentPage;
    var searchData = util.getSearchData(params);
    productTypeDao.page(currentPage, searchData, function (err, productTypes) {
        var json = {};
        json.data = productTypes;
        res.send(json);
    });
});

//跳转新增页面
router.route('/modify').all(function (req, res) {
    var params = util.getParams(req, productTypeDao, config.productType.module);
    var uuid = params.uuid;
    if (uuid) {
        productTypeDao.findByUUID(uuid, function (err, productType) {

            if (err) {
                util.showErr(res, err);
            } else {
                res.render(config.productType.modifyPage, {
                    productType: productType
                });
            }
        });
    } else {
        res.render(config.productType.modifyPage, {
            productType: {}
        });
    }
});
//保存数据
router.route('/save').all(function (req, res) {
    var modelData = util.getParams(req, productTypeDao, config.productType.module);
    var str = "";
    var state = "ok";
    var json = {};
    if (modelData.uuid) {
        productTypeDao.edit(modelData.uuid, modelData, function (err) {
            if (err) {
                str = err;
                state = "err";
            } else {
                str = "商品类型修改成功！";
            }
            json = message.parseJSON(state, str);
            res.send(json);
        });
    } else {
        productTypeDao.add(modelData, function (err) {
            if (err) {
                str = err;
                state = "err";
            } else {
                str = "商品类型添加成功！";
            }
            json = message.parseJSON(state, str);
            res.send(json);
        });
    }
});
//删除数据
router.route('/del').all(function (req, res) {
    var modelData = util.getParams(req, productTypeDao, config.productType.module);
    var str = "";
    var state = "ok";
    var json = {};
    var uuids = modelData.uuid;
    productTypeDao.del(uuids, function (err) {
        if (err) {
            str = err;
            state = "err";
        } else {
            str = "商品类型删除成功！";
        }
        json = message.parseJSON(state, str);
        res.send(json);
    });
});

//跳转 关联规格 关联品牌
router.route('/relationspec').all(function (req, res) {
    var modelData = util.getParams(req, productTypeDao, config.productType.module);
    var type = modelData.type;
    var uuids=modelData.uuids;
    if (type == 2) { //关联品牌
        productBrandDao.setModelName(config[config.productBrand.module]["module"]);
        productBrandDao.findAll(function (err, brands) {
            if (err) {
                util.showErr(res, err);
            } else {

                res.render(config.productType.relationspec, {
                    list: brands,
                    type: type,
                    uuids:uuids
                });
            }
        });
    } else if (type == 3) { //关联规格
        res.render(config.productType.relationspec, {
            list: [],
            type: type,
            uuids:uuids
        });
    }
});


//保存 品牌 或 规格的 uuid
router.route('/saveUUID').all(function (req, res) {
    var modelData = util.getParams(req, productTypeDao, config.productType.module);
    var type = modelData.type;
    var data = {};
    var typeName = "品牌";
    var state = "ok";
    var str = "";
    if (type == 2) { //修改品牌
        data.brand = modelData.uuids;
    } else if (type == 3) { //修改规格
        typeName = "规格";
        data.specifications = modelData.uuids;
    }
    productTypeDao.edit(modelData.uuid, data, function (err) {

        if (err) {
            str = err;
            state = "err";
        } else {
            str = typeName + "保存成功！";
        }
        json = message.parseJSON(state, str);
        res.send(json);
    });

})



module.exports = router;