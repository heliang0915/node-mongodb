/**
 *商品参数路由
 */
var express = require('express');
var router = express.Router();
var util = require("../../util/util");
var productParamsDao = require('../../dao/product/productParamsDao');
var message = require("../../util/message");
var config = require("../../config");

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
                action: config.productParams.module.toLocaleLowerCase(),
                pageIndex: config.product.pageIndex,
                list: params,
                ref: searchData.ref,
                uuid: uuid,
                active: 'active'
            });
        }

    })


})


////访问列表
//router.route('/list').all(function (req, res) {
//    //var params=util.getParams(req);
//    var totalCount=10;
//    console.log("商品参数-list......");
//    var searchData = util.getParams(req, productParamsDao, config.productParams.module);
//    //var searchText = "";
//    //var ary = [];
//   // var searchData = util.getSearchData(params);
//
//    productParamsDao.find(searchData,function(err,list){
//        if (err) {
//            util.showErr(res, err);
//        } else {
//            console.log(list);
//            res.render(config.productParams.list, {
//                title: '商品参数',
//                data: JSON.stringify(params),
//                list:list
//            });
//        }
//    })
//
//    //productParamsDao.count(searchData, function (err, totalCount) {
//    //    if (err) {
//    //        util.showErr(res, err);
//    //    } else {
//    //        res.render(config.productParams.list, {
//    //            title: '商品参数',
//    //            data: JSON.stringify(params),
//    //            //searchText: searchText,
//    //            pageSize: config.pageSize,
//    //            totalCount: totalCount
//    //        });
//    //    }
//    //});
//});

////ajax分页
//router.route('/page').all(function (req, res) {
//    var params = util.getParams(req,productParamsDao,config.productParams.module);
//    console.log(".......page");
//    var currentPage = params.currentPage;
//    var searchData = util.getSearchData(params);
//    productParamsDao.page(currentPage, searchData, function (err, productParamss) {
//        var json = {};
//        json.data = productParamss;
//        res.send(json);
//    });
//});

////跳转新增页面
//router.route('/modify').all(function (req, res) {
//    var params = util.getParams(req, productParamsDao, config.productParams.module);
//    var uuid = params.uuid;
//    if (uuid) {
//        productParamsDao.findByUUID(uuid, function (err, productParams) {
//            if (err) {
//                util.showErr(res, err);
//            } else {
//                res.render(config.productParams.modifyPage, {
//                    productParams: productParams
//                });
//            }
//        });
//    } else {
//        res.render(config.productParams.modifyPage, {
//            productParams: {}
//        });
//    }
//});
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