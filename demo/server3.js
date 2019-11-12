const http = require('http')
const urlLib=require('url')
// 最简单的服务器
let server=http.createServer((req,res)=>{
    // 登录  /login
    // 注册   /reg
    // 获取用户信息  /user/{userid}
    let {url,method} = req
    console.log("TCL: method", method)
    res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'})

    if(url.includes('/login')){
        console.log('/login')
        // get请求 获取参数  ?name=ming&age=13   user/{id}
        var arr=[]
        req.on('data',(buffer)=>{
            console.log(buffer)
            arr.push(buffer)
        })
        req.on('end',()=>{
            let buffer=Buffer.concat(arr)
            let reqData=JSON.parse(buffer.toString())
            console.log("TCL: reqData", reqData)

            res.write(JSON.stringify({
                data:'20000',
                info:'登录成功',
                token:'jdfjdjfajkdjkf',
                data:reqData
            }))
            
            res.end()
        })

        
    }else if(url.includes('/reg')){

        res.write(JSON.stringify({
            data:'20000',
            info:'注册成功',
            token:'jdfjdjfajkdjkf',
            data:{
                code:20000,
                userId:0,
                userName:'xiaoming',
                userPhoneNumber:'165565556454'
            }
        }))
        res.end()
    }
    
})


server.listen('12345',()=>{
    console.log('service in running on port 12345...')
})