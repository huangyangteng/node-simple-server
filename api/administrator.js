const Res=require('./resCommon')
const Tools=require('./tools')

const ADMIN_DATA_PATCH='data/administrator.json'

class Admin{
    constructor(){
        let adminList=Tools.getJsonByFile(ADMIN_DATA_PATCH)
        this.key=adminList.key
        this.list=adminList.list
        this.adminList=adminList
    }
    login(reqData){
        console.log("TCL: Admin -> login -> reqData", reqData.adminName)
        if(!reqData.adminName || !reqData.adminPassword){
            return Res.error('80003','参数填错了')
        }
        let {adminName}=reqData
        let result=this.list.find(item=>item.name==adminName)
        if(result){
            return Res.success(result)
        }else{
            return Res.error('80004','该用户不存在')
        }
    }
    all(){
        return Res.success(this.list)
    }
    add(reqData){
        console.log("TCL: Admin -> add -> reqData", reqData)
        if(!reqData.name || ! reqData.phoneNumber || !reqData.email || !reqData.role){
            return Res.error('80003','参数填错了')
        }

        let {name}=reqData
        if(this.list.findIndex(item=>item.name==name) != -1){
            return Res.error('80004','该用户名已被注册')
        }

        reqData.id=this.adminList.key++
        this.list.push(reqData)
        Tools.writeJsonToFile(ADMIN_DATA_PATCH,this.adminList)

        return Res.success({id:this.key})
        
    }
    edit(){
        
    }
    delete(){

    }
}


const administrator={

    login(req){
        const {data,method} =req
        let admin=new Admin()
        let result=admin.login(data)
        return result
    },
    all(){
        let admin=new Admin()
        return admin.all()
    },
    add(req){
        const {data,method}=req
        if(method=='POST'){
            let admin=new Admin()
            return admin.add(data)
        }else{
            return Res.error('800003','方法错误，应为POST')
        }
    },
    edit(){

    },
    delete(){

    }
}

module.exports=administrator