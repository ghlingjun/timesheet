fis.set('public', '/public'); //client编译后文件所在的目录
fis.set('project.ignore', [
    'mock/**',
    'node_modules/**',
    'server/**',
    '.idea.**',
    '.git/**',
    '.gitignore',
    'fis-conf.js',
    'node*.bat',
    'package.json',
    '**.md'
]);
fis.config.set("project.watch.usePolling", true);
// npm install -g fis-parser-less-2.x
fis.match('**.less', {
    rExt: '.css', // from .less to .css
    useSprite: true,
    //optimizer: fis.plugin('clean-css'),
    parser: fis.plugin('less-2.x', {
        // fis-parser-less-2.x option
    }),
    postprocessor: fis.plugin('autoprefixer')
});
//打包
fis.match('::package', {
    postpackager: fis.plugin('loader'),
    packager: fis.plugin('map')
});
//JS打包libs
fis.match('/client/assets/libs/**.js', {
    packTo: '/client/assets/pkg/libs.js',
    packOrder: 2
});
fis.match('/client/assets/libs/jquery/jquery-2.2.4.js', {
    packTo: '/client/assets/pkg/libs.js',
    packOrder: 1
});
fis.match('/client/assets/libs/enc-base64.js', {
    packTo: '/client/assets/pkg/libs.js',
    packOrder: 3
});
fis.match('/client/assets/libs/bootstrap-table/bootstrap-table-zh-CN.js', {
    packTo: '/client/assets/pkg/libs.js',
    packOrder: 3
});

//JS打包global
fis.match('/client/assets/js/modules/**.js', {
    packTo: '/client/assets/pkg/global.js'
});
fis.match('/client/assets/js/build/template.js', {
    packTo: '/client/assets/pkg/global.js'
});
fis.match('/client/assets/js/tms.js', {
    packTo: '/client/assets/pkg/global.js'
});

//CSS打包libs
fis.match('/client/assets/libs/**.css', {
    packTo: '/client/assets/pkg/libs.css',
    packOrder: 1
});

fis.match('/client/assets/(**)', {
    release: '${public}/assets/$1',
    url: '/assets/$1'
});

fis.match('/client/views/(**)', {
    release: '/views/$1'
});

fis.match('/client/(favicon.ico)', {
    release: '${public}/$1',
    url: '/$1'
});

fis.match('/client/assets/*/pages/*{.js,.less}', {
    useHash: true
});
fis.match('/client/assets/pkg/*{.js,.css}', {
    useHash: true
});
/*fis.match('/server/(**)', {
    deploy: fis.plugin('local-deliver', {
        to: deploy
    })  release:'${public}/$1',
 url:'/$1'
});*/
fis.match('/client/**.js', {
    optimizer: fis.plugin('uglify-js')
});
fis.match('/client/**.{less,css}', {
    optimizer: fis.plugin('clean-css')
});
//fis3 release debug ,开发调试环境,
fis.set('date', new Date);
fis.media('debug')
    .match('/client/**{js,css}', {
        useHash: false
    })
    .match('/client/assets/*/pages/*{.js,.less}', {
        //query: '?t='+ (fis.get('date').getTime()),
        //domain:'http://xxxx.cn',
        useHash: false,
        optimizer: null
    });


/*fis.match('/client/assets/js/build/**.js', {
    useHash: false
});*/