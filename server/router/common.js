var controller = require('../controller/common');
module.exports = function(app){
    //首页
    app.get('/api/hello',controller.hello);
};
