const fs=require('fs')

const Res=require('./resCommon')
const Tools=require('./tools')
const dayjs=require('dayjs')

class RoleList{
    constructor(){
        let roleData=JSON.parse(fs.readFileSync('data/role.json').toString())
        this.key=roleData.key
        this.list=roleData.list
    }
    getKey(){
        return this.key
    }
    getList(){
        return this.list
    }
    getRoleList(){
        return {
            key:this.key,
            list:this.list
        }
    }
    update(){
        fs.writeFileSync('data/role.json',JSON.stringify(this.getRoleList()))
    }
    addRole(reqData){
        reqData.id=this.key++
        this.list.push(reqData)
        this.update()
        return Res.success({id:this.key-1})
    }
    deleteRole(id){

        let deleteIndex=this.list.findIndex(item=>item.id==id)
        if(deleteIndex==-1){
            return Res.error(800001,'查无此人，删除失败')
        }else{
            this.list.splice(deleteIndex,1)
            this.update()
            return Res.success({deleteId:id})
        }
            

    }
}



const role={
    all(){
        let roleList=new RoleList()
        return Res.success(roleList.getList())
    },
    add(req){
        const {data,method}=req
        let roleList= new RoleList()
        console.log("TCL: add -> data", data)
        if(method == 'POST'){
            console.log(data)
            return roleList.addRole(data)
        }else{
            return Res.error('800003','方法错误，应该为POST')
        }

    },
    delete(req){
        const {method,data} =req
        if(method=='DELETE'){
            let roleList=new RoleList()
            return roleList.deleteRole(data.adminRoleId)
        }else{
            return Res.error('800003','方法错误，应该为DELETE')
        }
    }
    
    

}

module.exports=role