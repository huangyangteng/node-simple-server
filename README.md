# nodejs测试接口

>node启动地址：http://10.1.62.116:55555/



## 一、编写接口流程

## 前置知识

### 1. 数据储存在文件中,统一存放在`data`目录下

### 2. 需要nodejs的小部分知识，包括http,fs模块的使用，模块的导入导出知识




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
        resData.forEach((item,index)=>item.id=index+1)
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

