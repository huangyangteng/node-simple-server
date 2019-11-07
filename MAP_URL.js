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


const {administrator,task,error,role,province} =Controller

const MAP_URL={//顺序很重要 遍历时是按照顺序进行的  /user /user/add 
    'default':Controller.default,
    '/api/administrator/login':administrator.login,
    '/task/array':task.array,
    'error':error.random,
    '/api/role/all':role.all,
    '/api/role/add':role.add,
    '/api/role/delete':role.delete,
    '/api/province/array':province.array,
    '/api/flow/array':task.flow
    
    
}




module.exports={
    MAP_URL:MAP_URL,
    getMapKey:getMapKey
}