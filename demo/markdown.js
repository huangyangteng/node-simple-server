const showdown=require('showdown')
const fs=require('fs')




const converter=new showdown.Converter()

let text='# hello world'
fs.readFile('README.md',(err,buffer)=>{
    if(err){
        console.log(err)
    }
    let html=converter.makeHtml(buffer.toString())
    fs.writeFileSync('www/index.html',html)
    fs.writeFileSync('www/index.html','')
    console.log("TCL: html", html)
})

