module.exports = function(quick){
    quick.initConfig({
        //日志目录
        logFileFolder:"logs2",
        //构建配置
        build:{
            path:"/home/johnkim/Documents/git/org-quickjs-app/src/main/webapp/src/js/seajs-module/static/page",
            filter:/^(node_modules|jquery|seajs|logs)$/i
        },
        //静态资源配置
        serve:{
            root:"/home/johnkim/Documents/git/org-quickjs-app/src/main/webapp/src/js/seajs-module",
            port:1111
        }
    });
};