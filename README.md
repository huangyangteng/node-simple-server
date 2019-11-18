# nodejs编写测试接口

>node启动地址：http://10.1.62.116:55555/
>
>github地址：https://github.com/huangyangteng/node-simple-server.git

[toc]

# 项目说明

本项目用于为拨测项目提供测试接口，采用原生nodejs编写，数据统一储存在文件中，为减少代码编写量，文件操作均采用同步方式。

# 项目结构

```js
server.js         ---------------启动服务器
Controller.js     --------------- 所有的接口逻辑合集
MAP_URL.js        --------------- url与接口逻辑的对应管理
data              --------------- 数据，使用.json文件储存
api               --------------- 接口逻辑分模块划分
```

# 项目启动

## 开发环境启动

使用`nodemon`工具进行调试，保存后自动执行

```shell
nodemon server.js
```

## 生产环境启动

```shell
# 启动服务为进程
pm2 start server.js --name node-monitor
# 查看日志
pm2 log
# 杀死进程
pm2 delete node-monitor
# 重启服务
pm2 restart node-monitor
```





# 编写接口流程

## 接口规范

* 后台处理的请求格式为 `json` 格式，即`Content-type:application/json`
* 后台响应的数据格式也为`json`格式

## 说明

* get请求的参数，这种形式：'?name=ming&pass=12'从`req.query`中取到
* get请求的参数，这种形式：'/user/123'从`req.params`中取到
* post请求的参数从`req.data`中取到
* 数据使用文件保存，不使用数据库

## 流程-例子


以`角色管理`为例，接口文档如下：

![image-20191106144547451](https://tva1.sinaimg.cn/large/006y8mN6ly1g8obh03khaj30kg0kijtk.jpg)

##  第一步 新建数据

在`data`目录下新建`role.json`

## 第二步 编写接口

在`api`目录下新建`role.js`,引入相应依赖，并导出role对象

```js
const fs=require('fs')

const Res=require('./resCommon')



const role={
	all(){//获取所有角色
        let resData=JSON.parse(fs.readFileSync('data/role.json').toString())
        return Res.success(resData)
  },
  add(){//增加一条数据
    
  }
}

module.exports=role
```

## 第三步 在`Controller.js`中导入并导出该接口

`Controller.js`文件统一管理所有接口

```js
const administrator=require('./api/administrator')
const task=require('./api/task')
const error=require('./api/error')
const role=require('./api/role')
const province=require('./api/province')

const Controller={
    administrator,
    task,
    error,
    role,
    province
}
module.exports=Controller
```

## 第四步 建立url和接口的映射关系

在`MAP_URL.JS`文件中建立url和接口的映射关系

```js
const Controller=require('./Controller')

function getMapKey(map,url){
    for(var key in map){
        if(url==key){///匹配顺序 user -> /user/add ->/login.html 
            return key
        }else if(url.indexOf(key) != -1){
            return key
        }
    }
}

const {administrator,role} =Controller

const MAP_URL={//顺序很重要 遍历时是按照顺序进行的  /user /user/add 
    '/api/administrator/login':administrator.login,
    '/api/role/all':role.all, // url以/api/role/all开头时，执行role.all方法
    '/api/role/add':role.add,
}

module.exports={
    MAP_URL:MAP_URL,
    getMapKey:getMapKey
}
```



