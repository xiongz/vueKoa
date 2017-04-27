var parse = require('co-busboy');
var fs = require('fs');
var os = require('os');
var path = require('path');
var utils = require("../common/utils");

var controller = {};

controller.hello = function *() {
    this.body = utils.successResult({msg: "hello world"});
}

module.exports = controller;
