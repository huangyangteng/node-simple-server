const fs=require('fs')

// 读取文件 文件路径，回调函数
fs.readFile('./data/1.txt',(err,buffer)=>{
    if(err){
        console.log(err)
    }else{
        console.log(buffer.toString())
    }
})

let data=fs.readFileSync('./data/1.txt')
console.log("TCL: data", data.toString())

// 写文件
fs.writeFile('./data/2.txt','jdfjdjfj',(err)=>{
    if(err){
        console.log(err)
    }
})
// 写文件
