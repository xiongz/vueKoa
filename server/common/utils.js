/**
 * Created by xiongze on 2017/4/20.
 */
var constant = require("./constant")
var utils = {};

// 相应数据
function resultVo(code, data, msg) {
    this.code = code;
    this.data = data;
    this.msg = msg;
}


utils.failResult = function (code, data ,msg) {
    return new resultVo(code, data, msg)
}

utils.successResult = function (data) {
    return new resultVo(constant.success, data, "成功")
}


module.exports = utils;
