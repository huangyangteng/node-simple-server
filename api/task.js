const Res=require('./resCommon')
const fs=require('fs')
const Tools=require('./tools')
const dayjs=require('dayjs')


function filterBy(obj,key,value){
    if(value=='' || value==-1){
        return obj
    }else{
        return obj.filter(item=>item[key]==value)
    }
}

function getArrayRandom(arr){
    let randomIndex=Math.floor(Math.random()*arr.length)
    return arr[randomIndex]
}
function getRandom(n){
    return Math.floor(Math.random()*n)

}
function getN(n){
    let t1=+new Date()
    let t2=+new Date()
    if(n<=13){
        return t1.toString().slice(0,n)
    }
    
    let str=t1+''+t2.toString().slice(0,6)
    return str
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
            return this.getItem(params)

        }else if(method=='POST'){//增加任务
            console.log('-----------------------增加')
            let res=this.add(data)
            return res
        }else if(method=='PUT'){//编辑任务信息 和提高任务优先级
            console.log(url)
            let params=url.split('/')
            let [,,,taskId,taskPriority]=params
            if(taskId && !data){//提高任务优先级
                console.log('提高任务优先级')
                return this.improvePriority(taskId,taskPriority)
            }else{//编辑任务
                console.log('编辑任务')
                return this.edit(data)
            }
        }else if(method=='DELETE'){
            console.log('删除')
            return this.delete(params)
        }else{
            console.log('方法错误')
        }

    }
    add(reqData){
        if(Tools.validate(reqData,['createAdminId','flowId','provinceId'])){
            reqData.id=this.taskList.key++
            reqData.task=getN(19)
            reqData.createDate=dayjs().format('YYYY-MM-DD')
            reqData.createTime=dayjs().format('HH:mm:ss')
            reqData.taskState=getArrayRandom(['00','01','02','09','10','20'])
            reqData.taskResult=getArrayRandom(['000','100','101','102','103','104','200','201','202','300','301','302','303','304','305','306','400','500'])
            reqData.taskRunRecord={
                currentActionId:1,
                errorActionId:2,
                recordDate:dayjs().format('YYYY-MM-DD'),
                recordTime:dayjs().format('HH:mm:ss'),
                durationTotal:Math.floor(Math.random()*600)+10,
                durationWait:Math.floor(Math.random()*100)+5,
                createDate:dayjs().format('YYYY-MM-DD'),
                updateDate:dayjs().format('YYYY-MM-DD')
            }
            reqData.equipmentRunLog={
                id:getRandom(1000)+1,
                equipmentId:getRandom(10)+1,
                taskId:getRandom(200)+1,
                flowId:getRandom(6)
            }
            this.taskList.list.push(reqData)
            Tools.writeJsonToFile('data/task.json',this.taskList)
            return Res.success({id:this.taskList.key-1})
        }else{
            return Res.error('80003','参数不完整')
        }
    }
    getAll(req){
        let {query}=req
        let resData=this.taskList.list
        let {taskState='',taskResult='',infinite='',flowId='',provinceId='',createDate=['1996-11-15','2222-12-12'],taskCode=''}=query
        let {countPerPage=20,currentPage=1}=query
        let {order}=query

         
        
        resData=filterBy(resData,'taskState',taskState)
        resData=filterBy(resData,'taskResult',taskResult)
        resData=filterBy(resData,'infinite',infinite)
        resData=filterBy(resData,'flowId',flowId)
        resData=filterBy(resData,'provinceId',provinceId)
        resData=filterBy(resData,'taskCode',taskCode)
        


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
    getItem(id){
        let item=this.taskList.list.find(item=>item.id==id)
        return Res.success(item)
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


    }
    edit(reqData){
        let item=this.taskList.list.find(item=>item.id==reqData.taskId)
        if(typeof item=='undefined'){
            return Res.error('800003','该任务不存在')
        }else{
            item=Object.assign(item,reqData)
            Tools.writeJsonToFile('data/task.json',this.taskList)
            return Res.success({id:reqData.taskId})
        }
    }
    improvePriority(taskId,taskPriority){
        let item=this.taskList.list.find(item=>item.id==taskId)
        if(typeof item=='undefined'){
            return Res.error('800003','该任务不存在')
        }else{
            item.taskPriority=taskPriority
            Tools.writeJsonToFile('data/task.json',this.taskList)
            return Res.success({id:taskId})
        }
    }

}





const task={
    chooseMethod(req){
        let task=new Task()
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