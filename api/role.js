const fs=require('fs')

const Res=require('./resCommon')



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
    addRole(role,callback){
        role.id=this.key
        this.key++
        this.list.push(role)
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
        return new Promise(function(relove,reject){
            let arr=[]
            req.on('data',(buffer)=>{
                arr.push(buffer)
            })
            req.on('end',()=>{
                let reqData=JSON.parse(arr.concat().toString())
                let roleList=new RoleList()
                relove(roleList.addRole(reqData))
            })


        })

    },
    delete(req){
        const {method} =req
        return new Promise(function(relove,reject){
            if(method== 'DELETE'){
                let arr=[]
                req.on('data',(buffer)=>{
                    arr.push(buffer)
                })
                req.on('end',()=>{
                    let reqData=Res.getReqData(arr)
                    let roleList=new RoleList()
                    let res=roleList.deleteRole(reqData.adminRoleId)
                    relove(res)
                })
    
            }else{
                 reject(Res.error(80000))
            }
        })
        
        
    }
    
    

}

module.exports=role