module.exports = function(quick){
    quick.initConfig({
        //日志目录
        logFileFolder:"logs",
        //构建配置
        build:{
            path:"/home/seajs-module/static/page",
            filter:/^(node_modules|jquery|seajs|logs)$/i
        },
        //静态资源配置
        serve:{
            root:"/home/seajs-module",
            port:2000
        },
        rules : function(pathname,ext){//执行wrap条件，用户可覆盖此默认配置
            return pathname.indexOf('sea-modules/')!=-1 && ext=='js';
        }
    });
};