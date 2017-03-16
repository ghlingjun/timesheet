## tm_timesheet

工时项目
git 地址：http://192.168.1.207:1111/summary/tm_timesheet.git

克隆到本地目录：

step1：在根目录下执行命令npm install
(生成fis3构建相关的node_modules等)

step2：执行批处理文件：node自动编译_www本地.bat
(把根目录下client下面的静态资源部署到server目录)

step3：server目录默认不包含发布的node_modules目录
(部署时需要手动复制根目录下的node_modules到server，node运行有依赖)

step4：webstorm下启动server/bin/www
 （有时server没有reload最新的文件,webstorm下刷新server，确保server是生成的最新文件)
http://127.0.0.1:88/

================================================

引用类库：jquery,bootstrap,相关插件

表格bootstrap-table：http://bootstrap-table.wenzhixin.net.cn/examples/

字体库引用路径：http://www.fontawesome.com.cn/faicons/

客户端目录client

*页面相关js路径：client/assets/js/pages/**.js

*样式相关less路径: client/assets/css/pages/**.less

*页面html模板路径(即首屏渲染路径)：client/views/**.html

*异步渲染模板路径(首屏渲染支持公用)：client/views/templates/tpl/**.html

Node端目录server

路由目录：server/routes/**.js

执行批处理文件：node自动编译_www本地.bat

================================================
Mock Server

安装API模拟服务器：npm install -g mockable

启动模拟服务器：mockable mock -p 91 （根目录下执行或运行MockServer bat文件）

客户端访问mockserver时，修改config.js

const request_host = "http://127.0.0.1:91/";









