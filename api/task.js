const Res=require('./resCommon')
const fs=require('fs')
const Tools=require('./tools')
const dayjs=require('dayjs')


function filterBy(obj,key,value){
    if(value != ''){
        return obj.filter(item=>item[key]==value)
    }else{
        return obj
    }
}


class Task{
    constructor(){
        let taskList=Tools.getJsonByFile('data/task.json')
        this.taskList=taskList
    }
    choose(req){
        const {method,url,data,query,params}=req

        if(method=='GET'){//返回单个任务
            console.log('返回单个')

        }else if(method=='POST'){//增加任务
            console.log('增加')
            let res=this.add(data)
            return res
        }else if(method=='PUT'){//编辑任务信息 和提高任务优先级
            console.log('编辑或者提高任务优先级')
            console.log('data',data)
        }else if(method=='DELETE'){
            console.log('params',params)
            console.log('删除')
            return this.delete(params)
        }else{
            console.log('方法错误')
        }
    }
    add(reqData){
        if(Tools.validate(reqData,['createAdminId','flowId','provinceId'])){
            reqData.id=this.taskList.key
            this.taskList.key+=1
            reqData.task='123456789abcdef'
            reqData.createDate=dayjs().format('YYYY-MM-DD HH:mm:ss')
        
            this.taskList.list.push(reqData)
            Tools.writeJsonToFile('data/task.json',this.taskList)
            return Res.success({id:this.taskList.key--})
        }else{
            return Res.error('80003','参数不完整')
        }
    }
    getAll(req){
        let {query}=req
        let resData=this.taskList.list
        let {taskState='',taskResult='',infinite='',flowId='',provinceId='',createDate='{}',taskCode=''}=query
        let {countPerPage=20,currentPage=1}=query
        let {order}=query
        
        
        
        resData=filterBy(resData,'taskState',taskState)
        resData=filterBy(resData,'taskResult',taskResult)
        resData=filterBy(resData,'infinite',infinite)
        console.log("TCL: Task -> getAll -> resData", resData)
        resData=filterBy(resData,'flowId',flowId)
        resData=filterBy(resData,'provinceId',provinceId)
        resData=filterBy(resData,'taskCode',taskCode)
        


        createDate=JSON.parse(createDate)

        if(Array.isArray(createDate)){
            let [start,end]=createDate
            let startT = dayjs(start)
            let endT=dayjs(end)
            resData=resData.filter(item=>{//在startT之后，在endT之前
               let curT=dayjs(item.createDate)
               return  curT.isBefore(endT) && curT.isAfter(startT)
            })

        }
        
        let start=(currentPage-1)*countPerPage
        let end=currentPage*countPerPage

        resData=resData.slice(start,end)

        resData.sort((r1,r2)=>{//r1 在 r2 之前
            return dayjs(r1.createDate).isBefore(dayjs(r2.createDate))
        })


        
        // 先筛选，再分页，最后排序
        // 筛选，如果传空，不根据该字段筛选，不传空，根据该字段筛选
        


        return Res.success(resData)
    }
    getItem(){

    }
    delete(deleteId){
        console.log("TCL: Task -> delete -> deleteId", deleteId)
        let deleteIndex=this.taskList.list.findIndex(item=>item.id==deleteId)
        if(deleteIndex==-1){
            return Res.error('800003','任务id不存在')
        }else{
            this.taskList.list.splice(deleteIndex,1)
            Tools.writeJsonToFile('data/task.json',this.taskList)
            return Res.success({deleteId})
        }
        console.log("TCL: Task -> delete -> deleteIndex", deleteIndex)


    }
}





const task={
    chooseMethod(req){
        let task=new Task()
        console.log("TCL: chooseMethod -> task.choose(req)", task.choose(req))
        return task.choose(req)
    },
    array(req){
        let task=new Task()
        return task.getAll(req)
        
    },
    flow(){
        let resData=JSON.parse(fs.readFileSync('data/taskFlow.json').toString())        
        return Res.success(resData)
    },
}

module.exports=task