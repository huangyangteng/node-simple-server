const http = require('http')
const fs = require('fs')
const qs = require('querystring')
const URL = require('url')
const { MAP_URL, getMapKey } = require('./MAP_URL')
const Res = require('./api/resCommon')

const server = http.createServer((req, res) => {
    let { url, headers,method } = req

    const mapKey = getMapKey(MAP_URL, url)

    if (url == '/') {//访问根目录时，默认访问下面的index.html
        url = '/index.html'
    }
    console.log("TCL:URL")
    console.log("TCL:111")
    console.log("TCL: url", url)

    if (typeof mapKey == 'undefined') {//如果是静态资源,从www文件夹下读取

        fs.readFile(`www${url}`, (err, buffer) => {
            if (err) {
                res.writeHead(404)
                res.write('404 NOT FOUND')
            } else {
                res.write(buffer)
            }
            res.end()
        })

    } else {//如果是接口,从MAP_URL中进行匹配，执行对应的Controller
        //登录接口不需要验证
        res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' })//防止中文乱码

        var result = Res.interceptor(headers.jwt)

        if (result.validation || url == '/api/administrator/login') {//验证通过
            // const resData=MAP_URL[mapKey](req,res)

            if (req.method === 'POST') {
                let reqData = ''
                req.on('data', (buffer) => {
                    reqData += buffer
                })
                req.on('end', () => {
                    req.data=JSON.parse(reqData)
                    getResult(mapKey, req, res)
                })
            } else {
                req.query=URL.parse(url,true).query
                URL.parse(url,true)
                req.params=url.split('/').pop()
                getResult(mapKey, req, res)
            }




        } else {
            res.write(JSON.stringify(result.res))
            res.end()
        }


    }
})

function getResult(mapKey, req, res, reqData) {
    const p = MAP_URL[mapKey](req, res, reqData)
    
    if (typeof p.then == 'undefined') {
        setTimeout(() => {
            res.write(JSON.stringify(p))
            res.end()
        }, 500)
    } else {
        p.then((resData) => {
        console.log("TCL: getResult -> resData", resData)
            res.write(JSON.stringify(resData))
            res.end()
        }).catch((errData) => {
            res.write(JSON.stringify(errData))
            res.end()
        })

    }
}
server.listen(55555, () => {
    console.log('service in running on port 55555...')
    console.log()
})