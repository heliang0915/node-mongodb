/**
 *商品参数路由
 */
var express = require('express');
var router = express.Router();
var util = require("../../../util/util");
var productParamsDao = require('../../../dao/product/productParamsDao');
var message = require("../../../util/message");
var config = require("../../../config");

//访问商品参数首页
router.route('/').all(function (req, res) {
    var searchData = util.getParams(req, productParamsDao, config.productParams.module);
    //console.log(params);

    productParamsDao.find(searchData, function (err, list) {
        if (err) {
            util.showErr(res, err);
        } else {
            var params={};
            var uuid="";
            if(list&&list.length){
                params=list[0].params;
                uuid=list[0].uuid;
                params=JSON.parse(params);
            }

            res.render(config.productParams.list, {
                title: config.productParams.title,
                action: config.productParams.action.toLocaleLowerCase(),
                pageIndex: config.product.pageIndex,
                list: params,
                ref: searchData.ref,
                uuid: uuid,
                active: 'active'
            });
        }

    })


})
 
//保存数据
router.route('/save').all(function (req, res) {
    var modelData = util.getParams(req, productParamsDao, config.productParams.module);
    var str = "";
    var state = "ok";
    var json = {};
    if (modelData.uuid) {
        productParamsDao.edit(modelData.uuid, modelData, function (err) {
            if (err) {
                str = err;
                state = "err";
            } else {
                str = "商品参数保存成功！";
            }
            json = message.parseJSON(state, str);
            res.send(json);
        });
    } else {
        productParamsDao.add(modelData, function (err) {
            if (err) {
                str = err;
                state = "err";
            } else {
                str = "商品参数保存成功！";
            }
            json = message.parseJSON(state, str);
            res.send(json);
        });
    }
});
//删除数据
router.route('/del').all(function (req, res) {
    var modelData = util.getParams(req, productParamsDao, config.productParams.module);
    var str = "";
    var state = "ok";
    var json = {};
    var uuids = modelData.uuid;
    productParamsDao.del(uuids, function (err) {
        if (err) {
            str = err;
            state = "err";
        } else {
            str = "商品参数删除成功！";
        }
        json = message.parseJSON(state, str);
        res.send(json);
    });
});


module.exports = router;