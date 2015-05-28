module.exports = function(quick){
    quick.initConfig({
        //日志目录
        logFileFolder:"logs",
        //构建配置
        build:{
            path:"/home/johnkim/Desktop/test",
            filter:/^(node_modules|jquery|seajs|logs)$/i
        },
        //静态资源配置
        serve:{
            //监听路径
            root:"/home/johnkim/Desktop/a",
            //监听端口
            port:2000,
            //执行wrap条件，用户可覆盖此默认配置
            rules : function(pathname,ext){
                return pathname.indexOf('??')==-1 && ext=='js';
            }
        }
    });
};