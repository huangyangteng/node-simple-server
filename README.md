# nodejs测试接口

>node启动地址：http://10.1.62.116:55555/

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
pm2 logs
# 杀死进程
pm2 delete node-monitor
# 重启服务
pm2 restart node-monitor
```



# 编写接口流程


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

# git协作流程

> 仓库地址：
>
> ​	https: https://github.com/huangyangteng/node-simple-server.git
>
> ​    ssh:    git@github.com:huangyangteng/node-simple-server.git
>
> git教程：https://www.liaoxuefeng.com/wiki/896043488029600

**总体思想：master分支用于发布到服务器，develop分支用于开发，但是只合并代码，不直接在上面开发，开发人员自己从develop分支上创建其他分支进行开发，完成后合并到develop分支，合并的时候可能产生冲突，解决后再推送到远程develop分支**，**到需要发布到服务器的时候，远程master分支合并develop分支的代码就行了**

## 一.master分支

> master分支用于将最新的代码更新至服务器，只接受来自develop分支的合并请求，不可在此分支上直接开发

## 二.develop分支

> develop分支是所有开发人员共同维护的开发分支，接受来自其他分支的合并请求，不可在此分支上直接开发

## 三.开发流程

### 1.克隆远程仓库

使用https的地址不需要验证身份

```
git clone https://github.com/huangyangteng/node-simple-server.git
```

### 2.新建并切换到develop分支

```nginx
git checkout  -b develop
```

### 3.分支关联到远程develop

```nginx
git branch --set-upstream-to=origin/develop develop
```

### 4.拉取远程提交

```nginx
git pull
```

### 5.切换到个人分支开发

```nginx
git checkout -b my-branch
```

### 6.切换到develop分支合并个人分支

```nginx
git checkout develop
git merge my-branch
```

### 7.推送develop分支

```nginx
git push
```

有可能远程develop分支有别人先推送的代码，则需要先拉取代码，解决冲突再推送

### 8.在远程合并develop分支到master分支上

注意，此操作在github进行

