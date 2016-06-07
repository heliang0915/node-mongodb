/**
 * 商品分类 路由
 */
var express = require('express');
var router = express.Router();
var util = require("../../../util/util");
var productCategoryDao = require('../../../dao/product/productCategoryDao');
var productTypeDao = require('../../../dao/product/productTypeDao');
var message = require("../../../util/message");
var config = require("../../../config");

//访问商品分类首页
router.route('/').all(function (req, res) {

    var params = util.getParams(req);
    console.log(params);
    res.render(config.product.index, {
        title: config.productCategory.title,
        action: config.productCategory.action.toLocaleLowerCase(),
        pageIndex: config.product.pageIndex,
        active: 'active'
    });
})


//访问列表
router.route('/list').all(function (req, res) {
    var totalCount = 10;
    console.log("商品分类-list......");
    var params = util.getParams(req, productCategoryDao, config.productCategory.module);
    var searchText = "";
    var ary = [];
    var searchData = util.getSearchData(params);
    productCategoryDao.count(searchData, function (err, totalCount) {
        if (err) {
            util.showErr(res, err);
        } else {
            res.render(config.productCategory.list, {
                title: '商品分类',
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
    var params = util.getParams(req, productCategoryDao, config.productCategory.module);
    console.log(".......page>>>>>11");
    var currentPage = params.currentPage;
    var searchData = util.getSearchData(params);
    productCategoryDao.page(currentPage, searchData, function (err, productCategorys) {
        var count = 0;
        var len = productCategorys.length;
        if(len==0){
            var json = {};
            json.data = [];
            res.send(json);
        }else{
            productCategorys.forEach(function (productCategory) {
                //获取商品类型
                productTypeDao.setModelName(config[config.productType.module]["module"]);
                //查询产品类型
                productTypeDao.find({uuid: productCategory.productType}, function (err, productType) {
                    count++;
                    if (err) {
                        util.showErr(res, err);
                    } else {
                        if (productType[0]) {
                            productCategory._doc.typeName = productType[0].typeName;
                        } else {
                            productCategory._doc.typeName = "";
                        }
                    }
                    if (count == len) {
                        var json = {};
                        json.data = productCategorys;
                        res.send(json);
                    }

                });
            })
        }


    }, {order: 1});
});

//跳转新增页面
router.route('/modify').all(function (req, res) {
    var params = util.getParams(req, productCategoryDao, config.productCategory.module);
    var uuid = params.uuid;
    if (uuid) {
        productCategoryDao.findByUUID(uuid, function (err, productCategory) {
            if (err) {
                util.showErr(res, err);
            } else {
                //获取商品类型
                productTypeDao.setModelName(config[config.productType.module]["module"]);
                //查询产品类型
                productTypeDao.findAll(function (err, productTypes) {
                    if (err) {
                        util.showErr(res, err);
                    } else {
                        res.render(config.productCategory.modifyPage, {
                            productCategory: productCategory,
                            productTypes: productTypes
                        });

                    }
                });
            }
        });
    } else {
        res.render(config.productCategory.modifyPage, {
            productCategory: {},
            productTypes: []
        });
    }
});
//保存数据
router.route('/save').all(function (req, res) {
    var modelData = util.getParams(req, productCategoryDao, config.productCategory.module);
    var str = "";
    var state = "ok";
    var json = {};
    if (modelData.uuid) {
        productCategoryDao.edit(modelData.uuid, modelData, function (err) {
            if (err) {
                str = err;
                state = "err";
            } else {
                str = "商品分类修改成功！";
            }
            json = message.parseJSON(state, str);
            res.send(json);
        });
    } else {
        console.log(modelData);
        productCategoryDao.add(modelData, function (err) {
            if (err) {
                str = err;
                state = "err";
            } else {
                str = "商品分类添加成功！";
            }
            json = message.parseJSON(state, str);
            res.send(json);
        });
    }
});
//删除数据
router.route('/del').all(function (req, res) {
    var modelData = util.getParams(req, productCategoryDao, config.productCategory.module);
    var str = "";
    var state = "ok";
    var json = {};
    var uuids = modelData.uuid;
    productCategoryDao.del(uuids, function (err) {
        if (err) {
            str = err;
            state = "err";
        } else {
            str = "商品分类删除成功！";
        }
        json = message.parseJSON(state, str);
        res.send(json);
    });
});


//得到上级分类tree数据
router.route('/getCategoryRankTree').all(function (req, res) {
    var modelData = util.getParams(req, productCategoryDao, config.productCategory.module);
    var pid = -1;
    var id = "";
    if (modelData.pid) {
        pid = modelData.pid;
    }
    if (modelData.id) {
        id = modelData.id;
    }
    var tree = [];
    var counter = 0;
    productCategoryDao.getTreeData(pid, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            if (docs) {
                if (docs.length > 0) {
                    docs.forEach(function (item) {
                        var node = {};
                        node["id"] = item.uuid;
                        node["name"] = item.categoryName;
                        //(function (node, item) {
                        productCategoryDao.isParent(item.uuid, function (err, isParent) {
                            if (err) {
                                console.log(err);
                            } else {
                                ++counter;
                                node["isParent"] = isParent;
                                if (id) {
                                    if (id != item.uuid) {
                                        tree.push(node);
                                    }
                                } else {
                                    tree.push(node);
                                }

                                if (counter == docs.length) {
                                    console.log("tree" + tree);
                                    res.send(tree);
                                }
                            }
                        })
                        //})(node, item)
                    })
                } else {
                    res.send(tree);
                }

            } else {
                res.send(tree);
            }


        }
    });
})

module.exports = router;