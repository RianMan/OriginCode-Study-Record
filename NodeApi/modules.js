/**
 *     为什么require是同步的？
 *     因为缓存（require.cache）
 *     var a = require('a.js');
 *     var a = require('a.js');
 */
console.log(module);
/**
 * Module {
  id: '.', 当前的路径
  exports: {}, 导出项目
  parent: null,  父级模块
  filename:  绝对路径值
   '/Users/jinyan/PersonProject/OriginCodeJs/OriginCode-Study-Record/NodeApi/modules.js',
  loaded: false,
  children: [],  引入的文件
  paths:  path模块的一级级目录
   [ '/Users/jinyan/PersonProject/OriginCodeJs/OriginCode-Study-Record/NodeApi/node_modules',
     '/Users/jinyan/PersonProject/OriginCodeJs/OriginCode-Study-Record/node_modules',
     '/Users/jinyan/PersonProject/OriginCodeJs/node_modules',
     '/Users/jinyan/PersonProject/node_modules',
     '/Users/jinyan/node_modules',
     '/Users/node_modules',
     '/node_modules' ] }
 */
// console.log(require.resolve);
/** 
 * { [Function: require]
  resolve: { [Function: resolve] paths: [Function: paths] },
  ----- 只想知道模块的路劲，但是又不想加载模块的代码 -----


  main:
   Module {
     id: '.',
     exports: {},
     parent: null,
     filename:
      '/Users/jinyan/PersonProject/OriginCodeJs/OriginCode-Study-Record/NodeApi/modules.js',
     loaded: false,
     children: [],
     paths:
      [ '/Users/jinyan/PersonProject/OriginCodeJs/OriginCode-Study-Record/NodeApi/node_modules',
        '/Users/jinyan/PersonProject/OriginCodeJs/OriginCode-Study-Record/node_modules',
        '/Users/jinyan/PersonProject/OriginCodeJs/node_modules',
        '/Users/jinyan/PersonProject/node_modules',
        '/Users/jinyan/node_modules',
        '/Users/node_modules',
        '/node_modules' ] },
    ------ 指的入口模块 ----

  extensions:
   { '.js': [Function], '.json': [Function], '.node': [Function] },

 ---------在node 中只有三种模块 （
    1. js 模块 
    2. json 模块 ， 先找到文件 ，然后用json.parse
    3. node 模块 ， 用c++ 扩展成二进制模块
    当require加载文件的时候，首先会找文件名， 找不到会找**.js,然后再找**.json文件
---------

  cache:
   { '/Users/jinyan/PersonProject/OriginCodeJs/OriginCode-Study-Record/NodeApi/modules.js':
      Module {
        id: '.',
        exports: {},
        parent: null,
        filename:
         '/Users/jinyan/PersonProject/OriginCodeJs/OriginCode-Study-Record/NodeApi/modules.js',
        loaded: false,
        children: [],
        paths: [Array] } } }
 * */ 