const http = require('http')
const fs=require('fs')

const {MAP_URL,getMapKey}=require('./MAP_URL')
const Res=require('./api/resCommon')

const server=http.createServer((req,res)=>{
    let {url,headers}=req

    const mapKey=getMapKey(MAP_URL,url)

    if(url=='/'){//访问根目录时，默认访问下面的index.html
        url='/index.html'
    }

    if(typeof mapKey=='undefined'){//如果是静态资源,从www文件夹下读取
        fs.readFile(`www${url}`,(err,buffer)=>{
            if(err){
                res.writeHead(404)
                res.write('404 NOT FOUND')
            }else{
                res.write(buffer)
            }
            res.end()
        })
    }else{//如果是接口,从MAP_URL中进行匹配，执行对应的Controller
        //登录接口不需要验证
        res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'})//防止中文乱码

        var result=Res.interceptor(headers.jwt)

        if(result.validation || url=='/api/administrator/login'){//验证通过
            const resData=MAP_URL[mapKey]()
            res.write(JSON.stringify(resData))
        }else{
            res.write(JSON.stringify(result.res))
        }
        res.end()

        
    }
})

server.listen(55555,()=>{
    console.log('service in running on port 55555...')
    console.log()
})