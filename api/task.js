const Res=require('./resCommon')
const fs=require('fs')

class Task{

}

const task={
    array(){
        let data=[
            {id:1,taskType:'NORMAL',flowType:'order',provinceId:230},
            {id:2,taskType:'NORMAL',flowType:'order',provinceId:230},
            {id:3,taskType:'NORMAL',flowType:'logOut',provinceId:280},
        ]
        return Res.success(data)
        
    },
    flow(){
        let resData=JSON.parse(fs.readFileSync('data/taskFlow.json').toString())        
        return Res.success(resData)
    },
    add(){
        return Res.success({info:'增加任务'})
    }
}

module.exports=task