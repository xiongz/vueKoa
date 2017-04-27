//应用配置文件
var path = require('path');
var local = require('./local');
var _ = require('underscore');
var config = {
    "title":"",
    //默认生产环境
    "env":"production",
    "appName": "vcard",
    //端口号配置
    "port": 9900,
    //模板所在的目录
    "viewDir": path.join(__dirname,'..','view'),
    //log所在的目录
    "logDir": '/usr/local/log/nodejs',
    //静态文件所在的目录
    "staticDir": path.join(__dirname,'../../', 'public'),
    // session配置
    sessionconfig:{
        sessionCookieName: 'dasessionid',
        url :"mongodb://192.168.101.180:27017/dasession",
        ttl:"20*60",
        cookie: {
            path: '/',
            httpOnly: true,
            secure: false,
            // domain: 'i-niuwa.com'
        }
    },
    // db配置
    mongodb:{
        url :"mongodb://192.168.101.180:27017/vcard",
    }


};

//当NODE_ENV环境变量值为local时
//本地调试环境
if(process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development'){
    config = _.extend(config,local);
}

module.exports = config;
