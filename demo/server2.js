const http = require('http')
const fs=require('fs')
// 返回文件
let server=http.createServer((req,res)=>{
    let {url}=req
    console.log("TCL: url", url)
    
    fs.readFile(`../www${url}`,(err,buffer)=>{
        if(err){
            console.log(err)
            res.writeHead(404)
            res.write('NOT FOUND')
            res.end()
        }else{
            res.write(buffer)
            res.end()
        }

    })
})


server.listen('12345',()=>{
    console.log('service in running on port 12345...')
})