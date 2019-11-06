const fs=require('fs')

fs.readFile('../data/role.json',(error,buffer)=>{
    if(error){
        console.log(error)
    }else{
        var data=JSON.parse(buffer.toString())
        data.name='dhfhha'
        console.log("TCL: data", data)
    }

})