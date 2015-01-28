var quick = module.exports = require('quick-plugins');

//exports cli object
quick.cli = {};

quick.cli.name = 'quick';

//colors
quick.cli.colors = require('colors');

//commander object
quick.cli.commander = null;

//package.json
//TODO
quick.cli.pkg = require('./package.json');

//output version info
quick.cli.version = function(){
    var content = [
        '',
        '   '+('v' + quick.cli.pkg.version).bold.green,
        '',
        '   Quickly build your module'.bold.red,
        '',
        '   More: http://www.quickjs.org'.bold.yellow,
        '',
        '',
    ].join('\n');
    console.log(content);
};

quick.cli.help = function(){
    var content = [
        '',
        '  Usage: ' + quick.cli.name.bold.yellow + ' <command>',
        '',
        '  Commands:',
        ''
    ];

    quick.cli.help.commands.forEach(function(name){
        var cmd = quick.require('command', name);
        name = cmd.name || name;
        name = pad(name, 12);
        content.push('    ' + name + (cmd.desc || ''));
    });

    content = content.concat([
        '',
        '  Options:',
        '',
        '    -h, --help     output usage information',
        '    -v, --version  output the version number',
        '    --no-color     disable colored output',
        ''
    ]);
    console.log(content.join('\n'));
};
quick.cli.help.commands = [ 'build','serve' ];

quick.require = function(){
    var path;
    var name = Array.prototype.slice.call(arguments, 0).join('-');
    if(quick.require._cache.hasOwnProperty(name)) return quick.require._cache[name];
    var names = [];
    for(var i = 0, len = quick.require.prefixes.length; i < len; i++){
        try {
            var pluginName = quick.require.prefixes[i] + '-' + name;
            names.push(pluginName);
            path = require.resolve(pluginName);
            try {
                return quick.require._cache[name] = require(pluginName);
            } catch (e){
                quick.log.error('load plugin [' + pluginName + '] error : ' + e.message);
            }
        } catch (e){}
    }
    quick.log.error('unable to load plugin [' + names.join('] or [') + ']');
};

quick.require._cache = {};

quick.require.prefixes = ['quick'];

var pad = function(str, len, fill, pre){
    if(str.length < len){
        fill = (new Array(len)).join(fill || ' ');
        if(pre){
            str = (fill + str).substr(-len);
        } else {
            str = (str + fill).substring(0, len);
        }
    }
    return str;
};

//run cli tools
quick.cli.run = function(argv){

    if(quick.util.hasArgv(argv, '--no-color')){
        quick.cli.colors.mode = 'none';
    }

    var first = argv[2];
    if(argv.length < 3 || first === '-h' ||  first === '--help'){
        quick.cli.help();
    } else if(first === '-v' || first === '--version'){
        quick.cli.version();
    } else if(first[0] === '-'){
        quick.cli.help();
    } else {
        //register command
        var commander = quick.cli.commander = require('commander');
        var cmd = quick.require('command', argv[2]);
        cmd.register(
            commander
                .command(cmd.name || first)
                .usage(cmd.usage)
                .description(cmd.desc)
        ,quick);
        commander.parse(argv);
    }
};
