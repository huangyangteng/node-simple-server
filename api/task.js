const Res=require('./resCommon')
const task={
    array(){
        let data=[
            {id:1,taskType:'NORMAL',flowType:'order',provinceId:230},
            {id:2,taskType:'NORMAL',flowType:'order',provinceId:230},
            {id:3,taskType:'NORMAL',flowType:'logOut',provinceId:280},
        ]
        return Res.success(data)
        
    }
}

module.exports=task