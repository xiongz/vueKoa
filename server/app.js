var debug = require('debug')('vcard');
var koa = require('koa');
var cors = require('koa-cors');

var http = require('http');
var https = require('https')
var enforceHttps = require('koa-sslify');
var fs = require('fs');

var mongoose = require('mongoose-q')();
//配置文件
var config = require('./config/config');
var db = mongoose.createConnection(config.mongodb.url); //创建一个数据库连接
var Schema = mongoose.Schema;

var app = koa();

app.db = db;
app.Schema = Schema;
app.use(cors());
app.use(function *(next){
    this.set("X-Powered-By", "niuwap2p");
    this.set('Server', 'nws');
    //config 注入中间件，方便调用配置信息
    if(!this.config){
        this.config = config;
    }
    yield next;
});

//log记录
var Logger = require('mini-logger');
var logger = Logger({
    dir: config.logDir,
    categories: ['request','router','model','controller'],
    format: '[vcard.]YYYY-MM-DD-[{category}][.log]'
});

//router use : this.logger.error(new Error(''))
app.logger = logger;


app.use(function *(next) {
    var self = this;
    self.req._startTime = (new Date);
    var end = self.res.end;
    self.res.end = function(chunk, encoding) {
        self.res.responseTime = (new Date) - self.req._startTime;
        self.res.end = end;
        self.res.end(chunk, encoding);
        console.log(new Date().toLocaleString() + " - debug: HTTP " + self.req.method + " " + self.req.url + " " + self.res.statusCode + " " + self.res.responseTime)
        logger.request(new Date().toLocaleString() + " - debug: HTTP " + self.req.method + " " + self.req.url + " " + self.res.statusCode + " " + self.res.responseTime)
    };
    yield next;
});

// app.use(enforceHttps());

var onerror = require('koa-onerror');
onerror(app);

// //xtemplate对koa的适配
// var avViewApp = require('./common/lib/av-view');
// //xtemplate模板渲染
// avViewApp(app,{
//     //配置模板目录
//     views: config.viewDir
// });

//xtemplate模板引擎对koa的适配
var xtpl = require('xtpl/lib/koa');
//xtemplate模板渲染
xtpl(app,{
    //配置模板目录，指向工程的view目录
    views: config.viewDir
});

//session中间件
var session = require('koa-generic-session');

var MongoStore = require('koa-sess-mongo-store');
var sessionConfig = {
    store: new MongoStore(),
    prefix: 'doapp:sess:',
    key: 'doapp.sid'
};

app.use(session(sessionConfig));


//post body 解析
var bodyParser = require('koa-bodyparser');
app.use(bodyParser());
//数据校验
var validator = require('koa-validator');
app.use(validator());


//路由
var router = require('koa-router');
app.use(router(app));

//应用路由
var commonRouter = require('./router/common');
commonRouter(app);


// 前端路由 HTML5 的History
var historyApiFallback = require('./common/lib/history-koa-fallback');
app.use(historyApiFallback());

//静态文件cache
var staticCache = require('koa-static');
var staticDir = config.staticDir;
app.use(staticCache(staticDir));

// SSL options
//var options = {
//    key: fs.readFileSync('./common/root/rootCA.key'),  //ssl文件路径
//    cert: fs.readFileSync('./common/root/rootCA.pem')  //ssl文件路径
//};

// start the server
// http.createServer(app.callback()).listen(config.port);
// https.createServer(options, app.callback()).listen(443);

//
// console.log('https server is running');
////
// app.listen(config.port);
// console.log('listening on port %s',config.port);

module.exports = app;

