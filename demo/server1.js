const http = require('http')
// 最简单的服务器
let server=http.createServer((req,res)=>{

    const {url,method}=req
    console.log("TCL: method", method)
    console.log("TCL: url", url)
    
    let resData={
        code:'20000',
        info:'success',
        token:'',
        data:[
            {id:0,name:'xiaoming',age:12},
            {id:1,name:'xiaoming1',age:13},
            {id:2,name:'xiaoming2',age:14},
        ]

    }
    
    res.write(JSON.stringify(resData))
    res.end()

})


server.listen('12345',()=>{
    console.log('service in running on port 12345...')
})